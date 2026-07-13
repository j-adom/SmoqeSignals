import { redirect } from '@sveltejs/kit';

// Permanent redirect: the old /catering-faqs/ URL folded into the single catering page (July 2026 rework).
export function load({ url }) {
	redirect(301, `/catering${url.search}`);
}
