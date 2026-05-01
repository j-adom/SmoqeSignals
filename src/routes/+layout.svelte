<script lang="ts">
	import './layout.css';

	let mobileMenuOpen = $state(false);

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<div class="flex min-h-screen flex-col bg-[#fffaf2] font-sans text-[#302016]">
	<header class="sticky top-0 z-50 border-b border-[#eadfce] bg-white/95 shadow-sm backdrop-blur">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-4" onclick={closeMobileMenu}>
				<span class="text-2xl font-black uppercase tracking-normal text-[#d94712]">
					SmoQe Signals BBQ
				</span>
			</a>

			<nav class="hidden items-center gap-8 text-sm font-extrabold md:flex">
				<a href="/" class="transition-colors hover:text-[#69bde7]">Home</a>
				<a href="/about-us" class="transition-colors hover:text-[#69bde7]">About</a>
				<a href="/food-truck-menu" class="transition-colors hover:text-[#69bde7]">Menu</a>
				<div class="group relative">
					<a href="/catering" class="flex items-center gap-1 transition-colors hover:text-[#69bde7]">
						Catering
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
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
					</a>
					<div
						class="absolute left-0 mt-2 hidden w-56 flex-col rounded-lg border border-[#eadfce] bg-white shadow-xl group-hover:flex"
					>
						<a href="/catering-faqs" class="px-4 py-3 transition-colors hover:bg-[#69bde7] hover:text-[#1b1511]">
							Catering FAQs
						</a>
						<a
							href="/catering-requirments"
							class="px-4 py-3 transition-colors hover:bg-[#69bde7] hover:text-[#1b1511]"
						>
							Catering Requirements
						</a>
					</div>
				</div>
				<a href="/contact-us" class="transition-colors hover:text-[#69bde7]">Contact</a>
			</nav>

			<button
				class="rounded-lg p-2 text-[#302016] hover:bg-[#e8f7fd] hover:text-[#2179a7] md:hidden"
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
			<nav id="mobile-menu" class="border-t border-[#eadfce] bg-white px-6 py-4 md:hidden">
				<div class="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-extrabold">
					<a href="/" onclick={closeMobileMenu} class="py-2 hover:text-[#2179a7]">Home</a>
					<a href="/about-us" onclick={closeMobileMenu} class="py-2 hover:text-[#2179a7]">About</a>
					<a href="/food-truck-menu" onclick={closeMobileMenu} class="py-2 hover:text-[#2179a7]">Menu</a>
					<a href="/catering" onclick={closeMobileMenu} class="py-2 hover:text-[#2179a7]">Catering</a>
					<a href="/catering-faqs" onclick={closeMobileMenu} class="py-2 hover:text-[#2179a7]">
						Catering FAQs
					</a>
					<a
						href="/catering-requirments"
						onclick={closeMobileMenu}
						class="py-2 hover:text-[#2179a7]"
					>
						Catering Requirements
					</a>
					<a href="/contact-us" onclick={closeMobileMenu} class="py-2 hover:text-[#2179a7]">Contact</a>
				</div>
			</nav>
		{/if}
	</header>

	<main class="flex-1">
		<slot />
	</main>

	<footer class="border-t-4 border-[#69bde7] bg-[#1b1511] pt-16 pb-8 text-[#d8cfc4]">
		<div class="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3">
			<div class="flex flex-col gap-6">
				<h3 class="text-2xl font-black uppercase text-white">SmoQe Signals BBQ</h3>
				<p class="text-sm leading-relaxed">
					SmoQe Signals BBQ Food Truck is located in Nashville TN. Founded in 2012, over the
					years our business has expanded to cater for special events and gatherings, growing
					the reputation of our tender pulled pork, veggie pulled pork, and some of the best
					brisket in Nashville.
				</p>
			</div>

			<div class="flex flex-col gap-6">
				<h3 class="text-xl font-black uppercase text-white">Quick Links</h3>
				<ul class="space-y-3 text-sm">
					<li><a href="/" class="transition-colors hover:text-[#69bde7]">Home</a></li>
					<li><a href="/about-us" class="transition-colors hover:text-[#69bde7]">About</a></li>
					<li><a href="/food-truck-menu" class="transition-colors hover:text-[#69bde7]">Menu</a></li>
					<li><a href="/catering" class="transition-colors hover:text-[#69bde7]">Catering</a></li>
					<li><a href="/contact-us" class="transition-colors hover:text-[#69bde7]">Contact</a></li>
				</ul>
			</div>

			<div class="flex flex-col gap-6">
				<h3 class="text-xl font-black uppercase text-white">Contact Us</h3>
				<ul class="space-y-4 text-sm">
					<li class="flex items-start gap-4">
						<span class="w-10 font-black text-[#69bde7]">PIN</span>
						<span>PO Box 9112<br />Nashville, TN 37209</span>
					</li>
					<li class="flex items-center gap-4">
						<span class="w-10 font-black text-[#69bde7]">TEL</span>
						<a href="tel:6154294851" class="transition-colors hover:text-white">615-429-4851</a>
					</li>
					<li class="flex items-center gap-4">
						<span class="w-10 font-black text-[#69bde7]">MAIL</span>
						<a href="mailto:info@smoqesignals.com" class="transition-colors hover:text-white">
							info@smoqesignals.com
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="mx-auto mt-16 max-w-7xl border-t border-white/12 px-6 pt-6 text-center text-xs tracking-wide">
			<p>©2026 SmoQe Signals BBQ. All Rights Reserved. | Site Designed by UrVoyce</p>
		</div>
	</footer>
</div>
