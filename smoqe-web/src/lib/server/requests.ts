import { fail } from '@sveltejs/kit';
import { submitCatering } from '$lib/server/payload';

/**
 * Shared handler for the truck-booking and catering request forms. Both pages
 * post the same field set to a `submit` action, so parsing, validation, and the
 * backend call live here once. Returns the value to hand straight back from the
 * SvelteKit action (either a `fail(...)` or a success payload).
 */
export async function handleRequestSubmit(request: Request, fetch: typeof globalThis.fetch) {
	const form = await request.formData();
	const name = String(form.get('name') || '').trim();
	const email = String(form.get('email') || '').trim();
	const phone = String(form.get('phone') || '').trim();
	const serviceStyle = String(form.get('serviceStyle') || '').trim();
	const eventDate = String(form.get('eventDate') || '').trim();
	const eventTime = String(form.get('eventTime') || '').trim();
	const guestCount = String(form.get('guestCount') || '').trim();
	const location = String(form.get('location') || '').trim();
	const budget = String(form.get('budget') || '').trim();
	const hearAbout = String(form.get('hearAbout') || '').trim();
	const notes = String(form.get('notes') || '').trim();
	const website = String(form.get('website') || '').trim();

	const values = {
		name,
		email,
		phone,
		serviceStyle,
		eventDate,
		eventTime,
		guestCount,
		location,
		budget,
		hearAbout,
		notes
	};

	if (!name || !email || !phone || !serviceStyle) {
		return fail(400, { ...values, error: 'Please fill in name, email, phone, and service style.' });
	}
	if (website) return { success: true };
	if (name.length > 120 || email.length > 254 || phone.length > 40 || notes.length > 5000) {
		return fail(400, { ...values, error: 'One or more fields are too long.' });
	}
	if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
		return fail(400, { ...values, error: 'Please enter a valid email address.' });
	}

	const res = await submitCatering(values, fetch);
	if (!res.ok) {
		return fail(502, {
			...values,
			error: 'Something went wrong sending your request. Please try again or call us.'
		});
	}

	return { success: true, name, email, phone, serviceStyle, eventDate, eventTime, guestCount };
}
