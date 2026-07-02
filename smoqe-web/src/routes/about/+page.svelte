<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Tristar from '$lib/components/Tristar.svelte';
	import NewsletterBand from '$lib/components/NewsletterBand.svelte';

	const stats = [
		{ n: '2012', l: 'Founded in Nashville' },
		{ n: 'Paris, TN', l: 'Where the fire started' },
		{ n: 'West TN', l: 'BBQ tradition we carry' }
	];
</script>

<svelte:head>
	<title>Our Story | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="Smoqe Signals BBQ — a Nashville food truck with West Tennessee roots in Paris, TN. Founded 2012, carrying a family BBQ legacy."
	/>
</svelte:head>

<div class="rise">
	<!-- hero -->
	<section class="relative overflow-hidden bg-smoke-900 text-white">
		<div class="absolute inset-0">
			<img src="/images/bbq-spread.jpg" alt="" class="h-full w-full object-cover opacity-[0.32]" />
			<div
				class="absolute inset-0"
				style="background:linear-gradient(180deg, rgba(12,9,6,.8), rgba(12,9,6,.92))"
			></div>
		</div>
		<div class="container-tight relative max-w-3xl py-[84px] text-center">
			<div class="mb-[18px] flex justify-center"><Tristar lg /></div>
			<span class="eyebrow text-ember">Our Story</span>
			<h1 class="display my-4 text-[clamp(2.5rem,7vw,4.75rem)]">
				Nashville bred,<br />Memphis approved,<br />Tennessee tradition
			</h1>
			<p class="mx-auto max-w-xl text-lg leading-relaxed text-cream-text">
				West Tennessee taught us the fire. Nashville gave us the crowd. Here's how Smoqe Signals got
				here.
			</p>
		</div>
	</section>

	<section class="py-[88px]">
		<div class="container-tight max-w-3xl">
			<div class="text-[19px] leading-[1.8] text-ink">
				<p class="mb-6">
					<span class="display mr-2 text-[22px] text-flame">Smoqe Signals BBQ</span> is a food truck
					rooted in Nashville, TN. Founded in <strong>2012</strong>, over the years our business has
					expanded to cater for special events and gatherings, growing the reputation of our tender
					pulled pork, veggie pulled "pork," and some of the best brisket in Nashville.
				</p>
				<p class="mb-6 text-ink-soft">
					We're more than pit masters and flavor enthusiasts. We're storytellers of taste, weaving
					the rich traditions of West Tennessee BBQ into the vibrant tapestry of Nashville's culinary
					scene. Hailing from Paris, TN, our journey began with a passion ignited by flavors passed
					down from uncles Clyde and Clay — a legacy that's still present in every mouthwatering bite.
				</p>
				<p class="text-ink-soft">
					From a humble concession stand to the thriving Smoqe Signals BBQ of today, our dedication to
					bringing you the true essence of West TN BBQ remains unwavering.
				</p>
			</div>

			<div class="mt-10 rounded-lg border-l-4 border-flame bg-paper-2 p-7">
				<span class="eyebrow text-ember">Pit Master &amp; Founder</span>
				<h2 class="display mt-2 text-2xl">Meet Shon "Slim" Harmon</h2>
				<p class="mt-3 text-[17px] leading-relaxed text-ink-soft">
					A true connoisseur of West TN BBQ, Slim takes pride in uniting the rich traditions of West
					TN BBQ with the vibrant Nashville culinary scene. A native of Paris, TN, Slim developed an
					early passion for the art of BBQ inspired by flavors and techniques passed down by his
					uncles Clyde and Clay. "I come from a family where the men cook." In 2012, that passion
					manifested into a small concession stand, set up to cater to the enthusiastic crowd at his
					nephew's Pee Wee league games. The response was overwhelming, and thus, Smoqe Signals BBQ
					was born.
				</p>
			</div>

			<p class="mt-6 text-[17px] leading-[1.8] text-ink-soft">
				Everything comes off our custom-built reverse-flow smoker, cooked low and slow over Hickory,
				Oak, and a mix of Cherry or Apple wood. Our sides are made from locally sourced ingredients,
				fresh daily. That's the Smoqe Signals standard —
				<em class="font-semibold not-italic text-flame">Follow the SmoQe.</em>
			</p>

			<div class="my-12 grid gap-5 sm:grid-cols-3">
				{#each stats as s (s.l)}
					<div class="card-brand p-6 text-center">
						<div class="display text-[clamp(1.6rem,3vw,2.125rem)] text-flame">{s.n}</div>
						<div class="mt-1.5 text-sm font-semibold text-ink-soft">{s.l}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="container-wide">
			<div class="grid overflow-hidden rounded-lg border border-paper-line md:grid-cols-2">
				<img
					src="/images/shon.png"
					alt="Shon, pitmaster and owner"
					class="h-full min-h-[420px] w-full object-cover object-top"
				/>
				<div class="flex flex-col justify-center bg-smoke-900 p-12 text-white">
					<span class="eyebrow text-ember">The pitmaster</span>
					<h2 class="display my-4 text-[clamp(1.75rem,3.6vw,2.5rem)]">Patience over shortcuts</h2>
					<p class="text-[16.5px] leading-relaxed text-cream-text">
						Shon runs the pit the way it was taught to him — hickory, low and slow, no rushing good
						meat. That standard shows up on the truck, in the catering line, and in every shaker of
						rub that leaves our kitchen.
					</p>
					<a href="/food-truck" class="btn btn-primary mt-7 self-start">
						Book the Truck <ArrowRight size={18} />
					</a>
				</div>
			</div>
		</div>
	</section>

	<NewsletterBand />
</div>
