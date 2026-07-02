<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Faq } from '$lib/types';

	let { faq, open = false }: { faq: Faq; open?: boolean } = $props();
	let expanded = $state(open);
</script>

<div class="border-b border-paper-line">
	<button
		class="flex w-full items-center justify-between gap-5 py-[22px] text-left"
		onclick={() => (expanded = !expanded)}
		aria-expanded={expanded}
	>
		<span class="text-lg font-extrabold text-ink">{faq.q}</span>
		<span
			class={`grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full text-xl font-bold transition-colors ${
				expanded ? 'bg-flame text-white' : 'bg-paper-2 text-ink'
			}`}
		>
			{expanded ? '–' : '+'}
		</span>
	</button>
	{#if expanded}
		<p transition:slide={{ duration: 220 }} class="pb-6 text-[15.5px] leading-relaxed text-ink-soft">
			{faq.a}
		</p>
	{/if}
</div>
