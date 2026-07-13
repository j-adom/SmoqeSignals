import { redirect } from '@sveltejs/kit';

// Permanent redirect: the old /catering-requirments/ URL (original spelling, indexed) folded
// into the single catering page (July 2026 rework).
export function load({ url }) {
	redirect(301, `/catering${url.search}`);
}
