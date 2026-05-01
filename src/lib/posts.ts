import { type Post } from '$lib/types';

export async function getPosts(): Promise<Post[]> {
	const paths = import.meta.glob('/src/content/blog/*.md', { eager: true });
	let posts: Post[] = [];

	for (const path in paths) {
		const file = paths[path] as { metadata: any };
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post = { ...metadata, slug } as Post;
			if (post.published) posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}
