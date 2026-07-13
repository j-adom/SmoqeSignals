import { createHash, timingSafeEqual } from 'node:crypto';

const MAX_BODY_BYTES = 16 * 1024;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export class PublicAPIError extends Error {
	constructor(
		message: string,
		public readonly status = 400
	) {
		super(message);
	}
}

function digest(value: string): Buffer {
	return createHash('sha256').update(value).digest();
}

export function isStorefrontRequest(request: Request): boolean {
	const expected = process.env.STOREFRONT_API_KEY?.trim();
	const provided = request.headers.get('x-storefront-key')?.trim();
	if (!expected || !provided) return false;
	return timingSafeEqual(digest(provided), digest(expected));
}

export async function readJSONBody(request: Request): Promise<Record<string, unknown>> {
	const contentLength = Number(request.headers.get('content-length') || 0);
	if (contentLength > MAX_BODY_BYTES) throw new PublicAPIError('Request is too large.', 413);

	const raw = await request.text();
	if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
		throw new PublicAPIError('Request is too large.', 413);
	}

	let value: unknown;
	try {
		value = JSON.parse(raw);
	} catch {
		throw new PublicAPIError('Invalid JSON.');
	}
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		throw new PublicAPIError('Expected a JSON object.');
	}
	return value as Record<string, unknown>;
}

function textField(
	body: Record<string, unknown>,
	name: string,
	maxLength: number,
	required = false
): string {
	const value = body[name];
	if (value == null) {
		if (required) throw new PublicAPIError(`${name} is required.`);
		return '';
	}
	if (typeof value !== 'string') throw new PublicAPIError(`${name} must be text.`);
	const normalized = value.trim();
	if (required && !normalized) throw new PublicAPIError(`${name} is required.`);
	if (normalized.length > maxLength) throw new PublicAPIError(`${name} is too long.`);
	return normalized;
}

function emailField(body: Record<string, unknown>): string {
	const email = textField(body, 'email', 254, true).toLowerCase();
	if (!EMAIL_PATTERN.test(email)) throw new PublicAPIError('A valid email is required.');
	return email;
}

export function parseContact(body: Record<string, unknown>) {
	const inquiryType = textField(body, 'inquiryType', 80) || 'General Inquiry';
	const allowed = [
		'General Inquiry',
		'Booking The Truck Inquiry',
		'Catering Inquiry',
		'Holiday Pre-Order'
	];
	if (!allowed.includes(inquiryType)) throw new PublicAPIError('Invalid inquiry type.');
	return {
		name: textField(body, 'name', 120, true),
		email: emailField(body),
		inquiryType,
		message: textField(body, 'message', 5000, true),
		status: 'new' as const
	};
}

export function parseCatering(body: Record<string, unknown>) {
	const eventDate = textField(body, 'eventDate', 10);
	const eventTime = textField(body, 'eventTime', 5);
	if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
		throw new PublicAPIError('Invalid event date.');
	}
	if (eventTime && !/^\d{2}:\d{2}$/.test(eventTime)) {
		throw new PublicAPIError('Invalid event time.');
	}
	return {
		name: textField(body, 'name', 120, true),
		email: emailField(body),
		phone: textField(body, 'phone', 40, true),
		eventDate,
		eventTime,
		guestCount: textField(body, 'guestCount', 20),
		serviceStyle: textField(body, 'serviceStyle', 100, true),
		location: textField(body, 'location', 300),
		budget: textField(body, 'budget', 80),
		hearAbout: textField(body, 'hearAbout', 80),
		notes: textField(body, 'notes', 5000),
		status: 'new' as const
	};
}

export function parseNewsletter(body: Record<string, unknown>) {
	return {
		email: emailField(body),
		source: textField(body, 'source', 80) || 'site',
		status: 'subscribed' as const
	};
}

export function publicAPIErrorResponse(error: unknown): Response {
	if (error instanceof PublicAPIError) {
		return Response.json({ ok: false, error: error.message }, { status: error.status });
	}
	console.error(error);
	return Response.json({ ok: false, error: 'Request could not be processed.' }, { status: 500 });
}
