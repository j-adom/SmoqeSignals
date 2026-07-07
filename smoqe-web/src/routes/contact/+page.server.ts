import { redirect } from '@sveltejs/kit';

// Permanent redirect: the Contact page moved to /contact-us (July 2026 rework).
export function load({ url }) {
	redirect(301, `/contact-us${url.search}`);
}
