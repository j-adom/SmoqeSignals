import type { CollectionConfig } from 'payload';
import { admins, contentManagers } from '../access';

/** Shared slug + SEO auto-fill hook used by content collections. */
const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

const Products: CollectionConfig = {
	slug: 'products',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'category', 'price', 'featured', 'inStock'],
		group: 'Shop'
	},
	access: {
		create: contentManagers,
		delete: admins,
		read: () => true,
		update: contentManagers
	},
	fields: [
		{
			type: 'row',
			fields: [
				{ name: 'name', type: 'text', required: true, admin: { width: '60%' } },
				{
					name: 'category',
					type: 'select',
					required: true,
					admin: { width: '40%' },
					options: [
						{ label: 'Dry Rub', value: 'Dry Rub' },
						{ label: 'Seasoning', value: 'Seasoning' },
						{ label: 'Sauce', value: 'Sauce' },
						{ label: 'Gift Set', value: 'Gift Set' },
						{ label: 'Gear', value: 'Gear' },
						{ label: 'eBook', value: 'eBook' }
					]
				}
			]
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			index: true,
			admin: { description: 'URL slug (auto-generated from name if left blank).' }
		},
		{
			name: 'fulfillment',
			type: 'select',
			required: true,
			defaultValue: 'physical',
			options: [
				{ label: 'Physical shipment', value: 'physical' },
				{ label: 'Digital delivery', value: 'digital' },
				{ label: 'Digital pre-order', value: 'preorder' }
			],
			admin: {
				description: 'Controls whether Stripe collects a shipping address for this product.',
				position: 'sidebar'
			}
		},
		{
			type: 'row',
			fields: [
				{
					name: 'price',
					type: 'number',
					required: true,
					min: 0,
					admin: { width: '33%', description: 'Price in US dollars (e.g. 12.00).' }
				},
				{
					name: 'heat',
					type: 'number',
					defaultValue: 0,
					min: 0,
					max: 5,
					admin: { width: '33%', description: 'Heat level 0–5 (0 hides the meter).' }
				},
				{
					name: 'tag',
					type: 'text',
					admin: { width: '34%', description: 'Optional badge: Best Seller, Hot, Save $4…' }
				}
			]
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			admin: { description: 'Primary product photo.' }
		},
		{
			name: 'short',
			type: 'textarea',
			required: true,
			maxLength: 160,
			admin: { description: 'One-line description for cards (max 160 chars).' }
		},
		{
			name: 'long',
			type: 'textarea',
			admin: { description: 'Full description shown on the product page.' }
		},
		{
			name: 'size',
			type: 'text',
			admin: { description: 'Pack size, e.g. "6 oz shaker".' }
		},
		{
			name: 'notes',
			type: 'array',
			labels: { singular: 'Note', plural: 'Notes' },
			admin: { description: 'Short feature chips: All natural, Gluten free…' },
			fields: [{ name: 'note', type: 'text', required: true }]
		},
		{
			type: 'row',
			fields: [
				{ name: 'featured', type: 'checkbox', defaultValue: false, admin: { width: '50%', description: 'Show on the homepage.' } },
				{ name: 'inStock', type: 'checkbox', defaultValue: true, admin: { width: '50%' } }
			]
		},
		{
			name: 'stripePriceId',
			type: 'text',
			admin: {
				description: 'Optional: a pre-created Stripe Price ID. If blank, checkout prices on the fly from the price above.',
				position: 'sidebar'
			}
		},
		{
			name: 'sku',
			type: 'text',
			admin: { position: 'sidebar' }
		}
	],
	hooks: {
		beforeValidate: [
			({ data, operation }) => {
				if (!data || (operation !== 'create' && operation !== 'update')) return data;
				if (!data.slug && data.name) data.slug = slugify(data.name);
				return data;
			}
		]
	}
};

export default Products;
