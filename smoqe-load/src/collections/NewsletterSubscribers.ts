import type { CollectionConfig } from 'payload';
import { notifyNewsletter } from '../email/notify';

const isStaff = ({ req }: { req: { user?: unknown } }) => !!req.user;

const NewsletterSubscribers: CollectionConfig = {
	slug: 'newsletterSubscribers',
	admin: {
		useAsTitle: 'email',
		defaultColumns: ['email', 'source', 'status', 'createdAt'],
		group: 'Inbox'
	},
	access: {
		create: () => true,
		read: isStaff,
		update: isStaff,
		delete: isStaff
	},
	fields: [
		{ name: 'email', type: 'email', required: true, unique: true, index: true },
		{
			name: 'source',
			type: 'text',
			admin: { description: 'Where the signup came from (footer, home-band…).' }
		},
		{
			name: 'status',
			type: 'select',
			defaultValue: 'subscribed',
			admin: { position: 'sidebar' },
			options: [
				{ label: 'Subscribed', value: 'subscribed' },
				{ label: 'Unsubscribed', value: 'unsubscribed' }
			]
		}
	],
	hooks: {
		afterChange: [
			async ({ doc, operation, req }) => {
				if (operation === 'create') {
					await notifyNewsletter(req.payload, String((doc as { email?: string }).email ?? ''));
				}
			}
		]
	}
};

export default NewsletterSubscribers;
