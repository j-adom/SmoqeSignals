<script lang="ts">
	import Tristar from './Tristar.svelte';

	const words = [
		'Pulled Pork',
		'Beef Brisket',
		'Smoked Wings',
		'Smoked Turkey',
		'Veggie Pulled "Pork"',
		'Mac & Cheese',
		'Baked Beans'
	];
</script>

<div class="border-smoke-900 bg-flame overflow-hidden border-b-[3px] text-white">
	<div class="marquee py-3">
		{#each [0, 1] as dup (dup)}
			<div class="flex shrink-0 items-center" aria-hidden={dup === 1}>
				{#each words as w (w)}
					<span class="flex items-center gap-4 px-4">
						<span class="display text-lg">{w}</span>
						<Tristar />
					</span>
				{/each}
			</div>
		{/each}
	</div>
</div>
