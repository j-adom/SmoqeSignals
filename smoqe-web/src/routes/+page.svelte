<script lang="ts">
	import { ArrowRight, Phone, MapPin, Flame, Truck, TreePine } from '@lucide/svelte';
	import InstagramIcon from '$lib/components/icons/InstagramIcon.svelte';
	import type { PageData } from './$types';
	import { BIZ, HOLIDAY_MEATS } from '$lib/data/seed';
	import Tristar from '$lib/components/Tristar.svelte';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import NewsletterBand from '$lib/components/NewsletterBand.svelte';

	let { data }: { data: PageData } = $props();

	// Years in business, computed so the hero never goes stale.
	const years = new Date().getFullYear() - BIZ.founded;

	const proof = [
		{
			Icon: Flame,
			t: '225°F. Patience Does the Rest.',
			d: 'Low and slow, every time. No shortcuts, no exceptions.'
		},
		{
			Icon: TreePine,
			t: 'Real Wood. No Shortcuts.',
			d: 'No chips, no pellets, no gas — just locally sourced hickory, oak, cherry, and apple for our stick burners.'
		},
		{
			Icon: Truck,
			t: 'Food Truck Service',
			d: 'We roll up wherever you are — streets, offices, neighborhoods, festivals.'
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
	<section class="bg-smoke-900 relative overflow-hidden">
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
		<div class="container-wide relative flex min-h-[560px] flex-col justify-center py-[76px]">
			<div class="mb-7 flex items-center gap-3">
				<Tristar lg />
				<span class="eyebrow text-ember">Est. {BIZ.founded} · Nashville, Tennessee</span>
			</div>
			<img
				src="/images/logo-cream.png"
				alt="Smoqe Signals BBQ"
				class="mb-[30px] h-auto w-[min(560px,86vw)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
			/>
			<p
				class="text-cream-text mb-3.5 max-w-[560px] text-[clamp(1.1rem,2.4vw,1.45rem)] leading-snug font-medium"
			>
				Authentic West TN BBQ, {years} years running — book the truck for your event, or shop the
				dry rubs and seasonings we built it on.
			</p>
			<p class="text-cream-muted mb-8 text-[15px] font-bold tracking-wide">{BIZ.tagline}</p>
			<div class="flex flex-wrap gap-3.5">
				<a href="/food-truck" class="btn btn-primary">Book the Truck <ArrowRight size={18} /></a>
			</div>
			<div class="text-cream-muted mt-9 flex flex-wrap gap-6 text-sm font-semibold">
				<a href={BIZ.phoneHref} class="flex items-center gap-2"
					><Phone size={16} class="text-ember" />{BIZ.phone}</a
				>
				<span class="flex items-center gap-2"
					><MapPin size={16} class="text-ember" />Nashville, TN</span
				>
			</div>
		</div>
	</section>

	<Marquee />

	<!-- PROOF -->
	<section class="py-[88px]">
		<div class="container-wide">
			<div class="mx-auto mb-14 max-w-2xl text-center">
				<SectionHead
					eyebrow="Nashville Bred, Memphis Approved, Tennessee Tradition."
					title="Follow the Smoqe"
					sub="&ldquo;There are a few things in life that people will drive out of their way for. Real BBQ is one of them.&rdquo;"
					center
				/>
				<p class="text-ink-soft mt-4 text-sm font-semibold">
					— Shon "Slim" Harmon, <cite>The Art of Pulled Pork: A Pitmaster's Guide</cite> (out Late Summer
					2026)
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each proof as c (c.t)}
					<article class="card-brand p-8 text-center">
						<div
							class="bg-smoke-900 text-ember mx-auto mb-5 grid h-[60px] w-[60px] place-items-center rounded-[14px]"
						>
							<c.Icon size={30} />
						</div>
						<h3 class="mb-2.5 text-xl font-extrabold">{c.t}</h3>
						<p class="text-ink-soft mx-auto max-w-xs leading-relaxed">{c.d}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- HOLIDAY MEATS -->
	<section class="border-paper-line bg-smoke-900 border-y py-[88px] text-white">
		<div class="container-wide">
			<div class="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
				<div>
					<SectionHead eyebrow={HOLIDAY_MEATS.eyebrow} title={HOLIDAY_MEATS.title} light />
					<p class="text-cream-text mt-5 max-w-md text-[17px] leading-relaxed">
						{HOLIDAY_MEATS.blurb}
					</p>
					<div class="mt-7 flex flex-wrap gap-3.5">
						<a href="/contact-us?inquiry=holiday" class="btn btn-primary"
							>Join the List <ArrowRight size={18} /></a
						>
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
							<p class="text-cream-muted mt-2.5 leading-relaxed">{item.desc}</p>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- SHOP TEASER -->
	<section class="border-paper-line bg-paper-2 border-y py-[88px]">
		<div class="container-wide">
			<div class="mb-10 flex flex-wrap items-end justify-between gap-6">
				<SectionHead
					eyebrow="The SmoQe Shop"
					title="Bring the SmoQe home"
					sub="All natural dry rubs, seasonings, and recipe eBooks to master the craft."
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
				<div
					class="border-flame absolute -top-4 -left-4 h-full w-full rounded-lg border-[3px]"
				></div>
				<img
					src="/images/shon.png"
					alt="Shon, pitmaster and owner"
					class="relative h-[560px] w-full rounded-lg object-cover object-top shadow-[var(--shadow-lift)]"
				/>
			</div>
			<div>
				<SectionHead eyebrow="Meet the Pitmaster" title="Slim, the Man Behind the Smoke" />
				<p class="text-ink-soft mt-5 text-[17px] leading-relaxed">
					SmoQe Signals is built on hospitality, patience, and customer service — the same standard
					Slim brings to the truck, the pit, and every catered table.
				</p>
				<blockquote class="border-flame mt-4 border-l-4 pl-5">
					<p class="text-ink-soft text-[17px] leading-relaxed">
						"That feeling became SmoQe Signals BBQ — a food truck that taught me more about people,
						hospitality, community, and myself than any classroom ever could."
					</p>
					<footer class="text-ink-soft mt-2 text-sm font-semibold">
						— Shon "Slim" Harmon, <cite>The Art of Pulled Pork: A Pitmaster's Guide</cite>
					</footer>
				</blockquote>
				<p class="text-ink-soft mt-4 text-[17px] leading-relaxed">
					The menu is Nashville Bred, Memphis Approved, Tennessee Tradition.
				</p>
				<a href="/the-history" class="btn btn-ghost mt-7">Read The History <ArrowRight size={18} /></a>
			</div>
		</div>
	</section>

	<!-- CATERING CTA -->
	<section class="bg-smoke-900 relative overflow-hidden text-white">
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
				<p class="text-cream-text mt-5 text-[17px] leading-relaxed">
					Tell us the date, guest count, and service style. We'll shape the menu around your crowd,
					setup, and timing so the food lands hot and the day feels easy.
				</p>
				<div class="mt-7 flex flex-wrap gap-3.5">
					<a href="/catering" class="btn btn-primary"
						>Start a Catering Request <ArrowRight size={18} /></a
					>
					<a href="/contact-us" class="btn btn-outline-light">Talk to Us</a>
				</div>
			</div>
		</div>
	</section>

	<!-- BLOG TEASER -->
	<section class="py-[88px]">
		<div class="container-wide">
			<div class="mb-10 flex flex-wrap items-end justify-between gap-6">
				<SectionHead eyebrow="From the Pit" title="SmoQe Signals & Stories" />
				<a href="/blog" class="btn btn-ghost">All Posts <ArrowRight size={18} /></a>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each data.posts as post (post.id)}
					<BlogCard {post} />
				{/each}
			</div>
		</div>
	</section>

	<Testimonials />

	<!-- INSTAGRAM -->
	<section class="border-paper-line border-t py-[88px]">
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
						class="group bg-paper-2 relative aspect-square overflow-hidden rounded-lg"
					>
						<img
							{src}
							alt="Smoqe Signals BBQ on Instagram"
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div
							class="bg-smoke-900/0 group-hover:bg-smoke-900/40 absolute inset-0 grid place-items-center text-white/0 transition-all duration-300 group-hover:text-white"
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
