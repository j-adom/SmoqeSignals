import { redirect } from '@sveltejs/kit';

// Permanent redirect: the old /food-truck-menu/ URL now lives at /food-truck (July 2026 rework).
export function load({ url }) {
	redirect(301, `/food-truck${url.search}`);
}
