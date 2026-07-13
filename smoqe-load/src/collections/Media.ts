import type { CollectionConfig } from 'payload';
import { admins, contentManagers } from '../access';

const Media: CollectionConfig = {
	slug: 'media',
	admin: { group: 'System' },
	access: {
		create: contentManagers,
		delete: admins,
		read: () => true,
		update: contentManagers
	},
	upload: {
		// Local disk in development; the s3Storage plugin (payload.config.ts)
		// transparently redirects uploads to Cloudflare R2 when R2_* env vars are set.
		staticDir: 'media',
		mimeTypes: ['image/*'],
		imageSizes: [
			{ name: 'thumbnail', width: 400, height: 400, position: 'centre' },
			{ name: 'card', width: 900, height: 900, position: 'centre' },
			{ name: 'hero', width: 1800 }
		]
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
			admin: { description: 'Describe the image for accessibility and SEO.' }
		},
		{
			name: 'credit',
			type: 'text',
			admin: { description: 'Optional photo credit.' }
		}
	]
};

export default Media;
