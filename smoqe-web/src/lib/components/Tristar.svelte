<script lang="ts">
	let { lg = false }: { lg?: boolean } = $props();
	const s = lg ? '8px' : '5px';
</script>

<span class="inline-flex items-center gap-[3px] align-middle" aria-hidden="true">
	<span class="block rounded-full bg-tristar" style:width={s} style:height={s}></span>
	<span class="block rounded-full bg-tristar" style:width={s} style:height={s}></span>
	<span class="block rounded-full bg-tristar" style:width={s} style:height={s}></span>
</span>
