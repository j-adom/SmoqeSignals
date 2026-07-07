<script lang="ts">
	import NewsletterForm from './NewsletterForm.svelte';
</script>

<section class="bg-flame text-white">
	<div class="container-tight max-w-2xl py-16 text-center">
		<h2 class="display text-[clamp(1.9rem,4.5vw,2.75rem)]">Join the Newsletter</h2>
		<p class="mx-auto mt-3.5 mb-7 max-w-md text-[17px] opacity-90">
			Truck locations, pop-ups, new rubs, and event dates — straight to your inbox. No spam, just
			smoke.
		</p>
		<div class="mx-auto max-w-md">
			<NewsletterForm source="home-band" />
		</div>
	</div>
</section>
