import { redirect } from '@sveltejs/kit';

// Permanent redirect: the About page moved to /the-history (July 2026 rework).
export function load() {
	redirect(301, '/the-history');
}
