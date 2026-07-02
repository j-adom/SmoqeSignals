import type { CollectionConfig } from 'payload';

const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

const BlogPosts: CollectionConfig = {
	slug: 'blogPosts',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'category', 'status', 'publishDate', 'featured'],
		group: 'Content'
	},
	access: {
		read: () => true
	},
	fields: [
		{ name: 'title', type: 'text', required: true },
		{
			name: 'slug',
			type: 'text',
			unique: true,
			index: true,
			admin: { description: 'URL slug (auto-generated from title if blank).' }
		},
		{
			name: 'excerpt',
			type: 'textarea',
			maxLength: 300,
			admin: { description: 'Short preview shown in listings (max 300 chars).' }
		},
		{
			name: 'content',
			type: 'richText',
			required: true,
			admin: { description: 'Main post body.' }
		},
		{
			type: 'row',
			fields: [
				{
					name: 'category',
					type: 'select',
					required: true,
					defaultValue: 'news',
					admin: { width: '50%' },
					options: [
						{ label: 'News', value: 'news' },
						{ label: 'Pit Tips', value: 'pit-tips' },
						{ label: 'Recipes', value: 'recipes' },
						{ label: 'Our Story', value: 'our-story' },
						{ label: 'Events', value: 'events' }
					]
				},
				{
					name: 'readMins',
					type: 'number',
					defaultValue: 4,
					min: 1,
					admin: { width: '50%', description: 'Estimated read time in minutes.' }
				}
			]
		},
		{
			name: 'featuredImage',
			type: 'upload',
			relationTo: 'media',
			admin: { description: 'Cover image.' }
		},
		{
			name: 'author',
			type: 'relationship',
			relationTo: 'users',
			admin: { description: 'Staff author (optional).' }
		},
		{
			name: 'guestAuthor',
			type: 'text',
			admin: { description: 'Guest author name, if not a staff member.' }
		},
		// ---- Sidebar: publishing ----
		{
			name: 'status',
			type: 'select',
			required: true,
			defaultValue: 'draft',
			admin: { position: 'sidebar' },
			options: [
				{ label: 'Draft', value: 'draft' },
				{ label: 'Published', value: 'published' },
				{ label: 'Archived', value: 'archived' }
			]
		},
		{
			name: 'publishDate',
			type: 'date',
			admin: { position: 'sidebar', description: 'Defaults to now on first publish.' }
		},
		{
			name: 'featured',
			type: 'checkbox',
			defaultValue: false,
			admin: { position: 'sidebar', description: 'Pin to the top of the blog.' }
		},
		// ---- SEO ----
		{
			name: 'seo',
			type: 'group',
			admin: { description: 'Search-engine metadata (auto-filled from the post if blank).' },
			fields: [
				{ name: 'title', type: 'text', maxLength: 70 },
				{ name: 'description', type: 'textarea', maxLength: 180 }
			]
		}
	],
	hooks: {
		beforeValidate: [
			({ data, operation }) => {
				if (!data || (operation !== 'create' && operation !== 'update')) return data;
				if (!data.slug && data.title) data.slug = slugify(data.title);
				if (!data.seo) data.seo = {};
				if (!data.seo.title && data.title) data.seo.title = data.title;
				if (!data.seo.description && data.excerpt) data.seo.description = data.excerpt;
				if (data.status === 'published' && !data.publishDate) {
					data.publishDate = new Date().toISOString();
				}
				return data;
			}
		]
	}
};

export default BlogPosts;
