<script lang="ts">
	import './layout.css';

	let mobileMenuOpen = $state(false);

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<div class="flex min-h-screen flex-col bg-bbq-darker font-sans text-white/90 selection:bg-bbq-orange/30">
	<header class="sticky top-0 z-50 border-b border-white/5 bg-bbq-darker/95 shadow-2xl backdrop-blur-md">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-4 transition-transform hover:scale-105 active:scale-95" onclick={closeMobileMenu}>
				<img src="/smoqe-q-logo.png" alt="SmoQe Q Logo" class="h-10 w-10 drop-shadow-[0_0_10px_rgba(227,75,20,0.5)]" />
				<div class="flex flex-col">
					<span class="font-header text-2xl uppercase tracking-wider text-bbq-orange leading-none">
						SmoQe Signals BBQ
					</span>
					<span class="font-accent text-[8px] tracking-[0.3em] uppercase text-bbq-blue mt-1">
						Nashville Bred • Memphis Approved • Tennessee Tradition
					</span>
				</div>
			</a>

			<nav class="hidden items-center gap-8 text-sm font-bold uppercase tracking-widest md:flex">
				<a href="/" class="transition-colors hover:text-bbq-blue">Home</a>
				<a href="/about-us" class="transition-colors hover:text-bbq-blue">About</a>
				<a href="/food-truck-menu" class="transition-colors hover:text-bbq-blue">Menu</a>
				<div class="group relative">
					<button class="flex items-center gap-1 transition-colors hover:text-bbq-blue uppercase tracking-widest font-bold">
						Catering
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 transition-transform group-hover:rotate-180"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<div class="absolute left-0 top-full pt-2 hidden w-56 group-hover:block">
						<div class="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-bbq-dark shadow-2xl">
							<a href="/catering" class="px-4 py-3 transition-colors hover:bg-bbq-blue hover:text-bbq-darker text-xs font-bold uppercase tracking-widest">
								Main Catering
							</a>
							<a href="/catering-faqs" class="px-4 py-3 transition-colors hover:bg-bbq-blue hover:text-bbq-darker text-xs font-bold uppercase tracking-widest">
								Catering FAQs
							</a>
							<a
								href="/catering-requirments"
								class="px-4 py-3 transition-colors hover:bg-bbq-blue hover:text-bbq-darker text-xs font-bold uppercase tracking-widest"
							>
								Catering Requirements
							</a>
						</div>
					</div>
				</div>
				<a href="/contact-us" class="transition-colors hover:text-bbq-blue">Contact</a>
			</nav>

			<button
				class="rounded-lg p-2 text-white/70 hover:bg-white/5 hover:text-bbq-blue md:hidden"
				type="button"
				aria-label="Toggle navigation"
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>

		{#if mobileMenuOpen}
			<nav id="mobile-menu" class="border-t border-white/5 bg-bbq-darker px-6 py-6 md:hidden">
				<div class="mx-auto flex max-w-7xl flex-col gap-4 text-lg font-bold uppercase tracking-widest">
					<a href="/" onclick={closeMobileMenu} class="py-2 hover:text-bbq-blue">Home</a>
					<a href="/about-us" onclick={closeMobileMenu} class="py-2 hover:text-bbq-blue">About</a>
					<a href="/food-truck-menu" onclick={closeMobileMenu} class="py-2 hover:text-bbq-blue">Menu</a>
					<a href="/catering" onclick={closeMobileMenu} class="py-2 hover:text-bbq-blue">Catering</a>
					<a href="/catering-faqs" onclick={closeMobileMenu} class="py-2 hover:text-bbq-blue">
						Catering FAQs
					</a>
					<a
						href="/catering-requirments"
						onclick={closeMobileMenu}
						class="py-2 hover:text-bbq-blue"
					>
						Catering Requirements
					</a>
					<a href="/contact-us" onclick={closeMobileMenu} class="py-2 hover:text-bbq-blue">Contact</a>
				</div>
			</nav>
		{/if}
	</header>

	<main class="flex-1">
		<slot />
	</main>

	<footer class="border-t border-white/5 bg-bbq-darker pt-20 pb-10 text-white/50">
		<div class="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-3">
			<div class="flex flex-col gap-8">
				<div class="flex items-center gap-4">
					<img src="/smoqe-q-logo.png" alt="SmoQe Q Logo" class="h-12 w-12" />
					<div>
						<h3 class="font-header text-3xl uppercase tracking-wider text-white leading-none">SmoQe Signals BBQ</h3>
						<p class="font-accent text-[9px] tracking-[0.3em] uppercase text-bbq-blue mt-2">
							Nashville Bred • Memphis Approved • Tennessee Tradition
						</p>
					</div>
				</div>
				<p class="text-sm leading-relaxed text-white/60">
					SmoQe Signals BBQ Food Truck is located in Nashville TN. Founded in 2012, over the
					years our business has expanded to cater for special events and gatherings, growing
					the reputation of our tender pulled pork, veggie pulled pork, and some of the best
					brisket in Nashville.
				</p>
			</div>

			<div class="flex flex-col gap-8">
				<h3 class="font-header text-xl uppercase tracking-wider text-white">Quick Links</h3>
				<ul class="space-y-4 text-sm font-medium">
					<li><a href="/" class="transition-colors hover:text-bbq-orange">Home</a></li>
					<li><a href="/about-us" class="transition-colors hover:text-bbq-orange">About</a></li>
					<li><a href="/food-truck-menu" class="transition-colors hover:text-bbq-orange">Menu</a></li>
					<li><a href="/catering" class="transition-colors hover:text-bbq-orange">Catering</a></li>
					<li><a href="/contact-us" class="transition-colors hover:text-bbq-orange">Contact</a></li>
				</ul>
			</div>

			<div class="flex flex-col gap-8">
				<h3 class="font-header text-xl uppercase tracking-wider text-white">Contact Us</h3>
				<ul class="space-y-5 text-sm">
					<li class="flex items-start gap-4">
						<span class="font-accent text-bbq-blue">PIN</span>
						<span class="text-white/70">PO Box 9112<br />Nashville, TN 37209</span>
					</li>
					<li class="flex items-center gap-4">
						<span class="font-accent text-bbq-blue">TEL</span>
						<a href="tel:6154294851" class="text-white/70 transition-colors hover:text-white">615-429-4851</a>
					</li>
					<li class="flex items-center gap-4">
						<span class="font-accent text-bbq-blue">MAIL</span>
						<a href="mailto:info@smoqesignals.com" class="text-white/70 transition-colors hover:text-white">
							info@smoqesignals.com
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="mx-auto mt-20 max-w-7xl border-t border-white/5 px-6 pt-8 text-center text-[10px] uppercase tracking-[0.2em] text-white/30">
			<p>©2026 SmoQe Signals BBQ. All Rights Reserved. | Site Designed by UrVoyce</p>
		</div>
	</footer>
</div>
