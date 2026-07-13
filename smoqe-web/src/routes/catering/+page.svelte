<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import {
		CATERING_MENU,
		CATERING_FEATURES,
		CATERING_EXTRAS,
		CATERING_SERVICE_STYLES,
		CATERING_FAQS,
		CATERING_TERMS
	} from '$lib/data/seed';
	import { jsonLd } from '$lib/utils';
	import Tristar from '$lib/components/Tristar.svelte';
	import PageJumpNav from '$lib/components/PageJumpNav.svelte';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import FaqItem from '$lib/components/FaqItem.svelte';
	import RequestForm from '$lib/components/RequestForm.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
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
	<title>Catering and Events | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="Drop-off and full-service BBQ catering for Nashville events. Review the catering menu, see what we offer, and request a quote."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd(faqSchema)}</` + `script>`}
</svelte:head>

<div class="rise">
	<!-- hero -->
	<section class="bg-smoke-900 relative overflow-hidden text-white">
		<div class="absolute inset-0">
			<img src="/images/bbq-spread.jpg" alt="" class="h-full w-full object-cover opacity-[0.42]" />
			<div
				class="absolute inset-0"
				style="background:linear-gradient(90deg, rgba(12,9,6,.95), rgba(12,9,6,.5))"
			></div>
		</div>
		<div class="container-wide relative py-[76px]">
			<div class="mb-4 flex items-center gap-3">
				<Tristar lg /><span class="eyebrow text-ember">Catering</span>
			</div>
			<h1 class="display max-w-3xl text-[clamp(2.5rem,7vw,4.875rem)]">Catering and Events</h1>
			<p class="text-ember mt-4 text-lg font-extrabold">
				Elevate your event with SmoQe Signals BBQ catering.
			</p>
			<p class="text-cream-text mt-3 max-w-xl text-lg leading-relaxed">
				Planning an event people will actually talk about? Great BBQ turns any event into one people
				remember. From weddings and birthdays to corporate galas and family reunions, we handle the
				food so you can focus on your guests. Tell us about your event, and we'll build a menu
				around your budget, your dietary needs, and your occasion.
			</p>
			<div class="mt-7 flex flex-wrap gap-3.5">
				<a href="#request" class="btn btn-primary">Request a Quote <ArrowRight size={18} /></a>
				<a href="#menu" class="btn btn-outline-light">View Menu</a>
			</div>
			<p class="text-cream-muted mt-6 text-sm">
				Want the truck on site instead?
				<a href="/food-truck" class="text-ember font-bold underline-offset-4 hover:underline"
					>Book the food truck</a
				>.
			</p>
		</div>
	</section>

	<PageJumpNav
		links={[
			{ label: 'Menu', href: '#menu' },
			{ label: 'Packages', href: '#packages' },
			{ label: 'What We Offer', href: '#terms' },
			{ label: 'FAQs', href: '#faqs' }
		]}
		cta={{ label: 'Request a Quote', href: '#request' }}
	/>

	<!-- menu -->
	<section id="menu" class="scroll-mt-32 py-[88px]">
		<div class="container-tight max-w-3xl text-center">
			<SectionHead eyebrow="For any occasion" title="Catering Menu" center />

			<div class="mt-8 gap-10 sm:columns-2">
				{#each CATERING_MENU.sections as sec (sec.category)}
					<div class="mb-8 break-inside-avoid">
						<h3 class="display text-flame text-2xl">{sec.category}</h3>
						<ul class="mt-4 space-y-2.5">
							{#each sec.items as item (item)}
								<li class="text-ink font-extrabold">{item}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<h3 class="display text-flame mt-12 text-2xl">Sides</h3>
			<p class="text-ink-soft mt-2 text-[13px] italic">{CATERING_MENU.sidesNote}</p>
			<ul class="mt-4 space-y-2.5">
				{#each CATERING_MENU.sides as item (item)}
					<li class="text-ink font-extrabold">{item}</li>
				{/each}
			</ul>

			<h3 class="display text-flame mt-12 text-2xl">Extras</h3>
			<div class="mt-4 flex flex-wrap justify-center gap-2">
				{#each CATERING_EXTRAS as x (x)}
					<span
						class="border-paper-line bg-paper-2 text-ink-soft rounded-full border px-3 py-1.5 text-[13px] font-semibold"
						>{x}</span
					>
				{/each}
			</div>
		</div>
	</section>

	<!-- crowd features (replaces packages grid) -->
	<section id="packages" class="border-paper-line scroll-mt-32 border-t py-[88px]">
		<div class="container-wide">
			<SectionHead eyebrow="Built for a crowd" title="Whole Hog, Wings & Tailgates" />
			<div class="mt-9 grid gap-5 md:grid-cols-3">
				{#each CATERING_FEATURES as f (f.name)}
					<div class="card-brand flex flex-col p-6">
						<h3 class="text-flame text-[19px] font-extrabold">{f.name}</h3>
						<p class="text-ink-soft mt-2 text-sm leading-relaxed">{f.blurb}</p>
						<a href="#request" class="btn btn-ghost btn-sm border-paper-line mt-5 self-start"
							>Request a Quote</a
						>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- terms -->
	<section id="terms" class="border-paper-line bg-paper-2 scroll-mt-32 border-t py-[88px]">
		<div class="container-wide">
			<SectionHead eyebrow="What We Offer" title="Catering Made Easy" />
			<div class="mt-9 grid gap-10 lg:grid-cols-2">
				{#each CATERING_TERMS as group (group.title)}
					<div>
						<h3 class="display text-flame text-2xl">{group.title}</h3>
						<ul class="mt-5 space-y-4">
							{#each group.bullets as b (b.label)}
								<li class="text-[15px] leading-relaxed">
									<strong class="text-ink">{b.label}</strong>
									<span class="text-ink-soft"> — {b.text}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- faqs -->
	<section id="faqs" class="scroll-mt-32 py-[88px]">
		<div class="container-tight max-w-3xl">
			<SectionHead eyebrow="Good to know" title="Catering FAQs" center />
			<div class="mt-10">
				{#each CATERING_FAQS as faq, i (faq.q)}
					<FaqItem {faq} open={i === 0} />
				{/each}
			</div>
			<div class="mt-10 text-center">
				<p class="text-ink-soft mb-[18px]">Still have questions? We're happy to talk it through.</p>
				<a href="/contact-us" class="btn btn-dark">Contact Us</a>
			</div>
		</div>
	</section>

	<!-- request form -->
	<section id="request" class="border-paper-line bg-paper-2 scroll-mt-32 border-t py-[88px]">
		<div class="container-tight max-w-3xl">
			<SectionHead eyebrow="Request a Quote" title="Tell us about your event" center />
			<div class="mt-10">
				<RequestForm context="catering" serviceStyles={CATERING_SERVICE_STYLES} {form} />
			</div>
		</div>
	</section>

	<Testimonials />

	<NewsletterBand />
</div>
