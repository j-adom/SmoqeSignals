<script lang="ts">
	import { Leaf, Flame, Truck } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { PRODUCT_CATEGORIES } from '$lib/data/seed';
	import Tristar from '$lib/components/Tristar.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { data }: { data: PageData } = $props();

	let active = $state<(typeof PRODUCT_CATEGORIES)[number]>('All');
	const filtered = $derived(
		active === 'All' ? data.products : data.products.filter((p) => p.category === active)
	);

	const valueProps = [
		{ Icon: Leaf, t: 'All Natural', d: 'No MSG, no fillers. Just spices, salt, and smoke.' },
		{ Icon: Flame, t: 'Pit-Tested', d: 'Every blend earns its place on the truck before the shelf.' },
		{ Icon: Truck, t: 'Ships Fast', d: 'Packed and out the door in 1–2 business days.' }
	];
</script>

<svelte:head>
	<title>Shop Dry Rubs & Sauces | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="All-natural BBQ dry rubs, seasonings, and small-batch sauces — the exact blends Smoqe Signals uses on the truck. Free shipping over $45."
	/>
</svelte:head>

<div class="rise">
	<!-- hero -->
	<section class="relative overflow-hidden bg-smoke-900 text-white">
		<div class="absolute inset-0">
			<img
				src="/images/wings-rub.jpg"
				alt=""
				class="h-full w-full object-cover object-[center_30%] opacity-40"
			/>
			<div
				class="absolute inset-0"
				style="background:linear-gradient(90deg, rgba(12,9,6,.95), rgba(12,9,6,.55))"
			></div>
		</div>
		<div class="container-wide relative py-[72px]">
			<div class="mb-4 flex items-center gap-3"><Tristar lg /><span class="eyebrow text-ember">The Rub Shop</span></div>
			<h1 class="display max-w-3xl text-[clamp(2.5rem,7vw,4.75rem)]">Bottled smoke for your kitchen</h1>
			<p class="mt-4 max-w-xl text-lg leading-relaxed text-cream-text">
				All-natural rubs, seasonings, and small-batch sauces — the exact blends we use on the truck.
				Free shipping on orders over $45.
			</p>
		</div>
	</section>

	<!-- grid -->
	<section class="py-[88px]">
		<div class="container-wide">
			<div class="mb-9 flex flex-wrap gap-2.5">
				{#each PRODUCT_CATEGORIES as cat (cat)}
					<button class={`chip ${active === cat ? 'chip-on' : ''}`} onclick={() => (active = cat)}>
						{cat}
					</button>
				{/each}
			</div>
			<div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
				{#each filtered as product (product.id)}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	</section>

	<!-- value props -->
	<section class="border-t border-paper-line bg-paper-2 py-14">
		<div class="container-wide grid gap-6 md:grid-cols-3">
			{#each valueProps as v (v.t)}
				<div class="flex items-start gap-4">
					<div class="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[11px] bg-smoke-900 text-ember">
						<v.Icon size={24} />
					</div>
					<div>
						<h4 class="mb-1 text-[17px] font-extrabold">{v.t}</h4>
						<p class="text-[14.5px] leading-snug text-ink-soft">{v.d}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
