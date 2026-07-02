import type { RequestHandler } from './$types';

// Domain-aware robots.txt — points the sitemap at whatever origin serves the
// site (works identically on *.pages.dev previews and the production domain).
export const GET: RequestHandler = ({ url }) => {
	const body = `User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.xml\n`;
	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
};
