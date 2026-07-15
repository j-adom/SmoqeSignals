import { afterEach, describe, expect, it } from 'vitest';
import { isStorefrontRequest, parseContact, parseNewsletter, readJSONBody } from './public-api';
import ContactMessages from './collections/ContactMessages';

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

	it('stores every inquiry type the live contact form offers', () => {
		// Mirrors the dropdown in smoqe-web/src/routes/contact-us/+page.svelte.
		const formInquiryTypes = [
			'General Inquiry',
			'Booking The Truck Inquiry',
			'Catering Inquiry',
			'Holiday Pre-Order'
		];
		const field = ContactMessages.fields.find(
			(f) => 'name' in f && f.name === 'inquiryType'
		) as { options: Array<string | { value: string }> };
		const collectionValues = field.options.map((o) => (typeof o === 'string' ? o : o.value));

		for (const inquiryType of formInquiryTypes) {
			expect(
				parseContact({ name: 'A', email: 'a@b.co', message: 'Hi', inquiryType }).inquiryType,
				`parser accepts "${inquiryType}"`
			).toBe(inquiryType);
			expect(collectionValues, `collection stores "${inquiryType}"`).toContain(inquiryType);
		}
	});

	it('validates form values and request size', async () => {
		expect(parseNewsletter({ email: ' PERSON@example.com ' }).email).toBe('person@example.com');
		expect(() => parseContact({ name: 'A', email: 'bad', message: 'Hello' })).toThrow('valid email');
		await expect(
			readJSONBody(new Request('https://example.test', { method: 'POST', body: 'x'.repeat(17 * 1024) }))
		).rejects.toThrow('too large');
	});
});
