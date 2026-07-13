import type { CollectionConfig } from 'payload';
import { notifyContact } from '../email/notify';
import { admins, denyPublic, staffOrAdmins } from '../access';

const ContactMessages: CollectionConfig = {
	slug: 'contactMessages',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'email', 'status', 'createdAt'],
		group: 'Inbox'
	},
	access: {
		create: denyPublic,
		delete: admins,
		read: staffOrAdmins,
		update: staffOrAdmins
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
		{
			name: 'inquiryType',
			type: 'select',
			defaultValue: 'General Inquiry',
			admin: { description: 'What the message is about (from the contact form dropdown).' },
			options: [
				{ label: 'General Inquiry', value: 'General Inquiry' },
				{ label: 'Booking The Truck Inquiry', value: 'Booking The Truck Inquiry' },
				{ label: 'Catering Inquiry', value: 'Catering Inquiry' }
			]
		},
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
