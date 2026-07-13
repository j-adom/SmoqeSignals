import config from '@payload-config';
import { getPayload } from 'payload';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

interface IncomingItem {
	slug: string;
	qty: number;
}

const FREE_SHIPPING_THRESHOLD = Number(process.env.FREE_SHIPPING_THRESHOLD || 4500); // cents
const FLAT_SHIPPING_RATE = Number(process.env.FLAT_SHIPPING_RATE || 650); // cents

function corsHeaders(): Record<string, string> {
	return {
		'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	};
}

export function OPTIONS() {
	return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(req: Request) {
	const secret = process.env.STRIPE_SECRET_KEY;
	if (!secret) {
		return Response.json(
			{ error: 'Store checkout is not configured yet.' },
			{ status: 500, headers: corsHeaders() }
		);
	}

	let items: IncomingItem[] = [];
	try {
		const body = (await req.json()) as { items?: IncomingItem[] };
		items = Array.isArray(body.items) ? body.items : [];
	} catch {
		return Response.json({ error: 'Bad request' }, { status: 400, headers: corsHeaders() });
	}
	if (!items.length) {
		return Response.json({ error: 'Your cart is empty.' }, { status: 400, headers: corsHeaders() });
	}

	const stripe = new Stripe(secret);
	const payload = await getPayload({ config });
	const siteURL = process.env.FRONTEND_URL || 'http://localhost:5173';

	// Price the cart authoritatively from the database — never trust the client.
	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
	const orderItems: Array<{ product: string | number; name: string; qty: number; unitPrice: number }> = [];
	let subtotal = 0;

	for (const item of items) {
		const qty = Math.max(1, Math.min(99, Math.floor(Number(item.qty) || 0)));
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
					image?: { url?: string | null } | number | null;
			  }
			| undefined;
		if (!product || product.inStock === false) continue;

		const unitAmount = Math.round(Number(product.price) * 100);
		subtotal += unitAmount * qty;
		orderItems.push({ product: product.id, name: product.name, qty, unitPrice: unitAmount });

		const image =
			product.image && typeof product.image === 'object' && product.image.url
				? product.image.url
				: undefined;

		lineItems.push({
			quantity: qty,
			price_data: {
				currency: 'usd',
				unit_amount: unitAmount,
				product_data: {
					name: product.name,
					...(product.size ? { description: String(product.size) } : {}),
					...(image ? { images: [image.startsWith('http') ? image : `${process.env.PAYLOAD_PUBLIC_SERVER_URL || ''}${image}`] } : {})
				}
			}
		});
	}

	if (!lineItems.length) {
		return Response.json(
			{ error: 'None of those items are available right now.' },
			{ status: 400, headers: corsHeaders() }
		);
	}

	const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;

	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		line_items: lineItems,
		// Lets customers enter Stripe promotion codes (e.g. review-campaign codes) at checkout.
		// Coupons/codes and their expiry + redemption caps are managed in the Stripe dashboard.
		allow_promotion_codes: true,
		shipping_address_collection: { allowed_countries: ['US'] },
		shipping_options: [
			{
				shipping_rate_data: {
					type: 'fixed_amount',
					display_name: shipping === 0 ? 'Free shipping' : 'Standard shipping',
					fixed_amount: { amount: shipping, currency: 'usd' },
					delivery_estimate: {
						minimum: { unit: 'business_day', value: 2 },
						maximum: { unit: 'business_day', value: 5 }
					}
				}
			}
		],
		phone_number_collection: { enabled: true },
		success_url: `${siteURL}/shop?checkout=success`,
		cancel_url: `${siteURL}/shop?checkout=cancel`,
		metadata: { source: 'smoqe-web' }
	});

	// Record a pending order; the webhook flips it to paid.
	try {
		await payload.create({
			collection: 'orders',
			data: {
				orderNumber: `SMQ-${Date.now().toString(36).toUpperCase()}`,
				status: 'pending',
				items: orderItems,
				subtotal,
				shipping,
				tax: 0,
				total: subtotal + shipping,
				stripeSessionId: session.id
			}
		});
	} catch (err) {
		payload.logger.error({ err }, 'Failed to record pending order');
	}

	return Response.json({ url: session.url }, { headers: corsHeaders() });
}
