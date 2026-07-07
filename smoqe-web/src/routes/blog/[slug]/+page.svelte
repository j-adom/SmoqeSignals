<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { BIZ } from '$lib/data/seed';
	import { formatDate } from '$lib/utils';
	import LexicalRenderer from '$lib/components/LexicalRenderer.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';

	let { data }: { data: PageData } = $props();
	const p = $derived(data.post);
</script>

<svelte:head>
	<title>{p.title} | Smoqe Signals BBQ</title>
	<meta name="description" content={p.excerpt} />
</svelte:head>

<article class="rise">
	<div class="container-tight max-w-3xl pt-11">
		<a
			href="/blog"
			class="text-flame mb-[26px] inline-flex items-center gap-1.5 text-sm font-extrabold"
		>
			<ArrowLeft size={16} /> All posts
		</a>
		<div class="mb-4 flex items-center gap-2.5">
			<span class="badge-soft">{p.category}</span>
			<span class="text-ink-soft text-[13.5px] font-semibold"
				>{formatDate(p.date)} · {p.readMins} min read</span
			>
		</div>
		<h1 class="display mb-6 text-[clamp(2rem,5.5vw,3.5rem)] leading-none">{p.title}</h1>
	</div>

	<div class="container-tight px-6">
		<img
			src={p.cover}
			alt={p.title}
			class="mt-2 mb-9 h-[min(460px,50vw)] w-full rounded-lg object-cover"
		/>
	</div>

	<div class="container-tight max-w-2xl pb-16">
		{#if p.content}
			<div
				class="prose prose-lg prose-headings:font-display prose-headings:uppercase prose-p:text-ink prose-p:leading-relaxed prose-a:text-flame prose-strong:text-ink max-w-none"
			>
				<LexicalRenderer content={p.content} />
			</div>
		{:else if p.bodyText}
			{#each p.bodyText as para, i (i)}
				<p class={`text-ink mb-6 text-[18.5px] leading-[1.8] ${i === 0 ? 'font-medium' : ''}`}>
					{para}
				</p>
			{/each}
		{/if}

		<div class="border-paper-line mt-5 flex flex-wrap items-center gap-3.5 border-t pt-7">
			<img
				src="/images/shon.png"
				alt="Shon"
				class="h-[52px] w-[52px] rounded-full object-cover object-top"
			/>
			<div>
				<div class="font-extrabold">Shon · Pitmaster</div>
				<div class="text-ink-soft text-sm">{BIZ.legal}</div>
			</div>
			<a href="/shop" class="btn btn-primary btn-sm ml-auto">Shop the Rubs</a>
		</div>
	</div>

	{#if data.more.length}
		<section class="border-paper-line bg-paper-2 border-t py-[88px]">
			<div class="container-wide">
				<h2 class="display mb-7 text-3xl">Keep reading</h2>
				<div class="grid gap-6 md:grid-cols-2">
					{#each data.more as post (post.id)}
						<BlogCard {post} />
					{/each}
				</div>
			</div>
		</section>
	{/if}
</article>
