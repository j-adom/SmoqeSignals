<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { ArrowRight } from '@lucide/svelte';
	import { formatDate } from '$lib/utils';

	let { post }: { post: BlogPost } = $props();
</script>

<a
	href={`/blog/${post.slug}`}
	class="group border-paper-line flex flex-col overflow-hidden rounded-lg border bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
>
	<div class="bg-paper-2 aspect-[16/10] overflow-hidden">
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
			<span class="text-ink-soft text-[13px] font-semibold">{post.readMins} min read</span>
		</div>
		<h3 class="text-ink mb-2.5 text-xl leading-tight font-extrabold">{post.title}</h3>
		<p class="text-ink-soft flex-1 text-[14.5px] leading-relaxed">{post.excerpt}</p>
		<span class="text-flame mt-4 flex items-center gap-2 text-sm font-extrabold">
			Read more <ArrowRight size={16} />
		</span>
	</div>
</a>
