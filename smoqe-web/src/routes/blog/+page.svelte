<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';
	import Tristar from '$lib/components/Tristar.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import NewsletterBand from '$lib/components/NewsletterBand.svelte';

	let { data }: { data: PageData } = $props();
	const featured = $derived(data.posts[0]);
	const rest = $derived(data.posts.slice(1));
</script>

<svelte:head>
	<title>Blog | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="Recipes, pit tips, and stories from the Smoqe Signals BBQ truck and trail."
	/>
</svelte:head>

<div class="rise">
	<section class="border-paper-line border-b">
		<div class="container-wide pt-[60px]">
			<div class="mb-3.5 flex items-center gap-3">
				<Tristar lg /><span class="eyebrow text-flame">From the Pit</span>
			</div>
			<h1 class="display text-[clamp(2.5rem,7vw,4.75rem)]">SmoQe Signals</h1>
			<p class="text-ink-soft mt-4 mb-12 max-w-xl text-lg leading-relaxed">
				Recipes, pit tips, and stories from the truck and the trail.
			</p>
		</div>
	</section>

	<section class="py-14">
		<div class="container-wide">
			{#if featured}
				<a
					href={`/blog/${featured.slug}`}
					class="card-brand mb-12 grid overflow-hidden md:grid-cols-[1.1fr_1fr]"
				>
					<div class="bg-paper-2 min-h-[320px]">
						<img src={featured.cover} alt={featured.title} class="h-full w-full object-cover" />
					</div>
					<div class="flex flex-col justify-center p-10">
						<div class="mb-3.5 flex items-center gap-2.5">
							<span class="badge-soft">Featured · {featured.category}</span>
							<span class="text-ink-soft text-[13px] font-semibold"
								>{formatDate(featured.date)}</span
							>
						</div>
						<h2 class="display mb-3.5 text-[clamp(1.6rem,3.4vw,2.375rem)]">{featured.title}</h2>
						<p class="text-ink-soft mb-[22px] text-base leading-relaxed">{featured.excerpt}</p>
						<span class="btn btn-ghost self-start">Read the post <ArrowRight size={18} /></span>
					</div>
				</a>
			{/if}

			{#if rest.length}
				<div class="grid gap-6 md:grid-cols-3">
					{#each rest as post (post.id)}
						<BlogCard {post} />
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<NewsletterBand />
</div>
