<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { ArrowRight } from '@lucide/svelte';
	import { formatDate } from '$lib/utils';

	let { post }: { post: BlogPost } = $props();
</script>

<a
	href={`/blog/${post.slug}`}
	class="group flex flex-col overflow-hidden rounded-lg border border-paper-line bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
>
	<div class="aspect-[16/10] overflow-hidden bg-paper-2">
		<img
			src={post.cover}
			alt={post.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			loading="lazy"
		/>
	</div>
	<div class="flex flex-1 flex-col p-[22px]">
		<div class="mb-3 flex items-center gap-2.5">
			<span class="badge-soft">{post.category}</span>
			<span class="text-[13px] font-semibold text-ink-soft">{post.readMins} min read</span>
		</div>
		<h3 class="mb-2.5 text-xl font-extrabold leading-tight text-ink">{post.title}</h3>
		<p class="flex-1 text-[14.5px] leading-relaxed text-ink-soft">{post.excerpt}</p>
		<span class="mt-4 flex items-center gap-2 text-sm font-extrabold text-flame">
			Read more <ArrowRight size={16} />
		</span>
	</div>
</a>
