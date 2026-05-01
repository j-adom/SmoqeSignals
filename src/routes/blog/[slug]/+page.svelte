<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} | Smoqe Signals</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="mx-auto prose prose-lg px-6 py-12 text-gray-800 lg:prose-xl">
	<h1>{data.meta.title}</h1>
	<p class="mb-8 text-sm text-gray-500">
		Published on {new Date(data.meta.date).toLocaleDateString()}
	</p>
	<div class="content">
		<data.content />
	</div>
</article>
