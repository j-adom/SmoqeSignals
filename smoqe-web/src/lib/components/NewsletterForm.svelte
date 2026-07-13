<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { toast } from '$lib/stores/toast.svelte';

	let {
		source = 'site',
		buttonLabel = 'Subscribe',
		buttonClass = 'btn-dark',
		compact = false
	}: {
		source?: string;
		buttonLabel?: string;
		buttonClass?: string;
		compact?: boolean;
	} = $props();

	let email = $state('');
	let status = $state<'idle' | 'loading' | 'done' | 'error'>('idle');

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!email || status === 'loading') return;
		status = 'loading';
		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ email, source })
			});
			if (!response.ok) throw new Error('Subscription failed');
		} catch {
			status = 'error';
			toast.show('We could not save that subscription. Please try again.');
			return;
		}
		status = 'done';
		email = '';
		toast.show("You're on the list — see you at the smoke.");
	}
</script>

{#if status === 'done'}
	<div
		class="inline-flex items-center gap-2 rounded bg-black/15 px-5 py-3.5 text-[15px] font-extrabold"
	>
		<Check size={18} /> You're in. Welcome to the crew.
	</div>
{:else}
	{#if status === 'error'}
		<p class="mb-2 text-sm font-bold" role="alert">
			Could not subscribe right now. Please try again.
		</p>
	{/if}
	<form onsubmit={submit} class={`flex gap-2.5 ${compact ? '' : 'flex-wrap'}`}>
		<input
			type="email"
			maxlength="254"
			required
			bind:value={email}
			placeholder="Enter your email address"
			class="field-input flex-1"
			style:min-width={compact ? '0' : '220px'}
			style:min-height={compact ? '46px' : '54px'}
		/>
		<button
			type="submit"
			class={`btn ${buttonClass} ${compact ? 'btn-sm' : ''}`}
			style:min-height={compact ? '46px' : '54px'}
			disabled={status === 'loading'}
		>
			{status === 'loading' ? 'Joining…' : buttonLabel}
		</button>
	</form>
{/if}
