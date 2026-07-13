import { randomUUID } from 'node:crypto';
import config from '@payload-config';
import { getPayload } from 'payload';
import Stripe from 'stripe';
import { isStorefrontRequest, readJSONBody } from '@/public-api';
import { parseCheckoutItems, type CheckoutItem } from '@/checkout';

export const dynamic = 'force-dynamic';

const FREE_SHIPPING_THRESHOLD = Number(process.env.FREE_SHIPPING_THRESHOLD || 4500);
const FLAT_SHIPPING_RATE = Number(process.env.FLAT_SHIPPING_RATE || 650);

function response(body: Record<string, unknown>, status = 200) {
	return Response.json(body, { status });
}

export async function POST(req: Request) {
	if (!isStorefrontRequest(req)) return response({ error: 'Unauthorized.' }, 401);

	const secret = process.env.STRIPE_SECRET_KEY;
	if (!secret) return response({ error: 'Store checkout is not configured yet.' }, 503);

	let items: CheckoutItem[];
	try {
		items = parseCheckoutItems((await readJSONBody(req)).items);
	} catch (error) {
		return response({ error: error instanceof Error ? error.message : 'Bad request.' }, 400);
	}

	const stripe = new Stripe(secret);
	const payload = await getPayload({ config });
	const siteURL = process.env.FRONTEND_URL || 'http://localhost:5173';
	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
	const orderItems: Array<{
		product: string | number;
		name: string;
		qty: number;
		unitPrice: number;
		fulfillment: 'physical' | 'digital' | 'preorder';
	}> = [];
	let subtotal = 0;
	let requiresShipping = false;

	for (const item of items) {
		const found = await payload.find({
			collection: 'products',
			where: { slug: { equals: item.slug } },
			depth: 1,
			limit: 1
		});
		const product = found.docs[0] as
			| {
					id: string | number;
					name: string;
					price: number;
					size?: string | null;
					inStock?: boolean | null;
					fulfillment?: 'physical' | 'digital' | 'preorder' | null;
					stripePriceId?: string | null;
					image?: { url?: string | null } | number | null;
			  }
			| undefined;
		if (!product || product.inStock === false) {
			return response({ error: `“${item.slug}” is no longer available. Please refresh your cart.` }, 409);
		}

		const unitAmount = Math.round(Number(product.price) * 100);
		if (!Number.isSafeInteger(unitAmount) || unitAmount < 1) {
			payload.logger.error({ productId: product.id }, 'Product has an invalid checkout price');
			return response({ error: 'One item cannot be purchased right now.' }, 409);
		}

		const fulfillment = product.fulfillment || 'physical';
		requiresShipping ||= fulfillment === 'physical';
		subtotal += unitAmount * item.qty;
		orderItems.push({
			product: product.id,
			name: product.name,
			qty: item.qty,
			unitPrice: unitAmount,
			fulfillment
		});

		const image =
			product.image && typeof product.image === 'object' && product.image.url
				? product.image.url
				: undefined;
		lineItems.push({
			quantity: item.qty,
			price_data: {
				currency: 'usd',
				unit_amount: unitAmount,
				product_data: {
					name: product.name,
					...(product.size ? { description: String(product.size) } : {}),
					...(image
						? {
								images: [
									image.startsWith('http')
										? image
										: `${process.env.PAYLOAD_PUBLIC_SERVER_URL || ''}${image}`
								]
							}
						: {})
				}
			}
		});
	}

	const shipping = requiresShipping && subtotal < FREE_SHIPPING_THRESHOLD ? FLAT_SHIPPING_RATE : 0;
	const orderNumber = `SMQ-${randomUUID().slice(0, 8).toUpperCase()}`;
	const order = await payload.create({
		collection: 'orders',
		data: {
			orderNumber,
			status: 'pending',
			items: orderItems,
			subtotal,
			shipping,
			tax: 0,
			total: subtotal + shipping
		}
	});

	try {
		const session = await stripe.checkout.sessions.create(
			{
				mode: 'payment',
				line_items: lineItems,
				automatic_tax: { enabled: true },
				allow_promotion_codes: true,
				...(requiresShipping
					? {
							shipping_address_collection: { allowed_countries: ['US' as const] },
							shipping_options: [
								{
									shipping_rate_data: {
										type: 'fixed_amount' as const,
										display_name: shipping === 0 ? 'Free shipping' : 'Standard shipping',
										fixed_amount: { amount: shipping, currency: 'usd' },
										delivery_estimate: {
											minimum: { unit: 'business_day' as const, value: 2 },
											maximum: { unit: 'business_day' as const, value: 5 }
										}
									}
								}
							]
						}
					: {}),
				phone_number_collection: { enabled: true },
				success_url: `${siteURL}/shop?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${siteURL}/shop?checkout=cancel`,
				client_reference_id: String(order.id),
				metadata: { source: 'smoqe-web', orderId: String(order.id), orderNumber }
			},
			{ idempotencyKey: `checkout-${order.id}` }
		);
		if (!session.url) throw new Error('Stripe did not return a checkout URL.');
		await payload.update({
			collection: 'orders',
			id: order.id,
			data: { stripeSessionId: session.id }
		});
		return response({ url: session.url });
	} catch (error) {
		await payload.update({
			collection: 'orders',
			id: order.id,
			data: { status: 'canceled' }
		});
		payload.logger.error({ err: error, orderId: order.id }, 'Failed to create Stripe Checkout session');
		return response({ error: 'Could not start checkout. Please try again.' }, 502);
	}
}
