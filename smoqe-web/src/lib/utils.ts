/** Currency + date helpers used across the storefront. */

export function money(n: number): string {
	const v = Math.round(n * 100) / 100;
	return '$' + v.toFixed(2).replace(/\.00$/, '');
}

export function formatDate(iso: string): string {
	const d = new Date(iso.length <= 10 ? iso + 'T00:00:00' : iso);
	if (isNaN(d.getTime())) return '';
	return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function readingTime(words: number): number {
	return Math.max(1, Math.round(words / 200));
}

/**
 * Serialize an object for safe embedding inside a
 * `<script type="application/ld+json">` block. Escapes `<`, `>`, and `&` so CMS
 * data (product names, FAQ text) can never break out of the script tag (XSS).
 */
export function jsonLd(data: unknown): string {
	return JSON.stringify(data)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/&/g, '\\u0026');
}
