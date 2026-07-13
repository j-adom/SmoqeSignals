import { describe, expect, it } from 'vitest';
import { parseCheckoutItems } from './checkout';

describe('parseCheckoutItems', () => {
	it('merges duplicate product lines', () => {
		expect(parseCheckoutItems([{ slug: 'house-rub', qty: 2 }, { slug: 'house-rub', qty: 3 }])).toEqual([
			{ slug: 'house-rub', qty: 5 }
		]);
	});

	it('rejects invalid slugs and quantities', () => {
		expect(() => parseCheckoutItems([{ slug: '../admin', qty: 1 }])).toThrow('invalid item');
		expect(() => parseCheckoutItems([{ slug: 'house-rub', qty: 100 }])).toThrow('invalid quantity');
	});
});
