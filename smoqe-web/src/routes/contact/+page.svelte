<script lang="ts">
	import { enhance } from '$app/forms';
	import { Phone, Mail, MapPin, Check } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { BIZ } from '$lib/data/seed';
	import Tristar from '$lib/components/Tristar.svelte';

	let { form }: PageProps = $props();
	let submitting = $state(false);

	const channels = [
		{ Icon: Phone, label: 'Phone', value: BIZ.phone, href: BIZ.phoneHref },
		{ Icon: Mail, label: 'Email', value: BIZ.email, href: `mailto:${BIZ.email}` },
		{ Icon: MapPin, label: 'Mailing address', value: BIZ.address, href: null }
	];
</script>

<svelte:head>
	<title>Contact | Smoqe Signals BBQ</title>
	<meta name="description" content="Get in touch with Smoqe Signals BBQ — phone, email, and mailing address for bookings and questions." />
</svelte:head>

<div class="rise">
	<section class="py-[88px]">
		<div class="container-wide grid items-start gap-14 lg:grid-cols-2">
			<div>
				<div class="mb-3.5 flex items-center gap-3"><Tristar lg /><span class="eyebrow text-flame">Contact</span></div>
				<h1 class="display text-[clamp(2.375rem,6vw,4.125rem)]">Let's talk BBQ</h1>
				<p class="mb-9 mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">
					Questions about our schedule, a big order, or where to find the truck this week? Reach out
					directly — we answer.
				</p>
				<div class="grid gap-4">
					{#each channels as c (c.label)}
						<svelte:element
							this={c.href ? 'a' : 'div'}
							href={c.href ?? undefined}
							class="card-brand flex items-center gap-4 p-5"
						>
							<div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-smoke-900 text-ember">
								<c.Icon size={24} />
							</div>
							<div>
								<div class="eyebrow text-[12.5px] text-ink-soft">{c.label}</div>
								<div class="mt-0.5 text-[17px] font-bold text-ink">{c.value}</div>
							</div>
						</svelte:element>
					{/each}
				</div>
			</div>

			<div class="card-brand p-[30px]">
				{#if form?.success}
					<div class="py-8 text-center">
						<div class="mx-auto mb-[18px] grid h-14 w-14 place-items-center rounded-full bg-flame/15 text-flame">
							<Check size={30} />
						</div>
						<h3 class="display text-[28px]">Message sent</h3>
						<p class="mt-3 leading-relaxed text-ink-soft">
							Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}. We'll get back to you soon.
						</p>
						<a href="/contact" class="btn btn-ghost mt-[22px] border-paper-line">Send another</a>
					</div>
				{:else}
					<h3 class="display mb-[18px] text-[26px]">Send a message</h3>
					{#if form?.error}
						<p class="mb-4 rounded border border-flame/30 bg-flame/10 px-4 py-3 text-sm font-semibold text-flame">
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
						<label class="grid gap-2">
							<span class="field-label">Name</span>
							<input name="name" class="field-input" required value={form?.name ?? ''} placeholder="Your name" />
						</label>
						<label class="grid gap-2">
							<span class="field-label">Email</span>
							<input name="email" type="email" class="field-input" required value={form?.email ?? ''} placeholder="you@email.com" />
						</label>
						<label class="grid gap-2">
							<span class="field-label">Message</span>
							<textarea name="message" class="field-input" required placeholder="How can we help?">{form?.message ?? ''}</textarea>
						</label>
						<button class="btn btn-primary btn-block min-h-[54px]" disabled={submitting}>
							{submitting ? 'Sending…' : 'Send Message'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>
</div>
