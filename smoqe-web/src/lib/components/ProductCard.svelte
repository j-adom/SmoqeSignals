<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/stores/cart.svelte';
	import { toast } from '$lib/stores/toast.svelte';
	import { money } from '$lib/utils';
	import HeatMeter from './HeatMeter.svelte';

	let { product }: { product: Product } = $props();
	const hot = $derived(product.tag === 'Heat' || product.tag === 'Hot');

	function add() {
		if (!product.inStock) return;
		cart.add(product, 1);
		toast.show(`${product.name} added to cart`);
	}
</script>

<article
	class="group border-paper-line hover:border-flame/40 flex flex-col overflow-hidden rounded-lg border bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
>
	<a href={`/shop/${product.slug}`} class="bg-paper-2 relative block aspect-square overflow-hidden">
		<img
			src={product.image}
			alt={product.name}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			loading="lazy"
		/>
		{#if product.tag}
			<span
				class={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase ${
					hot ? 'bg-flame' : 'bg-smoke-900'
				}`}
			>
				{product.tag}
			</span>
		{/if}
	</a>
	<div class="flex flex-1 flex-col gap-1.5 p-[18px]">
		<div class="flex items-center justify-between gap-2">
			<span class="eyebrow text-ink-soft text-[11px]">{product.category}</span>
			<HeatMeter level={product.heat} />
		</div>
		<a href={`/shop/${product.slug}`} class="text-ink text-[17px] font-extrabold tracking-tight">
			{product.name}
		</a>
		<p class="text-ink-soft flex-1 text-[13.5px] leading-relaxed">{product.short}</p>
		<div class="mt-2.5 flex items-center justify-between">
			<span class="display text-ink text-[22px]">{money(product.price)}</span>
			<button class="btn btn-dark btn-sm" onclick={add} disabled={!product.inStock}>
				{product.inStock ? 'Add to Cart' : 'Sold Out'}
			</button>
		</div>
	</div>
</article>
