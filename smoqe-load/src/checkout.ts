export interface CheckoutItem {
	slug: string;
	qty: number;
}

export function parseCheckoutItems(value: unknown): CheckoutItem[] {
	if (!Array.isArray(value) || value.length === 0) throw new Error('Your cart is empty.');
	if (value.length > 20) throw new Error('Your cart has too many different items.');

	const merged = new Map<string, number>();
	for (const item of value) {
		if (!item || typeof item !== 'object') throw new Error('Your cart contains an invalid item.');
		const { slug, qty } = item as Record<string, unknown>;
		if (typeof slug !== 'string' || !/^[a-z0-9][a-z0-9-]{0,99}$/.test(slug)) {
			throw new Error('Your cart contains an invalid item.');
		}
		const quantity = Number(qty);
		if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
			throw new Error('Your cart contains an invalid quantity.');
		}
		merged.set(slug, (merged.get(slug) || 0) + quantity);
		if ((merged.get(slug) || 0) > 99) throw new Error('An item quantity is too large.');
	}
	return [...merged].map(([slug, qty]) => ({ slug, qty }));
}
