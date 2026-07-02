import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/server/payload';

export const load: PageServerLoad = async ({ fetch }) => {
	return { products: await getProducts(fetch) };
};
