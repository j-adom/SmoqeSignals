import { afterEach, describe, expect, it } from 'vitest';
import { isStorefrontRequest, parseContact, parseNewsletter, readJSONBody } from './public-api';

afterEach(() => delete process.env.STOREFRONT_API_KEY);

describe('public API validation', () => {
	it('authenticates the private storefront header', () => {
		process.env.STOREFRONT_API_KEY = 'a'.repeat(32);
		expect(
			isStorefrontRequest(new Request('https://example.test', { headers: { 'x-storefront-key': 'a'.repeat(32) } }))
		).toBe(true);
		expect(
			isStorefrontRequest(new Request('https://example.test', { headers: { 'x-storefront-key': 'wrong' } }))
		).toBe(false);
	});

	it('validates form values and request size', async () => {
		expect(parseNewsletter({ email: ' PERSON@example.com ' }).email).toBe('person@example.com');
		expect(() => parseContact({ name: 'A', email: 'bad', message: 'Hello' })).toThrow('valid email');
		await expect(
			readJSONBody(new Request('https://example.test', { method: 'POST', body: 'x'.repeat(17 * 1024) }))
		).rejects.toThrow('too large');
	});
});
