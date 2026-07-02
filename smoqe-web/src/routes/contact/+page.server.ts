import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { submitContact } from '$lib/server/payload';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await request.formData();
		const name = String(form.get('name') || '').trim();
		const email = String(form.get('email') || '').trim();
		const message = String(form.get('message') || '').trim();
		const inquiryType = String(form.get('inquiryType') || 'General Inquiry').trim();

		if (!name || !email || !message) {
			return fail(400, { name, email, message, inquiryType, error: 'Please fill in every field.' });
		}

		const res = await submitContact({ name, email, message, inquiryType }, fetch);
		if (!res.ok) {
			return fail(502, { name, email, message, inquiryType, error: 'Message could not be sent. Please try again or call us.' });
		}
		return { success: true, name };
	}
};
