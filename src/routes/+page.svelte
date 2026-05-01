<script lang="ts">
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

<section class="relative isolate overflow-hidden bg-[#17110d] text-white">
	<div class="absolute inset-0 -z-10">
		<img
			src="/images/bipartisan-event-bbq-hero.jpg"
			alt="SmoQe Signals BBQ brisket, wings, and sides"
			class="h-full w-full object-cover opacity-68"
		/>
		<div class="absolute inset-0 bg-gradient-to-r from-[#120d0a] via-[#120d0a]/82 to-[#120d0a]/16"></div>
		<div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#17110d] to-transparent"></div>
	</div>

	<div class="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
		<div class="max-w-2xl">
			<h1 class="text-6xl font-black leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl">
				SmoQe Signals <span class="block text-[#e34b14]">BBQ</span>
			</h1>
			<div class="mt-7 h-1.5 w-28 rounded-full bg-[#69bde7]"></div>
			<p class="mt-7 max-w-xl text-2xl leading-tight text-white/92 sm:text-3xl">
				Nashville bred. Memphis approved. Tennessee tradition.
			</p>
			<div class="mt-10 flex flex-col gap-4 sm:flex-row">
				<a
					href="/catering"
					class="inline-flex min-h-14 items-center justify-center rounded-lg bg-[#d94712] px-7 text-base font-extrabold text-white shadow-xl shadow-black/25 transition hover:bg-[#b9360b]"
				>
					Request Catering
				</a>
				<a
					href="/food-truck-menu"
					class="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-[#69bde7] px-7 text-base font-extrabold text-white transition hover:bg-[#69bde7] hover:text-[#17110d]"
				>
					View Menu
				</a>
			</div>
		</div>

		<div class="hidden lg:block" aria-hidden="true"></div>
	</div>
</section>

<section class="bg-[#fffaf2] px-6 py-18">
	<div class="mx-auto max-w-7xl">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-4xl font-black tracking-normal text-[#302016] md:text-5xl">
				Real BBQ. Real Service.
			</h2>
			<div class="mx-auto mt-5 h-1 w-28 rounded-full bg-[#69bde7]"></div>
		</div>

		<div class="mt-14 grid gap-8 md:grid-cols-3">
			{#each proofPoints as point}
				<article class="border-[#dccfbd] px-6 text-center md:border-r md:last:border-r-0">
					<div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-[#d94712] text-white shadow-lg shadow-[#69bde7]/20 ring-2 ring-[#69bde7]/50">
						{#if point.icon === 'fire'}
							<svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 22c4 0 7-3 7-7 0-2.4-1.3-4.2-2.8-5.8-.7 2.2-2 3.2-3.5 3.8.8-3.1-.5-6-3.4-9C9 7.7 5 10.3 5 15c0 4 3 7 7 7Z" />
							</svg>
						{:else if point.icon === 'truck'}
							<svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M3 7h12v10H3z" />
								<path d="M15 10h3l3 3v4h-6z" />
								<path d="M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
							</svg>
						{:else}
							<svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="9" cy="10" r="5" />
								<path d="M17 3v18M19.5 3v7M14.5 3v7M14.5 10h5" />
							</svg>
						{/if}
					</div>
					<h3 class="text-2xl font-extrabold text-[#302016]">{point.title}</h3>
					<p class="mx-auto mt-3 max-w-xs text-base leading-7 text-[#5f5148]">{point.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="bg-white px-6 py-20">
	<div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.82fr_1fr]">
		<div class="relative">
			<div class="absolute -left-4 -top-4 h-full w-full rounded-lg border-4 border-[#69bde7]"></div>
			<img
				src="/images/shon-pitmaster-owner.png"
				alt="Shon, pitmaster and owner of SmoQe Signals BBQ"
				class="relative h-[620px] w-full rounded-lg object-cover object-top shadow-2xl shadow-[#302016]/20"
			/>
		</div>
		<div>
			<h2 class="text-4xl font-black tracking-normal text-[#302016] md:text-5xl">
				Meet Shon, the pitmaster behind the smoke.
			</h2>
			<div class="mt-5 h-1.5 w-28 rounded-full bg-[#69bde7]"></div>
			<p class="mt-6 text-lg leading-8 text-[#5f5148]">
				SmoQe Signals is built around hospitality, patience, and West Tennessee BBQ roots.
				Shon brings that standard to the truck, the pit, and every catered table.
			</p>
			<p class="mt-5 text-lg leading-8 text-[#5f5148]">
				The menu stays grounded in the classics: smoke-kissed meats, sturdy sides, and food
				that makes an event feel personal instead of packaged.
			</p>
			<a
				href="/about-us"
				class="mt-9 inline-flex min-h-13 items-center justify-center rounded-lg border-2 border-[#69bde7] px-7 font-extrabold text-[#1b1511] transition hover:bg-[#69bde7]"
			>
				About the Story
			</a>
		</div>
	</div>
</section>

<section class="bg-[#1b1511] px-6 py-20 text-white">
	<div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
		<div>
			<h2 class="max-w-3xl text-4xl font-black tracking-normal md:text-6xl">
				BBQ worth following.
			</h2>
			<p class="mt-6 max-w-2xl text-lg leading-8 text-white/78">
				From a food truck lunch rush to full-service catering, SmoQe Signals brings brisket,
				pulled pork, wings, and homestyle sides with the kind of smoke that makes the line
				move slower for the right reason.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				{#each menuHighlights as item}
					<span class="rounded-lg border border-[#69bde7]/45 bg-white/8 px-4 py-2 text-sm font-bold text-white/90">
						{item}
					</span>
				{/each}
			</div>
			<a
				href="/catering"
				class="mt-10 inline-flex min-h-13 items-center justify-center rounded-lg bg-[#d94712] px-7 font-extrabold text-white ring-2 ring-[#69bde7]/35 transition hover:bg-[#b9360b]"
			>
				Plan an Event
			</a>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			<img src="/images/plates2.png" alt="BBQ plates with sides" class="h-72 w-full rounded-lg object-cover shadow-2xl shadow-black/30" />
			<img src="/images/smoker.png" alt="BBQ smoker" class="h-72 w-full rounded-lg object-cover shadow-2xl shadow-black/30 sm:mt-12" />
		</div>
	</div>
</section>

<section class="bg-[#fffaf2] px-6 py-20">
	<div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
		<img
			src="/images/food-truck-copy.png"
			alt="SmoQe Signals BBQ food truck"
			class="h-[420px] w-full rounded-lg object-cover shadow-xl shadow-[#302016]/12"
		/>
		<div>
			<h2 class="text-4xl font-black tracking-normal text-[#302016] md:text-5xl">
				Catering that feels like the main event.
			</h2>
			<p class="mt-6 text-lg leading-8 text-[#5f5148]">
				Tell us the date, guest count, and service style. We will help shape the menu around
				your crowd, setup, and timing so the food lands hot and the event feels easy.
			</p>
			<div class="mt-8 flex flex-col gap-4 sm:flex-row">
				<a
					href="/catering"
					class="inline-flex min-h-13 items-center justify-center rounded-lg bg-[#302016] px-7 font-extrabold text-white transition hover:bg-black hover:ring-2 hover:ring-[#69bde7]"
				>
					Start a Catering Request
				</a>
				<a
					href="/contact-us"
					class="inline-flex min-h-13 items-center justify-center rounded-lg border border-[#69bde7] px-7 font-extrabold text-[#302016] transition hover:bg-[#69bde7]"
				>
					Talk to Us
				</a>
			</div>
		</div>
	</div>
</section>

<section id="newsletter" class="bg-[#d94712] px-6 py-16">
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="mb-4 text-3xl font-black text-white">Join the Newsletter</h2>
		<p class="mb-6 text-white/90">Stay up to date with truck locations, pop-ups, and event dates.</p>
		<form onsubmit={subscribe} class="flex w-full flex-col gap-3 sm:flex-row">
			<input
				type="email"
				bind:value={email}
				required
				placeholder="Enter your email address..."
				class="min-h-14 flex-1 rounded-lg border-none px-5 text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#69bde7]"
			/>
			<button
				type="submit"
				disabled={status === 'loading'}
				class="min-h-14 rounded-lg bg-[#302016] px-7 font-extrabold text-white shadow-lg transition hover:bg-black disabled:opacity-70"
			>
				{status === 'loading' ? 'Joining...' : 'Subscribe'}
			</button>
		</form>
		{#if status === 'success'}
			<p class="mt-4 font-bold text-white">{message}</p>
		{:else if status === 'error'}
			<p class="mt-4 font-bold text-white">{message}</p>
		{/if}
	</div>
</section>
