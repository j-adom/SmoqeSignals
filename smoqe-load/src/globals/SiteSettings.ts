import type { GlobalConfig } from 'payload';
import { contentManagers } from '../access';

const SiteSettings: GlobalConfig = {
	slug: 'siteSettings',
	admin: { group: 'System' },
	access: { read: () => true, update: contentManagers },
	fields: [
		{
			name: 'announcement',
			type: 'text',
			admin: { description: 'Optional banner text shown across the site (leave blank to hide).' }
		},
		{
			type: 'row',
			fields: [
				{ name: 'phone', type: 'text', defaultValue: '615-429-4851', admin: { width: '50%' } },
				{ name: 'email', type: 'email', defaultValue: 'info@smoqesignals.com', admin: { width: '50%' } }
			]
		},
		{ name: 'address', type: 'text', defaultValue: 'PO Box 9112, Nashville, TN 37209' },
		{
			name: 'social',
			type: 'group',
			fields: [
				{ name: 'instagram', type: 'text' },
				{ name: 'facebook', type: 'text' },
				{ name: 'tiktok', type: 'text' }
			]
		}
	]
};

export default SiteSettings;
