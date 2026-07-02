<script lang="ts">
	import type { Snippet } from 'svelte';
	import Tristar from './Tristar.svelte';

	let {
		title,
		updated,
		description,
		children
	}: { title: string; updated: string; description: string; children: Snippet } = $props();
</script>

<svelte:head>
	<title>{title} | Smoqe Signals BBQ</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="rise">
	<section class="bg-smoke-900 text-white">
		<div class="container-tight max-w-3xl py-[64px]">
			<div class="mb-4 flex items-center gap-3"><Tristar lg /><span class="eyebrow text-ember">Legal</span></div>
			<h1 class="display text-[clamp(2rem,5vw,3.25rem)]">{title}</h1>
			<p class="mt-3 text-sm text-cream-muted">Last updated: {updated}</p>
		</div>
	</section>
	<section class="py-[72px]">
		<div class="container-tight max-w-3xl">
			<div
				class="prose prose-neutral max-w-none prose-headings:font-extrabold prose-headings:text-ink prose-a:text-flame prose-strong:text-ink"
			>
				{@render children()}
			</div>
		</div>
	</section>
</div>
