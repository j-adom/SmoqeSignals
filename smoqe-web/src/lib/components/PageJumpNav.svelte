<script lang="ts">
	let {
		links,
		cta
	}: {
		links: { label: string; href: string }[];
		cta?: { label: string; href: string };
	} = $props();
</script>

<nav
	aria-label="On this page"
	class="border-paper-line bg-paper/85 sticky top-[74px] z-40 border-b backdrop-blur-md"
>
	<div class="container-wide flex items-center gap-1 overflow-x-auto py-2">
		{#each links as l (l.href)}
			<a
				href={l.href}
				class="text-char hover:text-flame rounded px-3.5 py-2 text-[13.5px] font-bold whitespace-nowrap transition-colors"
			>
				{l.label}
			</a>
		{/each}
		{#if cta}
			<a href={cta.href} class="btn btn-primary btn-sm ml-auto whitespace-nowrap">{cta.label}</a>
		{/if}
	</div>
</nav>
