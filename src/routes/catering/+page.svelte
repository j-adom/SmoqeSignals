<script lang="ts">
	type MenuItem = {
		name: string;
		description: string;
		price: string;
	};

	type RequestForm = {
		name: string;
		email: string;
		phone: string;
		eventDate: string;
		guestCount: string;
		serviceStyle: string;
		packageName: string;
		notes: string;
	};

	const meats: MenuItem[] = [
		{
			name: 'Brisket',
			description: 'Sliced or chopped, hickory-smoked to juicy perfection.',
			price: '$18/lb'
		},
		{
			name: 'Pulled Pork',
			description: 'Smoky, tender, and hand-pulled for classic Tennessee plates.',
			price: '$16/lb'
		},
		{
			name: 'Smoked Wings',
			description: 'Crisp outside, juicy inside, tossed in your choice of sauce.',
			price: '$16/lb'
		},
		{
			name: 'Smoked Turkey',
			description: 'Tender, lightly seasoned slices for a lighter BBQ spread.',
			price: '$17/lb'
		},
		{
			name: 'BBQ Sausage',
			description: 'Smoked links with a savory kick.',
			price: '$14/lb'
		}
	];

	const sides: MenuItem[] = [
		{ name: 'Baked Beans', description: 'Slow-cooked and smoky.', price: '$4/pint' },
		{ name: 'Creamy Coleslaw', description: 'Cool, crisp, and tangy.', price: '$4/pint' },
		{ name: 'Mac & Cheese', description: 'Rich, creamy, and event-ready.', price: '$5/pint' },
		{ name: 'Potato Salad', description: 'Classic cookout style.', price: '$4/pint' },
		{ name: 'Collard Greens', description: 'Southern greens with deep flavor.', price: '$4/pint' },
		{ name: 'Cornbread', description: 'Sweet, sturdy, and made for BBQ plates.', price: '$3/each' }
	];

	const packages = [
		'Food truck service',
		'Drop-off buffet',
		'Full-service catering',
		'Corporate lunch',
		'Wedding or private event'
	];

	let submitted = $state(false);
	let form = $state<RequestForm>({
		name: '',
		email: '',
		phone: '',
		eventDate: '',
		guestCount: '',
		serviceStyle: '',
		packageName: '',
		notes: ''
	});

	function submitRequest(e: Event) {
		e.preventDefault();
		submitted = true;
	}

	function resetForm() {
		submitted = false;
		form = {
			name: '',
			email: '',
			phone: '',
			eventDate: '',
			guestCount: '',
			serviceStyle: '',
			packageName: '',
			notes: ''
		};
	}
</script>

<svelte:head>
	<title>Catering Menu & Request | SmoQe Signals BBQ</title>
	<meta
		name="description"
		content="Review SmoQe Signals BBQ catering meats, sides, service styles, and send a catering request for your Nashville event."
	/>
</svelte:head>

<section class="bg-[#fffaf2] px-6 py-16 md:py-20">
	<div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
		<div>
			<h1 class="text-5xl font-black tracking-normal text-[#302016] md:text-6xl">Catering</h1>
			<div class="mt-5 h-1.5 w-24 rounded-full bg-[#69bde7]"></div>
			<p class="mt-5 max-w-xl text-lg leading-8 text-[#5f5148]">
				Great BBQ for any occasion. Review the menu, tell us about your event, and we will
				follow up to confirm availability and build the right spread.
			</p>

			<div class="mt-9 border-t border-[#dccfbd] pt-8">
				<h2 class="text-2xl font-black text-[#d94712]">Meats</h2>
				<div class="mt-5 divide-y divide-[#e2d6c7]">
					{#each meats as item}
						<div class="grid grid-cols-[1fr_auto] gap-6 py-4">
							<div>
								<h3 class="text-lg font-extrabold text-[#1d1510]">{item.name}</h3>
								<p class="mt-1 max-w-md text-sm leading-6 text-[#5f5148]">{item.description}</p>
							</div>
							<p class="pt-1 text-base font-extrabold text-[#1d1510]">{item.price}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="mt-8 border-t border-[#dccfbd] pt-8">
				<h2 class="text-2xl font-black text-[#d94712]">Sides</h2>
				<div class="mt-5 divide-y divide-[#e2d6c7]">
					{#each sides as item}
						<div class="grid grid-cols-[1fr_auto] gap-6 py-3">
							<div>
								<h3 class="text-base font-extrabold text-[#1d1510]">{item.name}</h3>
								<p class="mt-1 text-sm leading-6 text-[#5f5148]">{item.description}</p>
							</div>
							<p class="pt-1 text-sm font-extrabold text-[#1d1510]">{item.price}</p>
						</div>
					{/each}
				</div>
			</div>

			<p class="mt-8 border-t border-[#dccfbd] pt-6 text-sm leading-6 text-[#5f5148]">
				Full-service setup, chafing dishes, utensils, and disposables are available upon request.
				Final menu and pricing are confirmed after we review your event details.
			</p>
		</div>

		<div class="border-l-0 border-[#69bde7]/50 lg:border-l lg:pl-12">
			<div class="sticky top-28">
				<h2 class="text-3xl font-black text-[#d94712]">Request Catering</h2>

				{#if submitted}
					<div class="mt-8 rounded-lg border border-[#dccfbd] bg-white p-8 shadow-xl shadow-[#302016]/8">
						<h3 class="text-2xl font-black text-[#302016]">Request received</h3>
						<p class="mt-4 text-base leading-7 text-[#5f5148]">
							Thanks, {form.name}. We have the details for a {form.serviceStyle || 'catering'}
							request{form.eventDate ? ` on ${form.eventDate}` : ''}. The next step is confirming
							availability and dialing in the menu.
						</p>
						<div class="mt-6 rounded-lg bg-[#fffaf2] p-5 text-sm leading-6 text-[#5f5148]">
							<p><strong class="text-[#302016]">Email:</strong> {form.email}</p>
							<p><strong class="text-[#302016]">Phone:</strong> {form.phone}</p>
							<p><strong class="text-[#302016]">Guests:</strong> {form.guestCount || 'Not specified'}</p>
							<p><strong class="text-[#302016]">Package:</strong> {form.packageName || 'Not selected yet'}</p>
						</div>
						<div class="mt-7 flex flex-col gap-3 sm:flex-row">
							<a
								href="mailto:info@smoqesignals.com"
								class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#d94712] px-5 font-extrabold text-white transition hover:bg-[#b9360b]"
							>
								Email Follow-up
							</a>
							<button
								type="button"
								onclick={resetForm}
								class="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#69bde7] px-5 font-extrabold text-[#302016] transition hover:bg-[#69bde7]"
							>
								Start Another Request
							</button>
						</div>
					</div>
				{:else}
					<form onsubmit={submitRequest} class="mt-6 space-y-5">
						<div>
							<label for="name" class="mb-2 block text-sm font-extrabold text-[#1d1510]">Contact name</label>
							<input
								id="name"
								bind:value={form.name}
								required
								class="min-h-12 w-full rounded-lg border border-[#d2c7b8] bg-white px-4 text-base text-[#1d1510] outline-none transition focus:border-[#69bde7] focus:ring-2 focus:ring-[#69bde7]/30"
								placeholder="Your name"
							/>
						</div>

						<div>
							<label for="email" class="mb-2 block text-sm font-extrabold text-[#1d1510]">Email</label>
							<input
								id="email"
								type="email"
								bind:value={form.email}
								required
								class="min-h-12 w-full rounded-lg border border-[#d2c7b8] bg-white px-4 text-base text-[#1d1510] outline-none transition focus:border-[#69bde7] focus:ring-2 focus:ring-[#69bde7]/30"
								placeholder="you@example.com"
							/>
						</div>

						<div>
							<label for="phone" class="mb-2 block text-sm font-extrabold text-[#1d1510]">Phone</label>
							<input
								id="phone"
								type="tel"
								bind:value={form.phone}
								required
								class="min-h-12 w-full rounded-lg border border-[#d2c7b8] bg-white px-4 text-base text-[#1d1510] outline-none transition focus:border-[#69bde7] focus:ring-2 focus:ring-[#69bde7]/30"
								placeholder="(615) 555-1234"
							/>
						</div>

						<div class="grid gap-5 sm:grid-cols-2">
							<div>
								<label for="event-date" class="mb-2 block text-sm font-extrabold text-[#1d1510]">Event date</label>
								<input
									id="event-date"
									type="date"
									bind:value={form.eventDate}
									class="min-h-12 w-full rounded-lg border border-[#d2c7b8] bg-white px-4 text-base text-[#1d1510] outline-none transition focus:border-[#69bde7] focus:ring-2 focus:ring-[#69bde7]/30"
								/>
							</div>
							<div>
								<label for="guest-count" class="mb-2 block text-sm font-extrabold text-[#1d1510]">Guest count</label>
								<input
									id="guest-count"
									inputmode="numeric"
									bind:value={form.guestCount}
									class="min-h-12 w-full rounded-lg border border-[#d2c7b8] bg-white px-4 text-base text-[#1d1510] outline-none transition focus:border-[#69bde7] focus:ring-2 focus:ring-[#69bde7]/30"
									placeholder="e.g. 50"
								/>
							</div>
						</div>

						<div>
							<label for="service-style" class="mb-2 block text-sm font-extrabold text-[#1d1510]">Service style</label>
							<select
								id="service-style"
								bind:value={form.serviceStyle}
								required
								class="min-h-12 w-full rounded-lg border border-[#d2c7b8] bg-white px-4 text-base text-[#1d1510] outline-none transition focus:border-[#69bde7] focus:ring-2 focus:ring-[#69bde7]/30"
							>
								<option value="">Select service style</option>
								<option>Food truck on site</option>
								<option>Drop-off buffet</option>
								<option>Full-service buffet</option>
								<option>Not sure yet</option>
							</select>
						</div>

						<fieldset>
							<legend class="mb-3 block text-sm font-extrabold text-[#1d1510]">Selected package</legend>
							<div class="grid gap-2 sm:grid-cols-2">
								{#each packages as packageName}
									<label class="flex min-h-11 cursor-pointer items-center rounded-lg border border-[#d2c7b8] bg-white px-3 text-sm font-bold text-[#302016] transition has-[:checked]:border-[#69bde7] has-[:checked]:bg-[#e8f7fd]">
										<input
											type="radio"
											name="package"
											bind:group={form.packageName}
											value={packageName}
											class="mr-2 accent-[#69bde7]"
										/>
										{packageName}
									</label>
								{/each}
							</div>
						</fieldset>

						<div>
							<label for="notes" class="mb-2 block text-sm font-extrabold text-[#1d1510]">Notes</label>
							<textarea
								id="notes"
								bind:value={form.notes}
								rows="5"
								class="w-full rounded-lg border border-[#d2c7b8] bg-white px-4 py-3 text-base text-[#1d1510] outline-none transition focus:border-[#69bde7] focus:ring-2 focus:ring-[#69bde7]/30"
								placeholder="Tell us about your event, location, setup needs, dietary restrictions, etc."
							></textarea>
						</div>

						<div class="border-t border-[#dccfbd] pt-6">
							<h3 class="text-xl font-black text-[#302016]">Ready to get started?</h3>
							<p class="mt-2 text-sm leading-6 text-[#5f5148]">
								We will confirm availability and follow up to customize the perfect menu for your event.
							</p>
							<button
								type="submit"
								class="mt-6 min-h-14 w-full rounded-lg bg-[#d94712] px-6 text-lg font-black text-white shadow-xl shadow-[#69bde7]/25 transition hover:bg-[#b9360b]"
							>
								Send Catering Request
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>
