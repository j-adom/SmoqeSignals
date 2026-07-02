import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/server/payload';

export const load: PageServerLoad = async ({ fetch }) => {
	return { posts: await getPosts(fetch) };
};
