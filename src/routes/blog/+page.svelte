<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | Smoqe Signals</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-12">
	<h1 class="mb-8 text-4xl font-bold">Our Latest Posts</h1>
	<div class="grid gap-8">
		{#each data.posts as post}
			<article class="rounded-xl border p-6 transition-shadow hover:shadow-lg">
				<a href="/blog/{post.slug}" class="block">
					<h2 class="mb-2 text-2xl font-semibold">{post.title}</h2>
					<p class="mb-4 text-gray-600">{post.description}</p>
					<div class="text-sm text-gray-500">
						<span>{new Date(post.date).toLocaleDateString()}</span>
						{#if post.tags}
							<span class="ml-4">
								{#each post.tags as tag}
									<span
										class="mr-2 mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700"
										>#{tag}</span
									>
								{/each}
							</span>
						{/if}
					</div>
				</a>
			</article>
		{/each}
	</div>
</section>
