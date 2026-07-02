<script lang="ts">
	import { Flame } from '@lucide/svelte';
	import type { Heat } from '$lib/types';

	let { level }: { level: Heat } = $props();
</script>

{#if level > 0}
	<span class="inline-flex gap-[3px]" title={`Heat ${level}/5`} aria-label={`Heat level ${level} of 5`}>
		{#each [1, 2, 3, 4, 5] as n (n)}
			<Flame
				size={13}
				class={n <= level ? 'fill-flame-bright text-flame-bright' : 'text-paper-line'}
			/>
		{/each}
	</span>
{/if}
