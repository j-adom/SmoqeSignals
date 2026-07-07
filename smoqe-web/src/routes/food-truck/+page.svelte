<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { TRUCK_MENU, TRUCK_SERVICE_STYLES, TRUCK_FAQS } from '$lib/data/seed';
	import { jsonLd } from '$lib/utils';
	import Tristar from '$lib/components/Tristar.svelte';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import FaqItem from '$lib/components/FaqItem.svelte';
	import RequestForm from '$lib/components/RequestForm.svelte';
	import NewsletterBand from '$lib/components/NewsletterBand.svelte';

	let { form }: PageProps = $props();

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: TRUCK_FAQS.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};
</script>

<svelte:head>
	<title>Book the Food Truck | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="Book the Smoqe Signals BBQ food truck for your Nashville event — pulled pork, brisket, smoked wings, and classic sides served on site. Request a date."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd(faqSchema)}</` + `script>`}
</svelte:head>

<div class="rise">
	<!-- hero -->
	<section class="bg-smoke-900 relative overflow-hidden text-white">
		<div class="absolute inset-0">
			<img src="/images/food-truck.png" alt="" class="h-full w-full object-cover opacity-[0.4]" />
			<div
				class="absolute inset-0"
				style="background:linear-gradient(90deg, rgba(12,9,6,.95), rgba(12,9,6,.5))"
			></div>
		</div>
		<div class="container-wide relative py-[76px]">
			<div class="mb-4 flex items-center gap-3">
				<Tristar lg /><span class="eyebrow text-ember">Food Truck</span>
			</div>
			<h1 class="display max-w-3xl text-[clamp(2.5rem,7vw,4.875rem)]">
				Bring the truck to your event
			</h1>
			<p class="text-ember mt-2 text-lg font-bold">Some of the best BBQ in town.</p>
			<p class="text-cream-text mt-4 max-w-xl text-lg leading-relaxed">
				Smoky Nashville BBQ served fresh on site — for streets, offices, neighborhoods, and
				festivals. Catch us cruisin' your way, or tell us the date and we'll confirm availability.
			</p>
			<div class="mt-7 flex flex-wrap gap-3.5">
				<a href="#request" class="btn btn-primary">Book the Truck <ArrowRight size={18} /></a>
				<a href="#menu" class="btn btn-outline-light">View Truck Menu</a>
			</div>
			<p class="text-cream-muted mt-6 text-sm">
				Planning a buffet or full-service spread instead? See our
				<a href="/catering" class="text-ember font-bold underline-offset-4 hover:underline"
					>catering options</a
				>.
			</p>
		</div>
	</section>

	<!-- menu + form -->
	<section class="py-[88px]">
		<div class="container-wide grid items-start gap-14 lg:grid-cols-2">
			<!-- menu -->
			<div id="menu" class="scroll-mt-24">
				<SectionHead eyebrow="Truck Menu" title="Served fresh on site" />
				<p class="text-ink-soft mt-3.5 leading-relaxed">
					Walk-up plates and baskets straight off the truck. Contact us for event pricing built
					around your headcount.
				</p>

				<h3 class="display text-flame mt-9 text-xl">Plates & Baskets</h3>
				<div class="mt-4">
					{#each TRUCK_MENU.plates as m (m.name)}
						<div class="border-paper-line border-b py-3.5">
							<div class="text-ink font-extrabold">{m.name}</div>
							<div class="text-ink-soft text-sm leading-snug">{m.desc}</div>
						</div>
					{/each}
				</div>

				<h3 class="display text-flame mt-8 text-xl">Specialty Items</h3>
				<div class="mt-4">
					{#each TRUCK_MENU.specialties as m (m.name)}
						<div class="border-paper-line border-b py-3.5">
							<div class="text-ink font-extrabold">{m.name}</div>
							<div class="text-ink-soft text-sm leading-snug">{m.desc}</div>
						</div>
					{/each}
				</div>

				<h3 class="display text-flame mt-8 text-xl">Deep-Fried Wings</h3>
				<p class="text-ink-soft mt-3 text-sm leading-relaxed">{TRUCK_MENU.wings.note}</p>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each TRUCK_MENU.wings.sauces as s (s)}
						<span
							class="border-paper-line bg-paper-2 text-ink-soft rounded-full border px-3 py-1.5 text-[13px] font-semibold"
							>{s}</span
						>
					{/each}
				</div>

				<h3 class="display text-flame mt-8 text-xl">Sides</h3>
				<div class="mt-4 grid gap-x-8 sm:grid-cols-2">
					{#each TRUCK_MENU.sides as m (m.name)}
						<div class="border-paper-line border-b py-3">
							<div class="text-ink font-extrabold">{m.name}</div>
							<div class="text-ink-soft text-sm leading-snug">{m.desc}</div>
						</div>
					{/each}
				</div>

				<p class="border-paper-line text-ink-soft mt-5 border-t pt-[18px] text-sm leading-relaxed">
					Our Veggie Pulled "Pork" keeps vegetarians in on the BBQ. Menus can be tailored to your
					crowd — just ask.
				</p>
			</div>

			<!-- request form -->
			<div id="request" class="scroll-mt-24 lg:sticky lg:top-24">
				<RequestForm context="truck" serviceStyles={TRUCK_SERVICE_STYLES} {form} />
			</div>
		</div>
	</section>

	<!-- faqs -->
	<section id="faqs" class="border-paper-line bg-paper-2 scroll-mt-24 border-t py-[88px]">
		<div class="container-tight max-w-3xl">
			<SectionHead eyebrow="Good to know" title="Food Truck FAQs" center />
			<div class="mt-10">
				{#each TRUCK_FAQS as faq, i (faq.q)}
					<FaqItem {faq} open={i === 0} />
				{/each}
			</div>
			<div class="mt-10 text-center">
				<p class="text-ink-soft mb-[18px]">
					Questions about your event? We're happy to talk it through.
				</p>
				<a href="/contact" class="btn btn-dark">Contact Us</a>
			</div>
		</div>
	</section>

	<NewsletterBand />
</div>
