<script lang="ts">
	import { Star } from '@lucide/svelte';
	import { TESTIMONIALS } from '$lib/data/seed';
	import SectionHead from './SectionHead.svelte';

	const STARS = [0, 1, 2, 3, 4];
</script>

{#if TESTIMONIALS.length}
	<section class="border-t border-paper-line bg-paper-2 py-[88px]">
		<div class="container-wide">
			<div class="mx-auto mb-12 max-w-2xl text-center">
				<SectionHead eyebrow="Word of mouth" title="What folks are saying" center />
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each TESTIMONIALS as t (t.quote)}
					<figure class="card-brand flex flex-col p-7">
						<div class="mb-3 flex gap-0.5 text-flame">
							{#each STARS as s (s)}<Star size={16} fill="currentColor" />{/each}
						</div>
						<blockquote class="flex-1 text-[16.5px] leading-relaxed text-ink">
							&ldquo;{t.quote}&rdquo;
						</blockquote>
						<figcaption class="mt-4 text-sm font-bold text-ink-soft">
							{t.name}{#if t.source}<span class="font-normal"> · via {t.source}</span>{/if}
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</section>
{/if}
