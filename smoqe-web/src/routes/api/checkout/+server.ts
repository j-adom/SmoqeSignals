import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { createCheckout, type CheckoutItem } from '$lib/server/payload';

export const POST: RequestHandler = async ({ request, fetch }) => {
	let items: CheckoutItem[] = [];
	try {
		const body = (await request.json()) as { items?: CheckoutItem[] };
		items = Array.isArray(body.items) ? body.items : [];
	} catch {
		return json({ error: 'Bad request' }, { status: 400 });
	}
	items = items
		.filter((i) => i && typeof i.slug === 'string' && Number(i.qty) > 0)
		.map((i) => ({ slug: i.slug, qty: Math.min(99, Math.floor(Number(i.qty))) }));

	if (!items.length) return json({ error: 'Your cart is empty.' }, { status: 400 });

	const result = await createCheckout(items, fetch);
	if ('error' in result) return json(result, { status: 502 });
	return json(result);
};
