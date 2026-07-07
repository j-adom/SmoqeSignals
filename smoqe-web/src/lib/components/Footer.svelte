<script lang="ts">
	import { Phone, Mail, MapPin } from '@lucide/svelte';
	import { BIZ } from '$lib/data/seed';
	import Logo from './Logo.svelte';
	import Tristar from './Tristar.svelte';
	import NewsletterForm from './NewsletterForm.svelte';
	import FacebookIcon from './icons/FacebookIcon.svelte';
	import InstagramIcon from './icons/InstagramIcon.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="bg-smoke-900 text-cream-text">
	<div class="container-wide">
		<div class="grid gap-11 py-[72px] md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
			<div>
				<Logo variant="cream" h={62} />
				<p class="text-cream-muted mt-5 max-w-[320px] text-[14.5px] leading-relaxed">
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
					<li><a href="/the-history" class="text-cream-muted hover:text-white">The History</a></li>
					<li><a href="/contact-us" class="text-cream-muted hover:text-white">Contact Us</a></li>
				</ul>
			</div>

			<div>
				<h4 class="display mb-[18px] text-[15px] tracking-wider text-white">Catering</h4>
				<ul class="flex flex-col gap-3 text-[14.5px]">
					<li>
						<a href="/catering#request" class="text-cream-muted hover:text-white">Request a Quote</a
						>
					</li>
					<li>
						<a href="/catering#menu" class="text-cream-muted hover:text-white">Catering Menu</a>
					</li>
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
						<a
							href={BIZ.phoneHref}
							class="text-cream-muted flex items-center gap-2.5 hover:text-white"
						>
							<Phone size={17} class="text-tristar" />{BIZ.phone}
						</a>
					</li>
					<li>
						<a
							href={`mailto:${BIZ.email}`}
							class="text-cream-muted flex items-center gap-2.5 hover:text-white"
						>
							<Mail size={17} class="text-tristar" />{BIZ.email}
						</a>
					</li>
					<li class="text-cream-muted flex items-start gap-2.5">
						<MapPin size={17} class="text-tristar mt-0.5 shrink-0" />{BIZ.address}
					</li>
				</ul>
				<div class="mt-5 flex items-center gap-3">
					<a
						href="https://www.facebook.com/slimsmokinbbq1"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Smoqe Signals BBQ on Facebook"
						class="text-cream-muted hover:border-tristar grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition-colors hover:text-white"
					>
						<FacebookIcon size={18} />
					</a>
					<a
						href="https://www.instagram.com/smoqesignalsbbq"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Smoqe Signals BBQ on Instagram"
						class="text-cream-muted hover:border-tristar grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition-colors hover:text-white"
					>
						<InstagramIcon size={18} />
					</a>
				</div>

				<div class="mt-5">
					<p class="field-label mb-2 text-white">Join the newsletter</p>
					<NewsletterForm source="footer" buttonLabel="Join" buttonClass="btn-primary" compact />
				</div>
			</div>
		</div>

		<div
			class="text-cream-muted flex flex-wrap justify-between gap-4 border-t border-white/10 py-[22px] text-[13px]"
		>
			<span>© {year} {BIZ.legal}. All rights reserved.</span>
			<nav class="flex flex-wrap gap-x-4 gap-y-1">
				<a href="/privacy-policy" class="hover:text-white">Privacy</a>
				<a href="/terms" class="hover:text-white">Terms</a>
				<a href="/shipping-returns" class="hover:text-white">Shipping &amp; Returns</a>
			</nav>
			<span>{BIZ.tagline}</span>
		</div>
	</div>
</footer>
