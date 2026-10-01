<script lang="ts">
	const posts = [
		{ id: 1, image: '/images/plates2.png', alt: 'Delicious BBQ plates' },
		{ id: 2, image: '/images/smoker.png', alt: 'Our signature smoker' },
		{ id: 3, image: '/images/shon-pitmaster-owner.png', alt: 'Shon at work' },
		{ id: 4, image: '/images/food-truck-copy.png', alt: 'SmoQe Signals Food Truck' },
		{ id: 5, image: '/images/bipartisan-event-bbq-hero.jpg', alt: 'Catering event' }
	];

	const handle = '@smoqesignalsbbq';
</script>

<section class="bg-bbq-dark py-24 overflow-hidden border-t border-white/5">
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
			<div>
				<h2 class="font-header text-5xl md:text-7xl text-white tracking-wide uppercase">On the <span class="text-bbq-blue italic">Gram</span></h2>
				<div class="mt-4 h-1 w-24 bg-bbq-orange rounded-full"></div>
			</div>
			<div class="flex flex-col items-start md:items-end">
				<span class="font-accent text-bbq-blue tracking-[0.3em] uppercase text-xs mb-2">Follow the smoke</span>
				<a 
					href="https://instagram.com/smoqesignalsbbq" 
					target="_blank" 
					rel="noopener noreferrer"
					class="font-header text-3xl text-white hover:text-bbq-orange transition-colors tracking-widest uppercase italic"
				>
					{handle}
				</a>
			</div>
		</div>
	</div>

	<!-- Carousel Container -->
	<div class="relative group">
		<!-- Fade Overlays -->
		<div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bbq-dark to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
		<div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bbq-dark to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

		<div 
			class="flex gap-6 overflow-x-auto pb-12 px-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
			style="scrollbar-width: none; -ms-overflow-style: none;"
		>
			{#each posts as post}
				<a 
					href="https://instagram.com/smoqesignalsbbq" 
					target="_blank" 
					rel="noopener noreferrer"
					class="flex-none w-[300px] md:w-[400px] aspect-square relative rounded-2xl overflow-hidden snap-center group/post shadow-2xl ring-1 ring-white/10"
				>
					<img 
						src={post.image} 
						alt={post.alt} 
						class="absolute inset-0 w-full h-full object-cover grayscale group-hover/post:grayscale-0 group-hover/post:scale-110 transition-all duration-700"
					/>
					<div class="absolute inset-0 bg-bbq-orange/20 opacity-0 group-hover/post:opacity-100 transition-opacity flex items-center justify-center">
						<svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
