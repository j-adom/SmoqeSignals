import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { subscribeNewsletter } from '$lib/server/payload';

export const POST: RequestHandler = async ({ request, fetch }) => {
	let email = '';
	let source = 'site';
	try {
		const body = (await request.json()) as { email?: string; source?: string };
		email = (body.email || '').trim();
		source = String(body.source || 'site')
			.trim()
			.slice(0, 80);
	} catch {
		return json({ ok: false, error: 'Bad request' }, { status: 400 });
	}
	if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
		return json({ ok: false, error: 'Invalid email' }, { status: 400 });
	}
	const res = await subscribeNewsletter(email, source, fetch);
	return json(
		{ ok: res.ok, ...(res.ok ? {} : { error: 'Subscription could not be saved.' }) },
		{ status: res.ok ? 200 : 502 }
	);
};
