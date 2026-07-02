<script lang="ts">
	let {
		variant = 'brown',
		h = 40,
		alt = 'Smoqe Signals BBQ',
		class: cls = ''
	}: { variant?: 'brown' | 'cream'; h?: number; alt?: string; class?: string } = $props();

	const src = variant === 'cream' ? '/images/logo-cream.png' : '/images/logo-brown.png';
</script>

<img {src} {alt} class={`w-auto ${cls}`} style:height={`${h}px`} />
