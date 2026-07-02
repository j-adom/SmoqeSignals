<script lang="ts">
	import { ArrowRight, Phone, MapPin, Flame, Truck, UtensilsCrossed } from '@lucide/svelte';
	import InstagramIcon from '$lib/components/icons/InstagramIcon.svelte';
	import type { PageData } from './$types';
	import { BIZ, HOLIDAY_MEATS } from '$lib/data/seed';
	import Tristar from '$lib/components/Tristar.svelte';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import NewsletterBand from '$lib/components/NewsletterBand.svelte';

	let { data }: { data: PageData } = $props();

	const proof = [
		{
			Icon: Flame,
			t: 'Pit-Smoked Plates',
			d: 'Low-and-slow hickory smoke for pulled pork, brisket, wings, and the classic sides.'
		},
		{
			Icon: Truck,
			t: 'Food Truck Service',
			d: 'We bring smoky Nashville BBQ to streets, offices, neighborhoods, and festivals.'
		},
		{
			Icon: UtensilsCrossed,
			t: 'Event Catering',
			d: 'Buffets and on-site truck service for weddings, team meals, and private parties.'
		}
	];

	// A "follow us" gallery of our own food photos linking to Instagram.
	// (A live auto-updating feed would need a widget like Behold/SnapWidget or the IG Graph API.)
	const gram = [
		'/images/brisket-board.png',
		'/images/bbq-spread.jpg',
		'/images/food-truck.png',
		'/images/wings-rub.jpg'
	];
</script>

<svelte:head>
	<title>Smoqe Signals BBQ | Nashville Bred, Memphis Approved</title>
	<meta
		name="description"
		content="Slim's Smoqe Signals BBQ — Nashville food truck favorites, event catering, and all-natural dry rubs rooted in West Tennessee BBQ tradition."
	/>
</svelte:head>

<div class="rise">
	<!-- HERO -->
	<section class="relative overflow-hidden bg-smoke-900">
		<div class="absolute inset-0">
			<img
				src="/images/brisket-board.png"
				alt=""
				class="h-full w-full object-cover object-[center_40%] opacity-50"
			/>
			<div
				class="absolute inset-0"
				style="background:linear-gradient(105deg, rgba(10,7,5,.96) 0%, rgba(10,7,5,.82) 38%, rgba(10,7,5,.35) 70%, rgba(10,7,5,.6) 100%)"
			></div>
		</div>
		<div
			class="container-wide relative flex min-h-[560px] flex-col justify-center py-[76px]"
		>
			<div class="mb-7 flex items-center gap-3">
				<Tristar lg />
				<span class="eyebrow text-ember">Est. {BIZ.founded} · Nashville, Tennessee</span>
			</div>
			<img
				src="/images/logo-cream.png"
				alt="Smoqe Signals BBQ"
				class="mb-[30px] h-auto w-[min(560px,86vw)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
			/>
			<p class="mb-3.5 max-w-[560px] text-[clamp(1.1rem,2.4vw,1.45rem)] font-medium leading-snug text-cream-text">
				Twelve years of low-and-slow, West Tennessee barbecue — from our food truck to your backyard.
			</p>
			<p class="mb-8 text-[15px] font-bold tracking-wide text-cream-muted">{BIZ.tagline}</p>
			<div class="flex flex-wrap gap-3.5">
				<a href="/shop" class="btn btn-primary">Shop the Rubs <ArrowRight size={18} /></a>
				<a href="/food-truck" class="btn btn-outline-light">Book the Truck</a>
			</div>
			<div class="mt-9 flex flex-wrap gap-6 text-sm font-semibold text-cream-muted">
				<a href={BIZ.phoneHref} class="flex items-center gap-2"><Phone size={16} class="text-ember" />{BIZ.phone}</a>
				<span class="flex items-center gap-2"><MapPin size={16} class="text-ember" />Nashville, TN</span>
			</div>
		</div>
	</section>

	<Marquee />

	<!-- PROOF -->
	<section class="py-[88px]">
		<div class="container-wide">
			<div class="mx-auto mb-14 max-w-2xl text-center">
				<SectionHead
					eyebrow="Real BBQ. Real service."
					title="Smoke worth following"
					sub="From a food-truck lunch rush to full-service catering, every plate starts with patience and hickory."
					center
				/>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each proof as c (c.t)}
					<article class="card-brand p-8 text-center">
						<div
							class="mx-auto mb-5 grid h-[60px] w-[60px] place-items-center rounded-[14px] bg-smoke-900 text-ember"
						>
							<c.Icon size={30} />
						</div>
						<h3 class="mb-2.5 text-xl font-extrabold">{c.t}</h3>
						<p class="mx-auto max-w-xs leading-relaxed text-ink-soft">{c.d}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- HOLIDAY MEATS -->
	<section class="border-y border-paper-line bg-smoke-900 py-[88px] text-white">
		<div class="container-wide">
			<div class="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
				<div>
					<SectionHead eyebrow={HOLIDAY_MEATS.eyebrow} title={HOLIDAY_MEATS.title} light />
					<p class="mt-5 max-w-md text-[17px] leading-relaxed text-cream-text">{HOLIDAY_MEATS.blurb}</p>
					<div class="mt-7 flex flex-wrap gap-3.5">
						<a href="/contact" class="btn btn-primary">Pre-Order for the Holidays <ArrowRight size={18} /></a>
						<a href={BIZ.phoneHref} class="btn btn-outline-light">Call {BIZ.phone}</a>
					</div>
				</div>
				<div class="grid gap-4">
					{#each HOLIDAY_MEATS.items as item (item.name)}
						<article class="rounded-lg border border-white/10 bg-white/[0.04] p-6">
							<div class="flex items-center gap-3">
								<Tristar />
								<h3 class="text-xl font-extrabold text-white">{item.name}</h3>
							</div>
							<p class="mt-2.5 leading-relaxed text-cream-muted">{item.desc}</p>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- SHOP TEASER -->
	<section class="border-y border-paper-line bg-paper-2 py-[88px]">
		<div class="container-wide">
			<div class="mb-10 flex flex-wrap items-end justify-between gap-6">
				<SectionHead
					eyebrow="The Rub Shop"
					title="Take the flavor home"
					sub="The same all-natural rubs we shake on at every event — bottled for your kitchen."
				/>
				<a href="/shop" class="btn btn-ghost">Shop All <ArrowRight size={18} /></a>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
				{#each data.featured as product (product.id)}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	</section>

	<!-- OWNER -->
	<section class="py-[88px]">
		<div class="container-wide grid items-center gap-14 lg:grid-cols-[0.85fr_1fr]">
			<div class="relative">
				<div class="absolute -left-4 -top-4 h-full w-full rounded-lg border-[3px] border-flame"></div>
				<img
					src="/images/shon.png"
					alt="Shon, pitmaster and owner"
					class="relative h-[560px] w-full rounded-lg object-cover object-top shadow-[var(--shadow-lift)]"
				/>
			</div>
			<div>
				<SectionHead eyebrow="Meet the pitmaster" title="Shon, the man behind the smoke" />
				<p class="mt-5 text-[17px] leading-relaxed text-ink-soft">
					Smoqe Signals is built on hospitality, patience, and West Tennessee roots that run back to
					Paris, TN and two uncles named Clyde and Clay. Shon brings that standard to the truck, the
					pit, and every catered table.
				</p>
				<p class="mt-4 text-[17px] leading-relaxed text-ink-soft">
					The menu stays grounded in the classics: smoke-kissed meats, sturdy sides, and food that
					makes an event feel personal instead of packaged.
				</p>
				<a href="/about" class="btn btn-ghost mt-7">Read Our Story <ArrowRight size={18} /></a>
			</div>
		</div>
	</section>

	<!-- CATERING CTA -->
	<section class="relative overflow-hidden bg-smoke-900 text-white">
		<div class="absolute inset-0">
			<img src="/images/food-truck.png" alt="" class="h-full w-full object-cover opacity-[0.34]" />
			<div
				class="absolute inset-0"
				style="background:linear-gradient(90deg, rgba(12,9,6,.95) 0%, rgba(12,9,6,.7) 55%, rgba(12,9,6,.35) 100%)"
			></div>
		</div>
		<div class="container-wide relative py-[92px]">
			<div class="max-w-[600px]">
				<SectionHead eyebrow="Catering" title="Catering that feels like the main event" light />
				<p class="mt-5 text-[17px] leading-relaxed text-cream-text">
					Tell us the date, guest count, and service style. We'll shape the menu around your crowd,
					setup, and timing so the food lands hot and the day feels easy.
				</p>
				<div class="mt-7 flex flex-wrap gap-3.5">
					<a href="/catering" class="btn btn-primary">Start a Catering Request <ArrowRight size={18} /></a>
					<a href="/contact" class="btn btn-outline-light">Talk to Us</a>
				</div>
			</div>
		</div>
	</section>

	<!-- BLOG TEASER -->
	<section class="py-[88px]">
		<div class="container-wide">
			<div class="mb-10 flex flex-wrap items-end justify-between gap-6">
				<SectionHead eyebrow="From the Pit" title="Smoke signals & stories" />
				<a href="/blog" class="btn btn-ghost">All Posts <ArrowRight size={18} /></a>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each data.posts as post (post.id)}
					<BlogCard {post} />
				{/each}
			</div>
		</div>
	</section>

	<!-- INSTAGRAM -->
	<section class="border-t border-paper-line py-[88px]">
		<div class="container-wide">
			<div class="mb-10 flex flex-wrap items-end justify-between gap-6">
				<SectionHead
					eyebrow="Follow the SmoQe"
					title="Follow us on the gram"
					sub="Fresh pulls, pit shots, and where the truck lands next — @smoqesignalsbbq."
				/>
				<a
					href="https://www.instagram.com/smoqesignalsbbq"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-dark"
				>
					<InstagramIcon size={18} /> Follow @smoqesignalsbbq
				</a>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{#each gram as src (src)}
					<a
						href="https://www.instagram.com/smoqesignalsbbq"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative aspect-square overflow-hidden rounded-lg bg-paper-2"
					>
						<img
							{src}
							alt="Smoqe Signals BBQ on Instagram"
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 grid place-items-center bg-smoke-900/0 text-white/0 transition-all duration-300 group-hover:bg-smoke-900/40 group-hover:text-white"
						>
							<InstagramIcon size={26} />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<NewsletterBand />
</div>
