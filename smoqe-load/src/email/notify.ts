import type { Payload } from 'payload';

const BRAND = '#d6451a';
const STAFF = () => process.env.STAFF_NOTIFICATION_EMAIL || process.env.FROM_EMAIL || '';

function shell(title: string, rows: Array<[string, string]>, intro?: string): string {
	const body = rows
		.filter(([, v]) => v)
		.map(
			([k, v]) =>
				`<tr><td style="padding:6px 14px 6px 0;color:#6b5b4d;font-weight:700;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#241a13">${v}</td></tr>`
		)
		.join('');
	return `
	<div style="font-family:Arial,Helvetica,sans-serif;background:#fbf4e9;padding:28px">
		<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e4d4bd;border-radius:8px;overflow:hidden">
			<div style="background:#14100c;padding:20px 26px">
				<span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:.5px">SMOQE SIGNALS BBQ</span>
				<span style="color:${BRAND};font-size:18px;font-weight:800"> ●</span>
			</div>
			<div style="padding:26px">
				<h2 style="margin:0 0 6px;color:#241a13;font-size:20px">${title}</h2>
				${intro ? `<p style="margin:0 0 16px;color:#6b5b4d;font-size:14px;line-height:1.5">${intro}</p>` : ''}
				<table style="width:100%;border-collapse:collapse;font-size:14px">${body}</table>
			</div>
			<div style="background:#f4e9d8;padding:14px 26px;color:#6b5b4d;font-size:12px">
				Sent from smoqesignals.com · Nashville Bred · Memphis Approved · Tennessee Tradition
			</div>
		</div>
	</div>`;
}

async function send(payload: Payload, to: string, subject: string, html: string) {
	if (!to) {
		payload.logger.warn('No recipient configured for notification email; skipping send.');
		return;
	}
	try {
		await payload.sendEmail({ to, subject, html });
	} catch (err) {
		payload.logger.error({ err }, 'Failed to send notification email');
	}
}

export async function notifyCatering(payload: Payload, d: Record<string, unknown>) {
	const html = shell(
		'New catering request',
		[
			['Name', String(d.name ?? '')],
			['Email', String(d.email ?? '')],
			['Phone', String(d.phone ?? '')],
			['Event date', String(d.eventDate ?? '')],
			['Guests', String(d.guestCount ?? '')],
			['Service', String(d.serviceStyle ?? '')],
			['Notes', String(d.notes ?? '')]
		],
		'A new catering request just came in through the website.'
	);
	await send(payload, STAFF(), `Catering request — ${d.name ?? 'New'}`, html);
}

export async function notifyContact(payload: Payload, d: Record<string, unknown>) {
	const inquiry = String(d.inquiryType ?? 'General Inquiry');
	const html = shell(
		'New contact message',
		[
			['Name', String(d.name ?? '')],
			['Email', String(d.email ?? '')],
			['Inquiry', inquiry],
			['Message', String(d.message ?? '')]
		],
		'Someone reached out through the contact form.'
	);
	await send(payload, STAFF(), `${inquiry} — ${d.name ?? 'New'}`, html);
}

export async function notifyNewsletter(payload: Payload, email: string) {
	const html = shell('New newsletter subscriber', [['Email', email]]);
	await send(payload, STAFF(), 'New newsletter subscriber', html);
}
