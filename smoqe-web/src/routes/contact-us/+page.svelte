<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { ArrowRight, Phone, Mail, MapPin, Check } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { BIZ } from '$lib/data/seed';
	import Tristar from '$lib/components/Tristar.svelte';
	import FacebookIcon from '$lib/components/icons/FacebookIcon.svelte';
	import InstagramIcon from '$lib/components/icons/InstagramIcon.svelte';

	let { form }: PageProps = $props();
	let submitting = $state(false);

	const channels = [
		{ Icon: Phone, label: 'Phone', value: BIZ.phone, href: BIZ.phoneHref },
		{ Icon: Mail, label: 'Email', value: BIZ.email, href: `mailto:${BIZ.email}` },
		{ Icon: MapPin, label: 'Mailing address', value: BIZ.address, href: null }
	];

	const INQUIRY_TYPES = [
		'General Inquiry',
		'Booking The Truck Inquiry',
		'Catering Inquiry',
		'Holiday Pre-Order'
	];

	// ?inquiry=holiday|truck|catering pre-selects the dropdown (used by home-page CTAs).
	const inquiryFromUrl = {
		holiday: 'Holiday Pre-Order',
		truck: 'Booking The Truck Inquiry',
		catering: 'Catering Inquiry'
	}[page.url.searchParams.get('inquiry') ?? ''];

	const selectedInquiry = $derived(
		String(form?.inquiryType ?? inquiryFromUrl ?? 'General Inquiry')
	);
</script>

<svelte:head>
	<title>Contact Us | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="Get in touch with Smoqe Signals BBQ — phone, email, and mailing address for bookings and questions."
	/>
</svelte:head>

<div class="rise">
	<section class="py-[88px]">
		<div class="container-wide grid items-start gap-14 lg:grid-cols-2">
			<div>
				<div class="mb-3.5 flex items-center gap-3">
					<Tristar lg /><span class="eyebrow text-flame">Contact Us</span>
				</div>
				<h1 class="display text-[clamp(2.375rem,6vw,4.125rem)]">Get in Touch</h1>
				<p class="text-ink-soft mt-4 mb-9 max-w-md text-[17px] leading-relaxed">
					SmoQe Signals food truck is located in Nashville, TN since 2012. Whether it's booking the
					truck, planning a catering order, or just a question — we read every message and get back
					to you fast.
				</p>

				<div class="card-brand divide-paper-line divide-y">
					{#each channels as c (c.label)}
						<svelte:element
							this={c.href ? 'a' : 'div'}
							href={c.href ?? undefined}
							class="flex items-center gap-4 p-5"
						>
							<div
								class="bg-smoke-900 text-ember grid h-12 w-12 shrink-0 place-items-center rounded-xl"
							>
								<c.Icon size={24} />
							</div>
							<div>
								<div class="eyebrow text-ink-soft text-[12.5px]">{c.label}</div>
								<div class="text-ink mt-0.5 text-[17px] font-bold">{c.value}</div>
							</div>
						</svelte:element>
					{/each}
				</div>

				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					<a href="/catering" class="card-brand group flex items-center justify-between gap-3 p-5">
						<div>
							<div class="eyebrow text-ink-soft text-[12.5px]">Planning an event?</div>
							<div class="text-ink mt-0.5 text-[17px] font-bold">Catering and Events</div>
						</div>
						<ArrowRight
							size={20}
							class="text-flame shrink-0 transition group-hover:translate-x-1"
						/>
					</a>
					<a
						href="/food-truck"
						class="card-brand group flex items-center justify-between gap-3 p-5"
					>
						<div>
							<div class="eyebrow text-ink-soft text-[12.5px]">Want us on site?</div>
							<div class="text-ink mt-0.5 text-[17px] font-bold">Book the Food Truck</div>
						</div>
						<ArrowRight
							size={20}
							class="text-flame shrink-0 transition group-hover:translate-x-1"
						/>
					</a>
				</div>
			</div>

			<div class="card-brand p-[30px]">
				{#if form?.success}
					<div class="py-8 text-center">
						<div
							class="bg-flame/15 text-flame mx-auto mb-[18px] grid h-14 w-14 place-items-center rounded-full"
						>
							<Check size={30} />
						</div>
						<h3 class="display text-[28px]">Message sent</h3>
						<p class="text-ink-soft mt-3 leading-relaxed">
							Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}. We'll get back to you soon.
						</p>
						<a href="/contact-us" class="btn btn-ghost border-paper-line mt-[22px]">Send another</a>
					</div>
				{:else}
					<h3 class="display mb-[18px] text-[26px]">Send a message</h3>
					{#if form?.error}
						<p
							class="border-flame/30 bg-flame/10 text-flame mb-4 rounded border px-4 py-3 text-sm font-semibold"
						>
							{form.error}
						</p>
					{/if}
					<form
						method="POST"
						class="grid gap-4"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}}
					>
						<label class="absolute -left-[10000px]" aria-hidden="true">
							Website
							<input name="website" tabindex="-1" autocomplete="off" />
						</label>
						<label class="grid gap-2">
							<span class="field-label">Name</span>
							<input
								name="name"
								maxlength="120"
								class="field-input"
								required
								value={form?.name ?? ''}
								placeholder="Your name"
							/>
						</label>
						<label class="grid gap-2">
							<span class="field-label">Email</span>
							<input
								name="email"
								maxlength="254"
								type="email"
								class="field-input"
								required
								value={form?.email ?? ''}
								placeholder="you@email.com"
							/>
						</label>
						<label class="grid gap-2">
							<span class="field-label">What's this about?</span>
							<select name="inquiryType" class="field-input" required>
								{#each INQUIRY_TYPES as opt (opt)}
									<option selected={selectedInquiry === opt}>{opt}</option>
								{/each}
							</select>
						</label>
						<label class="grid gap-2">
							<span class="field-label">Message</span>
							<textarea
								name="message"
								maxlength="5000"
								class="field-input"
								required
								placeholder="How can we help?">{form?.message ?? ''}</textarea
							>
						</label>
						<button class="btn btn-primary btn-block min-h-[54px]" disabled={submitting}>
							{submitting ? 'Sending…' : 'Send Message'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<section class="border-paper-line border-t">
		<iframe
			title="Smoqe Signals BBQ service area — Nashville, TN"
			src="https://www.google.com/maps?q=Nashville%2C+TN&output=embed"
			class="block h-[360px] w-full"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</section>

	<section class="border-paper-line relative border-t">
		<img
			src="/images/truck-first-tn-park.jpg"
			alt="The Smoqe Signals BBQ food truck parked outside First Tennessee Park in Nashville"
			class="h-[380px] w-full object-cover sm:h-[460px]"
			loading="lazy"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
		<div class="container-wide absolute inset-x-0 bottom-0">
			<div class="flex flex-col gap-5 pb-9 sm:flex-row sm:items-end sm:justify-between">
				<div class="max-w-xl text-white">
					<div class="eyebrow text-flame">
						Nashville Bred · Memphis Approved · Tennessee Tradition
					</div>
					<p class="display mt-2 text-[clamp(1.5rem,3vw,2.125rem)]">Catch the truck around town.</p>
					<p class="mt-1.5 text-sm text-white/70">
						Follow along for the schedule, new drops, and where we're smoking next.
					</p>
				</div>
				<div class="flex items-center gap-3">
					<a
						href="https://www.facebook.com/slimsmokinbbq1"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Smoqe Signals BBQ on Facebook"
						class="hover:border-tristar grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white/85 backdrop-blur-sm transition-colors hover:text-white"
					>
						<FacebookIcon size={19} />
					</a>
					<a
						href="https://www.instagram.com/smoqesignalsbbq"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Smoqe Signals BBQ on Instagram"
						class="hover:border-tristar grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white/85 backdrop-blur-sm transition-colors hover:text-white"
					>
						<InstagramIcon size={19} />
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
