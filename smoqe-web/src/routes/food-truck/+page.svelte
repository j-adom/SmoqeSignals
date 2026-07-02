<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { TRUCK_MENU, TRUCK_SERVICE_STYLES, TRUCK_FAQS } from '$lib/data/seed';
	import Tristar from '$lib/components/Tristar.svelte';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import FaqItem from '$lib/components/FaqItem.svelte';
	import RequestForm from '$lib/components/RequestForm.svelte';
	import NewsletterBand from '$lib/components/NewsletterBand.svelte';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Book the Food Truck | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="Book the Smoqe Signals BBQ food truck for your Nashville event — pulled pork, brisket, smoked wings, and classic sides served on site. Request a date."
	/>
</svelte:head>

<div class="rise">
	<!-- hero -->
	<section class="relative overflow-hidden bg-smoke-900 text-white">
		<div class="absolute inset-0">
			<img src="/images/food-truck.png" alt="" class="h-full w-full object-cover opacity-[0.4]" />
			<div
				class="absolute inset-0"
				style="background:linear-gradient(90deg, rgba(12,9,6,.95), rgba(12,9,6,.5))"
			></div>
		</div>
		<div class="container-wide relative py-[76px]">
			<div class="mb-4 flex items-center gap-3"><Tristar lg /><span class="eyebrow text-ember">Food Truck</span></div>
			<h1 class="display max-w-3xl text-[clamp(2.5rem,7vw,4.875rem)]">Bring the truck to your event</h1>
			<p class="mt-2 text-lg font-bold text-ember">Some of the best BBQ in town.</p>
			<p class="mt-4 max-w-xl text-lg leading-relaxed text-cream-text">
				Smoky Nashville BBQ served fresh on site — for streets, offices, neighborhoods, and festivals.
				Catch us cruisin' your way, or tell us the date and we'll confirm availability.
			</p>
			<div class="mt-7 flex flex-wrap gap-3.5">
				<a href="#request" class="btn btn-primary">Book the Truck <ArrowRight size={18} /></a>
				<a href="#menu" class="btn btn-outline-light">View Truck Menu</a>
			</div>
			<p class="mt-6 text-sm text-cream-muted">
				Planning a buffet or full-service spread instead? See our
				<a href="/catering" class="font-bold text-ember underline-offset-4 hover:underline">catering options</a>.
			</p>
		</div>
	</section>

	<!-- menu + form -->
	<section class="py-[88px]">
		<div class="container-wide grid items-start gap-14 lg:grid-cols-2">
			<!-- menu -->
			<div id="menu" class="scroll-mt-24">
				<SectionHead eyebrow="Truck Menu" title="Served fresh on site" />
				<p class="mt-3.5 leading-relaxed text-ink-soft">
					Walk-up plates and baskets straight off the truck. Contact us for event pricing built
					around your headcount.
				</p>

				<h3 class="display mt-9 text-xl text-flame">Plates & Baskets</h3>
				<div class="mt-4">
					{#each TRUCK_MENU.plates as m (m.name)}
						<div class="border-b border-paper-line py-3.5">
							<div class="font-extrabold text-ink">{m.name}</div>
							<div class="text-sm leading-snug text-ink-soft">{m.desc}</div>
						</div>
					{/each}
				</div>

				<h3 class="display mt-8 text-xl text-flame">Specialty Items</h3>
				<div class="mt-4">
					{#each TRUCK_MENU.specialties as m (m.name)}
						<div class="border-b border-paper-line py-3.5">
							<div class="font-extrabold text-ink">{m.name}</div>
							<div class="text-sm leading-snug text-ink-soft">{m.desc}</div>
						</div>
					{/each}
				</div>

				<h3 class="display mt-8 text-xl text-flame">Deep-Fried Wings</h3>
				<p class="mt-3 text-sm leading-relaxed text-ink-soft">{TRUCK_MENU.wings.note}</p>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each TRUCK_MENU.wings.sauces as s (s)}
						<span class="rounded-full border border-paper-line bg-paper-2 px-3 py-1.5 text-[13px] font-semibold text-ink-soft">{s}</span>
					{/each}
				</div>

				<h3 class="display mt-8 text-xl text-flame">Sides</h3>
				<div class="mt-4 grid gap-x-8 sm:grid-cols-2">
					{#each TRUCK_MENU.sides as m (m.name)}
						<div class="border-b border-paper-line py-3">
							<div class="font-extrabold text-ink">{m.name}</div>
							<div class="text-sm leading-snug text-ink-soft">{m.desc}</div>
						</div>
					{/each}
				</div>

				<p class="mt-5 border-t border-paper-line pt-[18px] text-sm leading-relaxed text-ink-soft">
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
	<section id="faqs" class="scroll-mt-24 border-t border-paper-line bg-paper-2 py-[88px]">
		<div class="container-tight max-w-3xl">
			<SectionHead eyebrow="Good to know" title="Food Truck FAQs" center />
			<div class="mt-10">
				{#each TRUCK_FAQS as faq, i (faq.q)}
					<FaqItem {faq} open={i === 0} />
				{/each}
			</div>
			<div class="mt-10 text-center">
				<p class="mb-[18px] text-ink-soft">Questions about your event? We're happy to talk it through.</p>
				<a href="/contact" class="btn btn-dark">Contact Us</a>
			</div>
		</div>
	</section>

	<NewsletterBand />
</div>
