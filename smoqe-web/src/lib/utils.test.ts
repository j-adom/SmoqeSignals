import { describe, expect, it } from 'vitest';
import { jsonLd, money, readingTime } from './utils';

describe('storefront utilities', () => {
	it('formats money and clamps reading time', () => {
		expect(money(12)).toBe('$12');
		expect(money(12.5)).toBe('$12.50');
		expect(readingTime(0)).toBe(1);
	});

	it('prevents JSON-LD script breakout', () => {
		const result = jsonLd({ name: '</script><script>alert(1)</script>' });
		expect(result).not.toContain('</script>');
		expect(result).toContain('\\u003c');
	});
});
