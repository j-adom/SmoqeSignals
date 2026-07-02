<script lang="ts">
	import { Check, Truck } from '@lucide/svelte';
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import { cart } from '$lib/stores/cart.svelte';
	import { toast } from '$lib/stores/toast.svelte';
	import { money } from '$lib/utils';
	import HeatMeter from '$lib/components/HeatMeter.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { data }: { data: PageData } = $props();
	const p = $derived(data.product);

	let qty = $state(1);
	// Reset quantity when navigating between products.
	$effect(() => {
		p.slug;
		qty = 1;
	});

	const hot = $derived(p.tag === 'Heat' || p.tag === 'Hot');

	const productSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: p.name,
		description: p.short,
		image: p.image.startsWith('http') ? p.image : `${page.url.origin}${p.image}`,
		category: p.category,
		brand: { '@type': 'Brand', name: 'Smoqe Signals BBQ' },
		offers: {
			'@type': 'Offer',
			price: p.price,
			priceCurrency: 'USD',
			availability: p.inStock
				? 'https://schema.org/InStock'
				: 'https://schema.org/OutOfStock',
			url: page.url.href
		}
	});

	function add() {
		cart.add(p, qty);
		toast.show(`${p.name} added to cart`);
	}
</script>

<svelte:head>
	<title>{p.name} | Smoqe Signals BBQ</title>
	<meta name="description" content={p.short} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(productSchema)}</` + `script>`}
</svelte:head>

<div class="rise">
	<div class="container-wide pt-7">
		<nav class="flex gap-2 text-[13.5px] font-semibold text-ink-soft">
			<a href="/shop" class="font-extrabold text-flame">Shop</a><span>/</span>
			<span>{p.category}</span><span>/</span><span class="text-ink">{p.name}</span>
		</nav>
	</div>

	<section class="py-8 md:py-[88px] md:pt-8">
		<div class="container-wide grid items-start gap-14 md:grid-cols-2">
			<div class="relative overflow-hidden rounded-lg border border-paper-line bg-paper-2">
				<img src={p.image} alt={p.name} class="aspect-square w-full object-cover" />
				{#if p.tag}
					<span
						class={`absolute left-[18px] top-[18px] rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white ${
							hot ? 'bg-flame' : 'bg-smoke-900'
						}`}
					>
						{p.tag}
					</span>
				{/if}
			</div>

			<div>
				<span class="eyebrow text-flame">{p.category}</span>
				<h1 class="display my-3.5 text-[clamp(2rem,4.5vw,3rem)]">{p.name}</h1>
				<div class="mb-5 flex flex-wrap items-center gap-4">
					<span class="display text-3xl">{money(p.price)}</span>
					<span class="text-paper-line">|</span>
					<span class="text-sm font-bold text-ink-soft">{p.size}</span>
					{#if p.heat > 0}
						<span class="flex items-center gap-2 text-[13px] font-bold text-ink-soft">
							Heat <HeatMeter level={p.heat} />
						</span>
					{/if}
				</div>
				<p class="mb-6 text-[17px] leading-relaxed text-ink-soft">{p.long}</p>

				<div class="mb-7 flex flex-wrap gap-2.5">
					{#each p.notes as note (note)}
						<span class="chip cursor-default"><Check size={14} class="text-flame" />{note}</span>
					{/each}
				</div>

				<div class="flex flex-wrap items-center gap-3.5">
					<span class="inline-flex h-[52px] items-center overflow-hidden rounded border-[1.5px] border-paper-line">
						<button
							class="grid h-[50px] w-11 place-items-center bg-white text-char hover:bg-paper-2"
							onclick={() => (qty = Math.max(1, qty - 1))}
							aria-label="Decrease quantity"
						>
							–
						</button>
						<span class="w-11 text-center font-extrabold">{qty}</span>
						<button
							class="grid h-[50px] w-11 place-items-center bg-white text-char hover:bg-paper-2"
							onclick={() => (qty = qty + 1)}
							aria-label="Increase quantity"
						>
							+
						</button>
					</span>
					<button class="btn btn-primary min-w-[200px] flex-1" onclick={add}>
						Add to Cart · {money(p.price * qty)}
					</button>
				</div>

				<div
					class="mt-6 flex items-center gap-3 rounded border border-paper-line bg-paper-2 px-5 py-[18px] text-sm text-ink-soft"
				>
					<Truck size={22} class="shrink-0 text-flame" />
					<span><strong class="text-ink">Free shipping over $45.</strong> Ships in 1–2 business days from Nashville.</span>
				</div>
			</div>
		</div>
	</section>

	{#if data.related.length}
		<section class="border-t border-paper-line bg-paper-2 py-16">
			<div class="container-wide">
				<h2 class="display mb-7 text-3xl">Pairs well with</h2>
				<div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
					{#each data.related as product (product.id)}
						<ProductCard {product} />
					{/each}
				</div>
			</div>
		</section>
	{/if}
</div>
