import type { RequestHandler } from './$types';
import { getPosts, getProducts } from '$lib/server/payload';

const STATIC_PATHS = [
	'',
	'/shop',
	'/food-truck',
	'/catering',
	'/the-history',
	'/blog',
	'/contact-us',
	'/privacy-policy',
	'/terms',
	'/shipping-returns'
];

// Domain-aware sitemap. Enumerates the static pages plus every shop product and
// blog post, using the request origin so it is correct on any deployed domain.
export const GET: RequestHandler = async ({ url, fetch }) => {
	const [products, posts] = await Promise.all([getProducts(fetch), getPosts(fetch)]);

	const paths = [
		...STATIC_PATHS,
		...products.map((p) => `/shop/${p.slug}`),
		...posts.map((p) => `/blog/${p.slug}`)
	];

	const urls = paths.map((p) => `<url><loc>${url.origin}${p}</loc></url>`).join('');

	const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
};
