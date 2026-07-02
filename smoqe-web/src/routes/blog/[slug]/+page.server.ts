import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPostBySlug, getPosts } from '$lib/server/payload';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const post = await getPostBySlug(params.slug, fetch);
	if (!post) throw error(404, 'Post not found');
	const all = await getPosts(fetch);
	const more = all.filter((p) => p.slug !== post.slug).slice(0, 2);
	return { post, more };
};
