<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/stores/cart.svelte';
	import { toast } from '$lib/stores/toast.svelte';
	import { money } from '$lib/utils';
	import HeatMeter from './HeatMeter.svelte';

	let { product }: { product: Product } = $props();
	const hot = product.tag === 'Heat' || product.tag === 'Hot';

	function add() {
		cart.add(product, 1);
		toast.show(`${product.name} added to cart`);
	}
</script>

<article
	class="group flex flex-col overflow-hidden rounded-lg border border-paper-line bg-white transition duration-200 hover:-translate-y-1 hover:border-flame/40 hover:shadow-[var(--shadow-lift)]"
>
	<a href={`/shop/${product.slug}`} class="relative block aspect-square overflow-hidden bg-paper-2">
		<img
			src={product.image}
			alt={product.name}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			loading="lazy"
		/>
		{#if product.tag}
			<span
				class={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white ${
					hot ? 'bg-flame' : 'bg-smoke-900'
				}`}
			>
				{product.tag}
			</span>
		{/if}
	</a>
	<div class="flex flex-1 flex-col gap-1.5 p-[18px]">
		<div class="flex items-center justify-between gap-2">
			<span class="eyebrow text-[11px] text-ink-soft">{product.category}</span>
			<HeatMeter level={product.heat} />
		</div>
		<a href={`/shop/${product.slug}`} class="text-[17px] font-extrabold tracking-tight text-ink">
			{product.name}
		</a>
		<p class="flex-1 text-[13.5px] leading-relaxed text-ink-soft">{product.short}</p>
		<div class="mt-2.5 flex items-center justify-between">
			<span class="display text-[22px] text-ink">{money(product.price)}</span>
			<button class="btn btn-dark btn-sm" onclick={add}>Add to Cart</button>
		</div>
	</div>
</article>
