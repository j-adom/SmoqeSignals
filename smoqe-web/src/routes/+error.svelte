<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | Smoqe Signals BBQ</title>
</svelte:head>

<section class="rise px-6 py-[120px] text-center">
	<div class="display text-[90px] text-flame">{page.status}</div>
	<h1 class="display mb-3 text-[34px]">Lost in the smoke</h1>
	<p class="mb-7 text-ink-soft">
		{page.error?.message || "That page drifted off."} Let's get you back to the good stuff.
	</p>
	<a href="/" class="btn btn-primary">Back Home</a>
</section>
