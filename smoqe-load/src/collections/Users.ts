import type { CollectionConfig } from 'payload';
import { admins, adminsField, allTeam, allTeamField, userHasRole } from '../access';

const Users: CollectionConfig = {
	slug: 'users',
	auth: {
		cookies: {
			sameSite: 'Lax',
			secure: process.env.NODE_ENV === 'production'
		},
		lockTime: 10 * 60 * 1000,
		maxLoginAttempts: 5
	},
	admin: {
		useAsTitle: 'email',
		defaultColumns: ['name', 'email', 'role'],
		group: 'System'
	},
	access: {
		admin: ({ req }) => userHasRole(req.user, ['admin', 'staff', 'editor']),
		create: admins,
		delete: admins,
		read: allTeam,
		unlock: admins,
		update: admins
	},
	fields: [
		{
			name: 'email',
			type: 'email',
			required: true,
			unique: true,
			access: {
				create: adminsField,
				read: allTeamField,
				update: adminsField
			}
		},
		{
			name: 'name',
			type: 'text'
		},
		{
			name: 'role',
			type: 'select',
			required: true,
			defaultValue: 'staff',
			access: {
				create: adminsField,
				update: adminsField
			},
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
