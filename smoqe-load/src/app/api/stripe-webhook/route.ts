import config from '@payload-config';
import { getPayload } from 'payload';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	const secret = process.env.STRIPE_SECRET_KEY;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!secret || !webhookSecret) {
		return Response.json({ error: 'Stripe not configured' }, { status: 500 });
	}

	const stripe = new Stripe(secret);
	const sig = req.headers.get('stripe-signature') || '';
	const raw = await req.text();

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
	} catch (err) {
		return Response.json({ error: `Webhook signature failed: ${(err as Error).message}` }, { status: 400 });
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;
		const payload = await getPayload({ config });
		try {
			const found = await payload.find({
				collection: 'orders',
				where: { stripeSessionId: { equals: session.id } },
				limit: 1
			});
			const order = found.docs[0];
			const addr = session.customer_details?.address;
			const data = {
				status: 'paid' as const,
				email: session.customer_details?.email || undefined,
				total: session.amount_total ?? undefined,
				tax: session.total_details?.amount_tax ?? 0,
				stripePaymentIntent:
					typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
				shippingAddress: addr
					? {
							name: session.customer_details?.name || '',
							line1: addr.line1 || '',
							line2: addr.line2 || '',
							city: addr.city || '',
							state: addr.state || '',
							postalCode: addr.postal_code || '',
							country: addr.country || ''
						}
					: undefined
			};
			if (order) {
				await payload.update({ collection: 'orders', id: order.id, data });
			} else {
				await payload.create({
					collection: 'orders',
					data: { orderNumber: `SMQ-${Date.now().toString(36).toUpperCase()}`, stripeSessionId: session.id, ...data }
				});
			}
		} catch (err) {
			payload.logger.error({ err }, 'Failed to mark order paid');
			return Response.json({ received: true, warning: 'order update failed' });
		}
	}

	return Response.json({ received: true });
}
