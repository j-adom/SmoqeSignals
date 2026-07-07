<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | Smoqe Signals BBQ</title>
</svelte:head>

<section class="rise px-6 py-[120px] text-center">
	<div class="display text-flame text-[90px]">{page.status}</div>
	<h1 class="display mb-3 text-[34px]">Lost in the smoke</h1>
	<p class="text-ink-soft mb-7">
		{page.error?.message || 'That page drifted off.'} Let's get you back to the good stuff.
	</p>
	<a href="/" class="btn btn-primary">Back Home</a>
</section>
