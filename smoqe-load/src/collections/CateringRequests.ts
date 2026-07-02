import type { CollectionConfig } from 'payload';
import { notifyCatering } from '../email/notify';

const isStaff = ({ req }: { req: { user?: { role?: string } | null } }) => !!req.user;

const CateringRequests: CollectionConfig = {
	slug: 'cateringRequests',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'serviceStyle', 'eventDate', 'status', 'createdAt'],
		group: 'Inbox'
	},
	access: {
		// Anyone can submit the public form; only staff can read/manage.
		create: () => true,
		read: isStaff,
		update: isStaff,
		delete: isStaff
	},
	fields: [
		{
			type: 'row',
			fields: [
				{ name: 'name', type: 'text', required: true, admin: { width: '50%' } },
				{
					name: 'status',
					type: 'select',
					defaultValue: 'new',
					admin: { width: '50%', position: 'sidebar' },
					options: [
						{ label: 'New', value: 'new' },
						{ label: 'Contacted', value: 'contacted' },
						{ label: 'Booked', value: 'booked' },
						{ label: 'Closed', value: 'closed' }
					]
				}
			]
		},
		{
			type: 'row',
			fields: [
				{ name: 'email', type: 'email', required: true, admin: { width: '50%' } },
				{ name: 'phone', type: 'text', required: true, admin: { width: '50%' } }
			]
		},
		{
			type: 'row',
			fields: [
				{ name: 'eventDate', type: 'text', admin: { width: '50%' } },
				{ name: 'guestCount', type: 'text', admin: { width: '50%' } }
			]
		},
		{ name: 'serviceStyle', type: 'text', required: true },
		{ name: 'notes', type: 'textarea' }
	],
	hooks: {
		afterChange: [
			async ({ doc, operation, req }) => {
				if (operation === 'create') {
					await notifyCatering(req.payload, doc as Record<string, unknown>);
				}
			}
		]
	}
};

export default CateringRequests;
