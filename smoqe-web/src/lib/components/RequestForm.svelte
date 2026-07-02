<script lang="ts">
	import { enhance } from '$app/forms';
	import { Check } from '@lucide/svelte';
	import { BIZ } from '$lib/data/seed';
	import { formatDate } from '$lib/utils';

	type Props = {
		/** Drives headings and confirmation copy. */
		context: 'truck' | 'catering';
		/** Service-style options shown in the select. */
		serviceStyles: string[];
		/** The action result passed down from the page. */
		form: Record<string, unknown> | null | undefined;
	};

	let { context, serviceStyles, form }: Props = $props();
	let submitting = $state(false);

	const copy = $derived({
		truck: {
			heading: 'Book the Truck',
			sub: "Tell us about your event and we'll confirm availability.",
			button: 'Send Booking Request',
			sending: 'Sending…',
			confirmed: "we've got your details and we'll confirm the truck for your date shortly."
		},
		catering: {
			heading: 'Request Catering',
			sub: "We'll reply within one business day.",
			button: 'Send Catering Request',
			sending: 'Sending…',
			confirmed: "we've got your details. We'll confirm availability and dial in the menu shortly."
		}
	}[context]);

	const newRequestHref = $derived(context === 'truck' ? '/food-truck' : '/catering');
</script>

<div class="card-brand p-[30px]">
	{#if form?.success}
		<div class="mb-[18px] grid h-14 w-14 place-items-center rounded-full bg-flame/15 text-flame">
			<Check size={30} />
		</div>
		<h3 class="display text-3xl">Request received</h3>
		<p class="mb-[18px] mt-3 leading-relaxed text-ink-soft">
			Thanks{form.name ? `, ${String(form.name).split(' ')[0]}` : ''}{form.eventDate
				? ` — for ${formatDate(String(form.eventDate))},`
				: ' —'}
			{copy.confirmed}
		</p>
		<div class="rounded bg-paper-2 px-[18px] py-4 text-sm leading-7 text-ink-soft">
			<div><strong class="text-ink">Email:</strong> {form.email || '—'}</div>
			<div><strong class="text-ink">Phone:</strong> {form.phone || '—'}</div>
			<div><strong class="text-ink">Guests:</strong> {form.guestCount || 'Not specified'}</div>
			<div><strong class="text-ink">Service:</strong> {form.serviceStyle || 'Not selected'}</div>
		</div>
		<div class="mt-[22px] flex flex-wrap gap-3">
			<a href={`mailto:${BIZ.email}`} class="btn btn-primary flex-1">Email Follow-up</a>
			<a href={newRequestHref} class="btn btn-ghost flex-1 border-paper-line">New Request</a>
		</div>
	{:else}
		<h3 class="display text-[28px]">{copy.heading}</h3>
		<p class="mb-5 mt-1 text-[14.5px] text-ink-soft">{copy.sub}</p>

		{#if form?.error}
			<p class="mb-4 rounded border border-flame/30 bg-flame/10 px-4 py-3 text-sm font-semibold text-flame">
				{form.error}
			</p>
		{/if}

		<form
			method="POST"
			action="?/submit"
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
				<span class="field-label">Contact name</span>
				<input name="name" class="field-input" required value={form?.name ?? ''} placeholder="Your name" />
			</label>
			<div class="grid gap-4 sm:grid-cols-2">
				<label class="grid gap-2">
					<span class="field-label">Email</span>
					<input name="email" type="email" class="field-input" required value={form?.email ?? ''} placeholder="you@email.com" />
				</label>
				<label class="grid gap-2">
					<span class="field-label">Phone</span>
					<input name="phone" type="tel" class="field-input" required value={form?.phone ?? ''} placeholder="(615) 555-1234" />
				</label>
			</div>
			<div class="grid gap-4 sm:grid-cols-2">
				<label class="grid gap-2">
					<span class="field-label">Event date</span>
					<input name="eventDate" type="date" class="field-input" value={form?.eventDate ?? ''} />
				</label>
				<label class="grid gap-2">
					<span class="field-label">Guest count</span>
					<input name="guestCount" inputmode="numeric" class="field-input" value={form?.guestCount ?? ''} placeholder="e.g. 50" />
				</label>
			</div>
			<label class="grid gap-2">
				<span class="field-label">Service style</span>
				<select name="serviceStyle" class="field-input" required>
					<option value="" selected={!form?.serviceStyle}>Select service style</option>
					{#each serviceStyles as s (s)}
						<option selected={form?.serviceStyle === s}>{s}</option>
					{/each}
				</select>
			</label>
			<label class="grid gap-2">
				<span class="field-label">Notes</span>
				<textarea name="notes" class="field-input" placeholder="Location, setup needs, dietary restrictions, timing…">{form?.notes ?? ''}</textarea>
			</label>
			<button class="btn btn-primary btn-block min-h-14 text-base" disabled={submitting}>
				{submitting ? copy.sending : copy.button}
			</button>
		</form>
	{/if}
</div>
