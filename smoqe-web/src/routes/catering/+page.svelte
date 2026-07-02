<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import {
		CATERING_MENU,
		CATERING_PACKAGES,
		CATERING_PACKAGES_NOTE,
		CATERING_DESSERTS,
		CATERING_EXTRAS,
		CATERING_SERVICE_STYLES,
		CATERING_FAQS,
		WHAT_WE_OFFER,
		CATERING_TERMS
	} from '$lib/data/seed';
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
		mainEntity: CATERING_FAQS.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};
</script>

<svelte:head>
	<title>Catering | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="Drop-off and full-service BBQ catering for Nashville events. Review the catering menu, see what we offer, and request a quote."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd(faqSchema)}</` + `script>`}
</svelte:head>

<div class="rise">
	<!-- hero -->
	<section class="relative overflow-hidden bg-smoke-900 text-white">
		<div class="absolute inset-0">
			<img src="/images/bbq-spread.jpg" alt="" class="h-full w-full object-cover opacity-[0.42]" />
			<div
				class="absolute inset-0"
				style="background:linear-gradient(90deg, rgba(12,9,6,.95), rgba(12,9,6,.5))"
			></div>
		</div>
		<div class="container-wide relative py-[76px]">
			<div class="mb-4 flex items-center gap-3"><Tristar lg /><span class="eyebrow text-ember">Catering</span></div>
			<h1 class="display max-w-3xl text-[clamp(2.5rem,7vw,4.875rem)]">Great BBQ for any occasion</h1>
			<p class="mt-4 max-w-xl text-lg leading-relaxed text-cream-text">
				Review the menu, tell us about your event, and we'll follow up to confirm availability and
				build the right spread — drop-off or full-service.
			</p>
			<div class="mt-7 flex flex-wrap gap-3.5">
				<a href="#request" class="btn btn-primary">Request a Quote <ArrowRight size={18} /></a>
				<a href="#menu" class="btn btn-outline-light">View Menu</a>
			</div>
			<p class="mt-6 text-sm text-cream-muted">
				Want the truck on site instead?
				<a href="/food-truck" class="font-bold text-ember underline-offset-4 hover:underline">Book the food truck</a>.
			</p>
		</div>
	</section>

	<!-- menu + form -->
	<section class="py-[88px]">
		<div class="container-wide grid items-start gap-14 lg:grid-cols-2">
			<!-- menu -->
			<div id="menu" class="scroll-mt-24">
				<SectionHead eyebrow="Catering Menu" title="The spread" />
				<p class="mt-3.5 leading-relaxed text-ink-soft">
					Build your event around our meats and sides. We confirm the final menu and pricing after we
					review your details — contact us for a quote.
				</p>

				<h3 class="display mt-9 text-xl text-flame">Meats</h3>
				<div class="mt-4">
					{#each CATERING_MENU.meats as m (m.name)}
						<div class="border-b border-paper-line py-3.5">
							<div class="font-extrabold text-ink">{m.name}</div>
							<div class="text-sm leading-snug text-ink-soft">{m.desc}</div>
						</div>
					{/each}
				</div>

				<h3 class="display mt-8 text-xl text-flame">Sides</h3>
				<div class="mt-4 grid gap-x-8 sm:grid-cols-2">
					{#each CATERING_MENU.sides as m (m.name)}
						<div class="border-b border-paper-line py-3">
							<div class="font-extrabold text-ink">{m.name}</div>
							<div class="text-sm leading-snug text-ink-soft">{m.desc}</div>
						</div>
					{/each}
				</div>
				<p class="mt-3 text-[13px] italic text-ink-soft">{CATERING_MENU.sidesNote}</p>

				<h3 class="display mt-8 text-xl text-flame">Desserts</h3>
				<div class="mt-4 grid gap-x-8 sm:grid-cols-2">
					{#each CATERING_DESSERTS as m (m.name)}
						<div class="border-b border-paper-line py-3">
							<div class="font-extrabold text-ink">{m.name}</div>
							<div class="text-sm leading-snug text-ink-soft">{m.desc}</div>
						</div>
					{/each}
				</div>

				<h3 class="display mt-8 text-xl text-flame">Extras</h3>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each CATERING_EXTRAS as x (x)}
						<span class="rounded-full border border-paper-line bg-paper-2 px-3 py-1.5 text-[13px] font-semibold text-ink-soft">{x}</span>
					{/each}
				</div>

				<p class="mt-6 border-t border-paper-line pt-[18px] text-sm leading-relaxed text-ink-soft">
					Full-service setup, chafing dishes, utensils, and disposables available on request. Our
					Veggie Pulled "Pork" keeps vegetarians in on the BBQ.
				</p>
			</div>

			<!-- request form -->
			<div id="request" class="scroll-mt-24 lg:sticky lg:top-24">
				<RequestForm context="catering" serviceStyles={CATERING_SERVICE_STYLES} {form} />
			</div>
		</div>
	</section>

	<!-- catering packages -->
	<section id="packages" class="scroll-mt-24 border-t border-paper-line py-[88px]">
		<div class="container-wide">
			<SectionHead eyebrow="Built for a crowd" title="Catering packages" />
			<p class="mt-3.5 max-w-3xl leading-relaxed text-ink-soft">{CATERING_PACKAGES_NOTE}</p>
			<div class="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each CATERING_PACKAGES as pkg (pkg.name)}
					<div class="card-brand flex flex-col p-6">
						<h3 class="text-[19px] font-extrabold text-flame">{pkg.name}</h3>
						<p class="mt-2 text-sm leading-relaxed text-ink-soft">{pkg.blurb}</p>
						{#if pkg.choices.length}
							<ul class="mt-4 space-y-2 border-t border-paper-line pt-4 text-[13.5px] leading-snug text-ink-soft">
								{#each pkg.choices as c (c)}
									<li>{c}</li>
								{/each}
							</ul>
						{/if}
						<a href="#request" class="btn btn-ghost btn-sm mt-5 self-start border-paper-line">Request a Quote</a>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- what we offer + terms -->
	<section id="offer" class="scroll-mt-24 border-t border-paper-line bg-paper-2 py-[88px]">
		<div class="container-wide">
			<SectionHead eyebrow="Before we roll up" title="What we offer" />
			<div class="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each WHAT_WE_OFFER as o (o.t)}
					<div class="card-brand p-6">
						<h4 class="mb-2 text-[17px] font-extrabold text-flame">{o.t}</h4>
						<p class="text-sm leading-relaxed text-ink-soft">{o.d}</p>
					</div>
				{/each}
			</div>

			<div id="terms" class="scroll-mt-24">
				<h3 class="display mt-14 text-2xl">Catering made easy</h3>
				<div class="mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-soft">
					{#each CATERING_TERMS as p (p)}
						<p>{p}</p>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- faqs -->
	<section id="faqs" class="scroll-mt-24 py-[88px]">
		<div class="container-tight max-w-3xl">
			<SectionHead eyebrow="Good to know" title="Catering FAQs" center />
			<div class="mt-10">
				{#each CATERING_FAQS as faq, i (faq.q)}
					<FaqItem {faq} open={i === 0} />
				{/each}
			</div>
			<div class="mt-10 text-center">
				<p class="mb-[18px] text-ink-soft">Still have questions? We're happy to talk it through.</p>
				<a href="/contact" class="btn btn-dark">Contact Us</a>
			</div>
		</div>
	</section>

	<NewsletterBand />
</div>
