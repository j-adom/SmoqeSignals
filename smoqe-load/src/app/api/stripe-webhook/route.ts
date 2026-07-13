import config from '@payload-config';
import { getPayload, type Payload } from 'payload';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

async function findOrder(payload: Payload, session: Stripe.Checkout.Session) {
	const orderId = session.metadata?.orderId;
	if (orderId) {
		try {
			return await payload.findByID({ collection: 'orders', id: orderId });
		} catch {
			// Fall through for sessions created before order metadata was added.
		}
	}
	const found = await payload.find({
		collection: 'orders',
		where: { stripeSessionId: { equals: session.id } },
		limit: 1
	});
	return found.docs[0];
}

async function updateSessionOrder(
	payload: Payload,
	session: Stripe.Checkout.Session,
	status: 'paid' | 'canceled'
) {
	const order = await findOrder(payload, session);
	if (!order) throw new Error(`No order found for Stripe session ${session.id}`);
	if (status === 'paid' && !['paid', 'no_payment_required'].includes(session.payment_status)) return;

	const address = session.customer_details?.address;
	await payload.update({
		collection: 'orders',
		id: order.id,
		data: {
			status,
			email: session.customer_details?.email || undefined,
			stripeSessionId: session.id,
			...(status === 'paid'
				? {
						total: session.amount_total ?? undefined,
						tax: session.total_details?.amount_tax ?? 0,
						stripePaymentIntent:
							typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
						shippingAddress: address
							? {
									name: session.customer_details?.name || '',
									line1: address.line1 || '',
									line2: address.line2 || '',
									city: address.city || '',
									state: address.state || '',
									postalCode: address.postal_code || '',
									country: address.country || ''
								}
							: undefined
					}
				: {})
		}
	});
}

export async function POST(req: Request) {
	const secret = process.env.STRIPE_SECRET_KEY;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!secret || !webhookSecret) {
		return Response.json({ error: 'Stripe not configured' }, { status: 500 });
	}

	const stripe = new Stripe(secret);
	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			await req.text(),
			req.headers.get('stripe-signature') || '',
			webhookSecret
		);
	} catch (error) {
		return Response.json(
			{ error: `Webhook signature failed: ${error instanceof Error ? error.message : 'unknown error'}` },
			{ status: 400 }
		);
	}

	const payload = await getPayload({ config });
	try {
		switch (event.type) {
			case 'checkout.session.completed':
			case 'checkout.session.async_payment_succeeded':
				await updateSessionOrder(payload, event.data.object, 'paid');
				break;
			case 'checkout.session.expired':
			case 'checkout.session.async_payment_failed':
				await updateSessionOrder(payload, event.data.object, 'canceled');
				break;
			case 'charge.refunded': {
				const charge = event.data.object;
				if (charge.refunded && typeof charge.payment_intent === 'string') {
					const found = await payload.find({
						collection: 'orders',
						where: { stripePaymentIntent: { equals: charge.payment_intent } },
						limit: 1
					});
					if (!found.docs[0]) throw new Error(`No order found for payment ${charge.payment_intent}`);
					await payload.update({
						collection: 'orders',
						id: found.docs[0].id,
						data: { status: 'refunded' }
					});
				}
				break;
			}
		}
	} catch (error) {
		payload.logger.error({ err: error, stripeEventId: event.id }, 'Stripe webhook processing failed');
		return Response.json({ received: false }, { status: 500 });
	}

	return Response.json({ received: true });
}
