<script lang="ts">
	import { Leaf, Flame, Package } from '@lucide/svelte';
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
		{ Icon: Leaf, t: 'All Natural', d: 'No MSG, no gluten. Just spices, salt, and smoke.' },
		{
			Icon: Flame,
			t: 'Pit-Tested',
			d: 'Every blend earns its place on the truck before it hits the shelf.'
		},
		{
			Icon: Package,
			t: 'Small Batch',
			d: "Nashville bred, mixed in small batches with Slim's own secret blend of hand-picked spices."
		}
	];
</script>

<svelte:head>
	<title>The SmoQe Shop | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="The SmoQe Shop — all natural dry rubs, seasonings, small batch sauces, and recipe eBooks from Smoqe Signals BBQ. Everything you need to bring the SmoQe home."
	/>
</svelte:head>

<div class="rise">
	<!-- hero -->
	<section class="bg-smoke-900 relative overflow-hidden text-white">
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
			<div class="mb-4 flex items-center gap-3">
				<Tristar lg /><span class="eyebrow text-ember">The SmoQe Shop</span>
			</div>
			<h1 class="display max-w-3xl text-[clamp(2.5rem,7vw,4.75rem)]">
				Everything you need to bring the SmoQe home
			</h1>
			<p class="text-cream-text mt-4 max-w-xl text-lg leading-relaxed">
				All natural dry rubs, seasonings, small batch sauces, and recipe eBooks to master the
				craft.
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
	<section class="border-paper-line bg-paper-2 border-t py-14">
		<div class="container-wide grid gap-6 md:grid-cols-3">
			{#each valueProps as v (v.t)}
				<div class="flex items-start gap-4">
					<div
						class="bg-smoke-900 text-ember grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[11px]"
					>
						<v.Icon size={24} />
					</div>
					<div>
						<h4 class="mb-1 text-[17px] font-extrabold">{v.t}</h4>
						<p class="text-ink-soft text-[14.5px] leading-snug">{v.d}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
