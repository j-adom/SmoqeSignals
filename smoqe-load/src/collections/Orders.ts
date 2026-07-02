import type { CollectionConfig } from 'payload';

const isStaff = ({ req }: { req: { user?: unknown } }) => !!req.user;

const Orders: CollectionConfig = {
	slug: 'orders',
	admin: {
		useAsTitle: 'orderNumber',
		defaultColumns: ['orderNumber', 'email', 'total', 'status', 'createdAt'],
		group: 'Shop'
	},
	// Orders are created/updated server-side (checkout route + Stripe webhook)
	// via the Local API, which bypasses these rules. Public access stays closed.
	access: {
		create: isStaff,
		read: isStaff,
		update: isStaff,
		delete: isStaff
	},
	fields: [
		{
			type: 'row',
			fields: [
				{ name: 'orderNumber', type: 'text', index: true, admin: { width: '50%', readOnly: true } },
				{
					name: 'status',
					type: 'select',
					defaultValue: 'pending',
					admin: { width: '50%' },
					options: [
						{ label: 'Pending payment', value: 'pending' },
						{ label: 'Paid', value: 'paid' },
						{ label: 'Fulfilled', value: 'fulfilled' },
						{ label: 'Canceled', value: 'canceled' },
						{ label: 'Refunded', value: 'refunded' }
					]
				}
			]
		},
		{ name: 'email', type: 'email' },
		{
			name: 'items',
			type: 'array',
			fields: [
				{ name: 'product', type: 'relationship', relationTo: 'products' },
				{ name: 'name', type: 'text' },
				{ name: 'qty', type: 'number' },
				{ name: 'unitPrice', type: 'number', admin: { description: 'Cents.' } }
			]
		},
		{
			type: 'row',
			fields: [
				{ name: 'subtotal', type: 'number', admin: { width: '25%', description: 'Cents.' } },
				{ name: 'shipping', type: 'number', admin: { width: '25%', description: 'Cents.' } },
				{ name: 'tax', type: 'number', admin: { width: '25%', description: 'Cents.' } },
				{ name: 'total', type: 'number', admin: { width: '25%', description: 'Cents.' } }
			]
		},
		{
			name: 'shippingAddress',
			type: 'group',
			fields: [
				{ name: 'name', type: 'text' },
				{ name: 'line1', type: 'text' },
				{ name: 'line2', type: 'text' },
				{ name: 'city', type: 'text' },
				{ name: 'state', type: 'text' },
				{ name: 'postalCode', type: 'text' },
				{ name: 'country', type: 'text' }
			]
		},
		{ name: 'stripeSessionId', type: 'text', admin: { position: 'sidebar', readOnly: true } },
		{ name: 'stripePaymentIntent', type: 'text', admin: { position: 'sidebar', readOnly: true } }
	]
};

export default Orders;
