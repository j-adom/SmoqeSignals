import type { PageServerLoad } from './$types';
import { getProducts, getPosts } from '$lib/server/payload';

export const load: PageServerLoad = async ({ fetch }) => {
	const [products, posts] = await Promise.all([getProducts(fetch), getPosts(fetch)]);
	const featured = products.filter((p) => p.featured).slice(0, 4);
	return {
		featured: featured.length ? featured : products.slice(0, 4),
		posts: posts.slice(0, 3)
	};
};
