import type { CollectionConfig } from 'payload';

const Users: CollectionConfig = {
	slug: 'users',
	auth: true,
	admin: {
		useAsTitle: 'email',
		defaultColumns: ['name', 'email', 'role'],
		group: 'System'
	},
	access: {
		read: () => true
	},
	fields: [
		{
			name: 'name',
			type: 'text'
		},
		{
			name: 'role',
			type: 'select',
			required: true,
			defaultValue: 'staff',
			options: [
				{ label: 'Admin', value: 'admin' },
				{ label: 'Staff', value: 'staff' },
				{ label: 'Editor', value: 'editor' }
			],
			admin: {
				description: 'Controls access across the admin and APIs.'
			}
		}
	]
};

export default Users;
