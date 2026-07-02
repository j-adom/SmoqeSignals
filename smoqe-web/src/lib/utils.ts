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
