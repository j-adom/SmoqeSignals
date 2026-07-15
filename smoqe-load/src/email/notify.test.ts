import { afterEach, describe, expect, it } from 'vitest';
import type { Payload } from 'payload';
import type { Order } from '../payload-types';
import { escapeHTML, notifyOrderPaid } from './notify';

describe('escapeHTML', () => {
	it('escapes markup and attribute characters', () => {
		expect(escapeHTML(`<img src=x onerror="alert('x')">`)).toBe(
			'&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;'
		);
	});
});

type SentEmail = { to: string; subject: string; html: string };

function fakePayload(sent: SentEmail[]) {
	return {
		sendEmail: async (msg: SentEmail) => {
			sent.push(msg);
		},
		logger: { warn: () => {}, error: () => {} }
	} as unknown as Payload;
}

function order(overrides: Partial<Order> = {}): Order {
	return {
		id: 1,
		orderNumber: 'SMQ-TEST1234',
		status: 'paid',
		email: 'customer@example.com',
		items: [
			{ product: 1, name: 'Sweet Heat Rub', qty: 2, unitPrice: 1299, fulfillment: 'physical' }
		],
		subtotal: 2598,
		shipping: 650,
		tax: 245,
		total: 3493,
		updatedAt: '2026-07-15T00:00:00.000Z',
		createdAt: '2026-07-15T00:00:00.000Z',
		...overrides
	};
}

afterEach(() => {
	delete process.env.STAFF_NOTIFICATION_EMAIL;
	delete process.env.FROM_EMAIL;
});

describe('notifyOrderPaid', () => {
	it('emails the customer a confirmation and the staff a notification', async () => {
		process.env.STAFF_NOTIFICATION_EMAIL = 'staff@smoqesignals.com';
		const sent: SentEmail[] = [];

		await notifyOrderPaid(fakePayload(sent), order());

		const customer = sent.find((m) => m.to === 'customer@example.com');
		const staff = sent.find((m) => m.to === 'staff@smoqesignals.com');
		expect(customer, 'customer confirmation email').toBeDefined();
		expect(staff, 'staff notification email').toBeDefined();

		expect(customer!.subject).toContain('SMQ-TEST1234');
		expect(customer!.html).toContain('2 × Sweet Heat Rub');
		expect(customer!.html).toContain('$25.98'); // line total
		expect(customer!.html).toContain('$6.50'); // shipping
		expect(customer!.html).toContain('$34.93'); // total

		expect(staff!.subject).toContain('SMQ-TEST1234');
		expect(staff!.html).toContain('customer@example.com');
	});

	it('mentions pre-order timing when the order includes a pre-order item', async () => {
		process.env.STAFF_NOTIFICATION_EMAIL = 'staff@smoqesignals.com';
		const sent: SentEmail[] = [];

		await notifyOrderPaid(
			fakePayload(sent),
			order({
				items: [
					{ product: 1, name: 'Sweet Heat Rub', qty: 1, unitPrice: 1299, fulfillment: 'physical' },
					{ product: 2, name: 'The Art of Pulled Pork (eBook)', qty: 1, unitPrice: 999, fulfillment: 'preorder' }
				]
			})
		);

		const customer = sent.find((m) => m.to === 'customer@example.com');
		expect(customer!.html.toLowerCase()).toContain('pre-order');
	});

	it('still notifies staff when the order has no customer email', async () => {
		process.env.STAFF_NOTIFICATION_EMAIL = 'staff@smoqesignals.com';
		const sent: SentEmail[] = [];

		await notifyOrderPaid(fakePayload(sent), order({ email: null }));

		expect(sent).toHaveLength(1);
		expect(sent[0].to).toBe('staff@smoqesignals.com');
	});
});
