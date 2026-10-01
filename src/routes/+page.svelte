<script lang="ts">
	import InstagramCarousel from '$lib/components/InstagramCarousel.svelte';

	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let message = $state('');

	const proofPoints = [
		{
			icon: 'fire',
			title: 'Pit-smoked plates',
			text: 'Low and slow hickory smoke for pulled pork, brisket, wings, and classic sides.'
		},
		{
			icon: 'truck',
			title: 'Food truck service',
			text: 'We bring smoky Nashville BBQ to streets, offices, neighborhoods, and festivals.'
		},
		{
			icon: 'fork',
			title: 'Event catering',
			text: 'Buffets and truck service for private parties, weddings, team meals, and corporate events.'
		}
	];

	const menuHighlights = ['Pulled pork', 'Beef brisket', 'Smoked wings', 'Mac & cheese'];

	async function subscribe(e: Event) {
		e.preventDefault();
		status = 'loading';
		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const data = await res.json();
			if (res.ok) {
				status = 'success';
				message = data.message || 'Thanks for subscribing!';
				email = '';
			} else {
				status = 'error';
				message = data.error || 'Failed to subscribe.';
			}
		} catch (e) {
			status = 'error';
			message = 'An unexpected error occurred.';
		}
	}
</script>

<svelte:head>
	<title>SmoQe Signals BBQ | Nashville Bred, Memphis Approved</title>
	<meta
		name="description"
		content="SmoQe Signals BBQ serves Nashville food truck favorites and event catering rooted in West Tennessee BBQ tradition."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative isolate overflow-hidden bg-bbq-darker text-white">
	<div class="absolute inset-0 -z-10">
		<img
			src="/images/bipartisan-event-bbq-hero.jpg"
			alt="SmoQe Signals BBQ brisket, wings, and sides"
			class="h-full w-full object-cover opacity-40 transition-all duration-1000"
		/>
		<div class="absolute inset-0 bg-gradient-to-r from-bbq-darker via-bbq-darker/90 to-bbq-darker/30"></div>
		<div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bbq-darker to-transparent"></div>
	</div>

	<div class="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
		<div class="max-w-2xl relative z-10">
			<div class="mb-8 flex items-center gap-6">
				<img src="/smoqe-q-logo.png" alt="SmoQe Q Logo" class="h-24 w-24 drop-shadow-[0_0_20px_rgba(227,75,20,0.5)]" />
				<div class="h-20 w-px bg-white/20"></div>
				<div class="flex flex-col">
					<span class="font-accent text-xl tracking-[0.4em] uppercase text-bbq-blue">Est. 2012</span>
					<div class="h-1 w-12 bg-bbq-orange mt-2 rounded-full"></div>
				</div>
			</div>

			<h1 class="font-header text-7xl leading-none tracking-tight text-white sm:text-8xl lg:text-9xl drop-shadow-2xl">
				SmoQe Signals <span class="block text-bbq-orange drop-shadow-[0_0_25px_rgba(227,75,20,0.4)]">BBQ</span>
			</h1>
			
			<!-- Stylized Tagline -->
			<div class="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
				<div class="flex flex-col">
					<span class="font-accent text-[10px] tracking-[0.3em] uppercase text-bbq-blue">Nashville</span>
					<span class="font-header text-4xl text-white uppercase tracking-wider drop-shadow-md">Bred</span>
				</div>
				<div class="hidden h-12 w-px bg-white/10 sm:block"></div>
				<div class="flex flex-col">
					<span class="font-accent text-[10px] tracking-[0.3em] uppercase text-bbq-blue">Memphis</span>
					<span class="font-header text-4xl text-white uppercase tracking-wider drop-shadow-md">Approved</span>
				</div>
				<div class="hidden h-12 w-px bg-white/10 sm:block"></div>
				<div class="flex flex-col">
					<span class="font-accent text-[10px] tracking-[0.3em] uppercase text-bbq-blue">Tennessee</span>
					<span class="font-header text-4xl text-bbq-orange uppercase tracking-wider italic drop-shadow-md">Tradition</span>
				</div>
			</div>

			<div class="mt-16 flex flex-col gap-5 sm:flex-row">
				<a
					href="/catering"
					class="inline-flex min-h-16 items-center justify-center rounded-xl bg-bbq-orange px-10 text-lg font-black uppercase tracking-widest text-white shadow-2xl shadow-bbq-orange/20 transition-all hover:scale-105 hover:bg-bbq-orange-dark active:scale-95"
				>
					Request Catering
				</a>
				<a
					href="/food-truck-menu"
					class="inline-flex min-h-16 items-center justify-center rounded-xl border-2 border-bbq-blue px-10 text-lg font-black uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-bbq-blue hover:text-bbq-darker active:scale-95"
				>
					View Menu
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="bg-bbq-darker px-6 py-32 border-t border-white/5">
	<div class="mx-auto max-w-7xl">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="font-header text-5xl tracking-wide text-white md:text-7xl">
				Real BBQ. <span class="text-bbq-blue">Real Service.</span>
			</h2>
			<div class="mx-auto mt-6 h-1.5 w-32 rounded-full bg-bbq-orange"></div>
		</div>

		<div class="mt-24 grid gap-16 md:grid-cols-3">
			{#each proofPoints as point}
				<article class="group relative px-6 text-center">
					<div class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-bbq-dark text-bbq-orange shadow-2xl ring-1 ring-white/10 transition-all group-hover:scale-110 group-hover:bg-bbq-orange group-hover:text-white">
						{#if point.icon === 'fire'}
							<svg viewBox="0 0 24 24" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 22c4 0 7-3 7-7 0-2.4-1.3-4.2-2.8-5.8-.7 2.2-2 3.2-3.5 3.8.8-3.1-.5-6-3.4-9C9 7.7 5 10.3 5 15c0 4 3 7 7 7Z" />
							</svg>
						{:else if point.icon === 'truck'}
							<svg viewBox="0 0 24 24" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M3 7h12v10H3z" />
								<path d="M15 10h3l3 3v4h-6z" />
								<path d="M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
							</svg>
						{:else}
							<svg viewBox="0 0 24 24" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="9" cy="10" r="5" />
								<path d="M17 3v18M19.5 3v7M14.5 3v7M14.5 10h5" />
							</svg>
						{/if}
					</div>
					<h3 class="font-header text-3xl text-white tracking-wider">{point.title}</h3>
					<p class="mx-auto mt-4 max-w-xs text-base leading-relaxed text-white/60">{point.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Pitmaster Section -->
<section class="bg-bbq-dark px-6 py-32 overflow-hidden">
	<div class="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
		<div class="relative group">
			<div class="absolute -inset-4 rounded-3xl border-2 border-bbq-blue/20 transition-all group-hover:border-bbq-blue/50"></div>
			<div class="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-bbq-orange/20 to-bbq-blue/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
			<img
				src="/images/shon-pitmaster-owner.png"
				alt="Shon, pitmaster and owner of SmoQe Signals BBQ"
				class="relative h-[650px] w-full rounded-2xl object-cover object-top shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
			/>
		</div>
		<div>
			<h2 class="font-header text-5xl tracking-wide text-white md:text-7xl">
				Meet Shon, <span class="text-bbq-orange">the pitmaster.</span>
			</h2>
			<div class="mt-8 h-1.5 w-32 rounded-full bg-bbq-blue"></div>
			<p class="mt-10 text-xl leading-relaxed text-white/70">
				SmoQe Signals is built around hospitality, patience, and West Tennessee BBQ roots.
				Shon brings that standard to the truck, the pit, and every catered table.
			</p>
			<p class="mt-6 text-xl leading-relaxed text-white/70 font-accent tracking-widest uppercase text-bbq-blue/60 italic">
				Nashville Bred • Memphis Approved • Tennessee Tradition
			</p>
			<p class="mt-8 text-xl leading-relaxed text-white/70">
				The menu stays grounded in the classics: smoke-kissed meats, sturdy sides, and food
				that makes an event feel personal instead of packaged.
			</p>
			<a
				href="/about-us"
				class="mt-12 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-bbq-blue px-10 font-bold uppercase tracking-widest text-white transition-all hover:bg-bbq-blue hover:text-bbq-darker active:scale-95"
			>
				About the Story
			</a>
		</div>
	</div>
</section>

<!-- Highlight Section -->
<section class="bg-bbq-darker px-6 py-32 text-white relative isolate overflow-hidden">
	<div class="absolute inset-0 -z-10 opacity-20">
		<div class="absolute top-0 left-0 w-96 h-96 bg-bbq-orange rounded-full blur-[150px]"></div>
		<div class="absolute bottom-0 right-0 w-96 h-96 bg-bbq-blue rounded-full blur-[150px]"></div>
	</div>

	<div class="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
		<div>
			<h2 class="font-header text-6xl tracking-tight md:text-8xl">
				BBQ worth <span class="text-bbq-orange italic">following.</span>
			</h2>
			<p class="mt-8 max-w-2xl text-xl leading-relaxed text-white/60">
				From a food truck lunch rush to full-service catering, SmoQe Signals brings brisket,
				pulled pork, wings, and homestyle sides with the kind of smoke that makes the line
				move slower for the right reason.
			</p>
			<div class="mt-10 flex flex-wrap gap-4">
				{#each menuHighlights as item}
					<span class="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-bold tracking-widest uppercase text-white/80 transition-colors hover:border-bbq-blue hover:text-bbq-blue">
						{item}
					</span>
				{/each}
			</div>
			<a
				href="/catering"
				class="mt-12 inline-flex min-h-14 items-center justify-center rounded-xl bg-bbq-orange px-10 font-black uppercase tracking-widest text-white shadow-xl shadow-bbq-orange/20 transition-all hover:scale-105 hover:bg-bbq-orange-dark active:scale-95"
			>
				Plan an Event
			</a>
		</div>

		<div class="grid gap-6 sm:grid-cols-2">
			<img src="/images/plates2.png" alt="BBQ plates with sides" class="h-80 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 transition-transform duration-500 hover:rotate-2 hover:scale-105" />
			<img src="/images/smoker.png" alt="BBQ smoker" class="h-80 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 sm:mt-16 transition-transform duration-500 hover:-rotate-2 hover:scale-105" />
		</div>
	</div>
</section>

<InstagramCarousel />

<!-- Catering CTA -->
<section class="bg-bbq-dark px-6 py-32 border-y border-white/5">
	<div class="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-[1fr_1.1fr]">
		<div class="relative group">
			<img
				src="/images/food_truck_bbq.png"
				alt="SmoQe Signals BBQ food truck"
				class="h-[500px] w-full rounded-2xl object-cover shadow-2xl transition-all group-hover:scale-[1.01]"
			/>
			<div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-bbq-darker/80 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
				<p class="font-accent text-2xl text-white tracking-widest uppercase">Catch us on the streets</p>
			</div>
		</div>
		<div>
			<h2 class="font-header text-5xl tracking-wide text-white md:text-7xl">
				Catering that feels like <span class="text-bbq-blue underline decoration-bbq-orange underline-offset-8">the main event.</span>
			</h2>
			<p class="mt-10 text-xl leading-relaxed text-white/70">
				Tell us the date, guest count, and service style. We will help shape the menu around
				your crowd, setup, and timing so the food lands hot and the event feels easy.
			</p>
			<div class="mt-12 flex flex-col gap-5 sm:flex-row">
				<a
					href="/catering"
					class="inline-flex min-h-14 items-center justify-center rounded-xl bg-white px-10 font-black uppercase tracking-widest text-bbq-darker transition-all hover:scale-105 hover:bg-bbq-blue hover:text-white active:scale-95"
				>
					Start a Request
				</a>
				<a
					href="/contact-us"
					class="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/20 px-10 font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95"
				>
					Talk to Us
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Newsletter Section -->
<section id="newsletter" class="bg-bbq-orange px-6 py-24 relative overflow-hidden">
	<div class="absolute inset-0 opacity-10 pointer-events-none">
		<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="2"/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	</div>

	<div class="mx-auto max-w-3xl text-center relative z-10">
		<h2 class="mb-6 font-header text-5xl text-white md:text-7xl tracking-wide">Join the Newsletter</h2>
		<p class="mb-10 text-xl text-white/90 font-medium">Stay up to date with truck locations, pop-ups, and event dates.</p>
		<form onsubmit={subscribe} class="flex w-full flex-col gap-4 sm:flex-row">
			<input
				type="email"
				bind:value={email}
				required
				placeholder="Enter your email address..."
				class="min-h-16 flex-1 rounded-xl border-none bg-white px-8 text-lg text-bbq-darker placeholder:text-bbq-darker/40 shadow-2xl focus:outline-none focus:ring-4 focus:ring-bbq-darker/20"
			/>
			<button
				type="submit"
				disabled={status === 'loading'}
				class="min-h-16 rounded-xl bg-bbq-darker px-10 font-black uppercase tracking-widest text-white shadow-2xl transition-all hover:scale-105 hover:bg-black disabled:opacity-70 active:scale-95"
			>
				{status === 'loading' ? 'Joining...' : 'Subscribe'}
			</button>
		</form>
		{#if status === 'success'}
			<p class="mt-6 font-bold text-white text-lg bg-black/20 py-2 rounded-lg">{message}</p>
		{:else if status === 'error'}
			<p class="mt-6 font-bold text-white text-lg bg-black/20 py-2 rounded-lg">{message}</p>
		{/if}
	</div>
</section>
