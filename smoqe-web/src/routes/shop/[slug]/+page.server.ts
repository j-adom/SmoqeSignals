import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProductBySlug, getProducts } from '$lib/server/payload';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const product = await getProductBySlug(params.slug, fetch);
	if (!product) throw error(404, 'Product not found');
	const all = await getProducts(fetch);
	const related = all
		.filter(
			(p) => p.slug !== product.slug && (p.category === product.category || p.heat === product.heat)
		)
		.slice(0, 4);
	return { product, related };
};
