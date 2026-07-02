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
	let status = $state<'idle' | 'loading' | 'done'>('idle');

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!email || status === 'loading') return;
		status = 'loading';
		try {
			await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ email, source })
			});
		} catch {
			/* swallow — optimistic */
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
	<form onsubmit={submit} class={`flex gap-2.5 ${compact ? '' : 'flex-wrap'}`}>
		<input
			type="email"
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
