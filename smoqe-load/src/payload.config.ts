import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { s3Storage } from '@payloadcms/storage-s3';
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';

import Users from './collections/Users';
import Media from './collections/Media';
import Products from './collections/Products';
import BlogPosts from './collections/BlogPosts';
import CateringRequests from './collections/CateringRequests';
import NewsletterSubscribers from './collections/NewsletterSubscribers';
import ContactMessages from './collections/ContactMessages';
import Orders from './collections/Orders';
import SiteSettings from './globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';
const publicSiteURL = process.env.FRONTEND_URL || 'https://smoqesignals.com';
const databaseURI = process.env.DATABASE_URI;

if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET) {
	throw new Error('PAYLOAD_SECRET is required in production');
}

/* ----------------------------- database ----------------------------- */
const resolveDatabaseAdapter = async () => {
	if (databaseURI?.startsWith('postgres')) {
		const { postgresAdapter } = await import('@payloadcms/db-postgres');
		// `push: true` auto-syncs the schema on boot — there are no migration files
		// yet, so a fresh Postgres would otherwise start with no tables. Fine for a
		// clean launch DB; generate real migrations and turn this off post-launch.
		return postgresAdapter({ pool: { connectionString: databaseURI }, push: true });
	}
	const { sqliteAdapter } = await import('@payloadcms/db-sqlite');
	return sqliteAdapter({ client: { url: databaseURI || 'file:./smoqe.db' } });
};
const db = await resolveDatabaseAdapter();

/* ------------------------------- email ------------------------------ */
const hasSmtp = !!process.env.SMTP_USER && !!process.env.SMTP_PASSWORD;
const email = nodemailerAdapter({
	defaultFromAddress: process.env.FROM_EMAIL || 'orders@smoqesignals.com',
	defaultFromName: process.env.FROM_NAME || 'Smoqe Signals BBQ',
	// With SMTP creds we send for real; without them we log emails to the
	// console (jsonTransport) so local dev never blocks on email.
	transportOptions: hasSmtp
		? {
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT || 587),
				auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
			}
		: { jsonTransport: true },
	skipVerify: !hasSmtp
});

/* ------------------------------- SEO -------------------------------- */
const generateTitle: GenerateTitle<{ title?: string; name?: string }> = ({ doc }) => {
	const t = doc?.title || doc?.name;
	return t ? `${t} | Smoqe Signals BBQ` : 'Smoqe Signals BBQ';
};
const generateURL: GenerateURL<{ slug?: string }> = ({ doc }) =>
	`${publicSiteURL}${doc?.slug ? `/${doc.slug}` : ''}`;

export default buildConfig({
	serverURL,
	cors: [
		publicSiteURL,
		...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
		...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173'] : [])
	],
	admin: {
		user: Users.slug,
		importMap: { baseDir: path.resolve(dirname) },
		meta: {
			title: 'Smoqe Signals BBQ',
			titleSuffix: ' · Admin'
		}
	},
	collections: [
		Users,
		Media,
		Products,
		Orders,
		BlogPosts,
		CateringRequests,
		ContactMessages,
		NewsletterSubscribers
	],
	globals: [SiteSettings],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
	db,
	sharp,
	email,
	plugins: [
		// Cloudflare R2 (S3-compatible) — only when configured.
		...(process.env.R2_ACCESS_KEY_ID
			? [
					s3Storage({
						collections: { media: true },
						bucket: process.env.R2_BUCKET || 'smoqe-signals',
						config: {
							credentials: {
								accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
								secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
							},
							region: 'auto',
							endpoint:
								process.env.R2_ENDPOINT ||
								`https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
						}
					})
				]
			: []),
		seoPlugin({
			collections: ['products', 'blogPosts'],
			globals: ['siteSettings'],
			generateTitle,
			generateURL
		})
	]
});
