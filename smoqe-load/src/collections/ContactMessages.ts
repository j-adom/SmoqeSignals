import type { CollectionConfig } from 'payload';
import { notifyContact } from '../email/notify';

const isStaff = ({ req }: { req: { user?: unknown } }) => !!req.user;

const ContactMessages: CollectionConfig = {
	slug: 'contactMessages',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'email', 'status', 'createdAt'],
		group: 'Inbox'
	},
	access: {
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
						{ label: 'Replied', value: 'replied' },
						{ label: 'Closed', value: 'closed' }
					]
				}
			]
		},
		{ name: 'email', type: 'email', required: true },
		{ name: 'message', type: 'textarea', required: true }
	],
	hooks: {
		afterChange: [
			async ({ doc, operation, req }) => {
				if (operation === 'create') {
					await notifyContact(req.payload, doc as Record<string, unknown>);
				}
			}
		]
	}
};

export default ContactMessages;
