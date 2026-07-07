<script lang="ts">
	let {
		eyebrow,
		title,
		sub,
		center = false,
		light = false
	}: {
		eyebrow?: string;
		title: string;
		sub?: string;
		center?: boolean;
		light?: boolean;
	} = $props();
</script>

<div class={center ? 'mx-auto max-w-2xl text-center' : ''}>
	{#if eyebrow}
		<div class={`mb-3 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
			{#if !center}<span class="bg-flame block h-[2px] w-7"></span>{/if}
			<span class="eyebrow text-flame">{eyebrow}</span>
		</div>
	{/if}
	<h2 class={`display text-[clamp(2rem,5vw,3.25rem)] ${light ? 'text-white' : 'text-ink'}`}>
		{title}
	</h2>
	{#if sub}
		<p
			class={`mt-4 max-w-xl text-lg leading-relaxed ${center ? 'mx-auto' : ''} ${
				light ? 'text-cream-muted' : 'text-ink-soft'
			}`}
		>
			{sub}
		</p>
	{/if}
</div>
