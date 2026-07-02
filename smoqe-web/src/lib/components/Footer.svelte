<script lang="ts">
	import { Phone, Mail, MapPin } from '@lucide/svelte';
	import { BIZ } from '$lib/data/seed';
	import Logo from './Logo.svelte';
	import Tristar from './Tristar.svelte';
	import NewsletterForm from './NewsletterForm.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="bg-smoke-900 text-cream-text">
	<div class="container-wide">
		<div class="grid gap-11 py-[72px] md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
			<div>
				<Logo variant="cream" h={62} />
				<p class="mt-5 max-w-[320px] text-[14.5px] leading-relaxed text-cream-muted">
					Nashville's West-Tennessee BBQ food truck and catering crew. Tender pulled pork, veggie
					pulled "pork," and some of the best brisket in the city.
				</p>
				<span
					class="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[13px] font-bold text-white"
				>
					<Tristar /> Nashville, TN
				</span>
			</div>

			<div>
				<h4 class="display mb-[18px] text-[15px] tracking-wider text-white">Explore</h4>
				<ul class="flex flex-col gap-3 text-[14.5px]">
					<li><a href="/shop" class="text-cream-muted hover:text-white">Shop Rubs</a></li>
					<li><a href="/food-truck" class="text-cream-muted hover:text-white">Food Truck</a></li>
					<li><a href="/catering" class="text-cream-muted hover:text-white">Catering</a></li>
					<li><a href="/blog" class="text-cream-muted hover:text-white">Blog</a></li>
					<li><a href="/about" class="text-cream-muted hover:text-white">Our Story</a></li>
					<li><a href="/contact" class="text-cream-muted hover:text-white">Contact</a></li>
				</ul>
			</div>

			<div>
				<h4 class="display mb-[18px] text-[15px] tracking-wider text-white">Catering</h4>
				<ul class="flex flex-col gap-3 text-[14.5px]">
					<li><a href="/catering#request" class="text-cream-muted hover:text-white">Request a Quote</a></li>
					<li><a href="/catering#menu" class="text-cream-muted hover:text-white">Catering Menu</a></li>
					<li><a href="/catering#faqs" class="text-cream-muted hover:text-white">FAQs</a></li>
					<li>
						<a href="/catering#offer" class="text-cream-muted hover:text-white">What We Offer</a>
					</li>
				</ul>
			</div>

			<div>
				<h4 class="display mb-[18px] text-[15px] tracking-wider text-white">Get in Touch</h4>
				<ul class="flex flex-col gap-3 text-[14.5px]">
					<li>
						<a href={BIZ.phoneHref} class="flex items-center gap-2.5 text-cream-muted hover:text-white">
							<Phone size={17} class="text-tristar" />{BIZ.phone}
						</a>
					</li>
					<li>
						<a
							href={`mailto:${BIZ.email}`}
							class="flex items-center gap-2.5 text-cream-muted hover:text-white"
						>
							<Mail size={17} class="text-tristar" />{BIZ.email}
						</a>
					</li>
					<li class="flex items-start gap-2.5 text-cream-muted">
						<MapPin size={17} class="mt-0.5 shrink-0 text-tristar" />{BIZ.address}
					</li>
				</ul>
				<div class="mt-5">
					<p class="field-label mb-2 text-white">Join the newsletter</p>
					<NewsletterForm source="footer" buttonLabel="Join" buttonClass="btn-primary" compact />
				</div>
			</div>
		</div>

		<div
			class="flex flex-wrap justify-between gap-4 border-t border-white/10 py-[22px] text-[13px] text-cream-muted"
		>
			<span>© {year} {BIZ.legal}. All rights reserved.</span>
			<span>{BIZ.tagline}</span>
		</div>
	</div>
</footer>
