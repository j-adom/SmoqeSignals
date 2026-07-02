import { browser } from '$app/environment';
import type { CartLine, Product } from '$lib/types';

const KEY = 'smoqe_cart_v1';

function load(): CartLine[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? (JSON.parse(raw) as CartLine[]) : [];
	} catch {
		return [];
	}
}

/**
 * Reactive cart, persisted to localStorage. Import the singleton `cart`
 * and read `cart.items`, `cart.count`, `cart.total` directly in markup.
 */
class CartStore {
	items = $state<CartLine[]>(load());
	/** Controls the slide-over cart drawer. */
	open = $state(false);

	get count(): number {
		return this.items.reduce((n, i) => n + i.qty, 0);
	}

	get total(): number {
		return this.items.reduce((n, i) => n + i.qty * i.price, 0);
	}

	private persist() {
		if (browser) localStorage.setItem(KEY, JSON.stringify(this.items));
	}

	add(product: Product, qty = 1) {
		const found = this.items.find((i) => i.id === product.id);
		if (found) {
			found.qty += qty;
		} else {
			this.items.push({
				id: product.id,
				slug: product.slug,
				name: product.name,
				price: product.price,
				image: product.image,
				size: product.size,
				qty
			});
		}
		this.persist();
		this.open = true;
	}

	setQty(id: string, qty: number) {
		if (qty <= 0) {
			this.items = this.items.filter((i) => i.id !== id);
		} else {
			const line = this.items.find((i) => i.id === id);
			if (line) line.qty = qty;
		}
		this.persist();
	}

	remove(id: string) {
		this.items = this.items.filter((i) => i.id !== id);
		this.persist();
	}

	clear() {
		this.items = [];
		this.persist();
	}
}

export const cart = new CartStore();
