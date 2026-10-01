<script lang="ts">
	type MenuItem = {
		name: string;
		description?: string;
	};

	type Package = {
		name: string;
		includes: string[];
		choices: { label: string; items: string[] }[];
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
		{ name: 'Pulled Pork Sandwich/Pound' },
		{ name: 'Brisket Sandwich/Pound' },
		{ name: 'Chopped Chicken Sandwich/Pound' },
		{ name: 'Veggie Pulled Pork LB Sandwich/Pound' },
		{ name: 'Pork Ribs Half Rack/Full Rack' },
		{ name: 'Pork Rib Tips By The Pound' },
		{ name: 'Turkey Tips By The Pound' },
		{ name: 'Smoked Sliced Turkey/Pound' },
		{ name: 'Smoked Wings' },
		{ name: 'Beef Sausage Links' },
		{ name: 'Whole Hog/Call For Inquiries' }
	];

	const sides: MenuItem[] = [
		{ name: 'BBQ Baked Beans' },
		{ name: 'Cole Slaw' },
		{ name: 'Potato Salad' },
		{ name: 'Green Beans' },
		{ name: 'Mac & Cheese' }
	];

	const extras: MenuItem[] = [
		{ name: 'BBQ Sauce' },
		{ name: 'Buns' },
		{ name: 'Paper Goods' },
		{ name: 'Chafing Dishes' },
		{ name: 'Set Up' },
		{ name: 'Cups' },
		{ name: 'Ice' }
	];

	const cateringPackages: Package[] = [
		{
			name: 'Meat and 3 Package',
			includes: ['Plates', 'Napkins', 'Buns', 'Utensils', 'Sauces', 'Cups', 'Sweet Tea', 'Unsweet Tea', 'Lemonade', 'Ice', 'Corn Muffins', 'Chafing Dishes', 'Set up'],
			choices: [
				{ label: 'Choice of 1 meat', items: ['Ribs', 'Smoked Chicken', 'Smoked Turkey', 'Pulled Pork'] },
				{ label: 'Choice of 3 sides', items: ['Mac & Cheese', 'BBQ Beans', 'Potato Salad', 'Coleslaw', 'Smoked Green Beans'] },
				{ label: 'Choice of 1 dessert', items: ['Banana Pudding', 'Seasonal Cobbler'] }
			]
		},
		{
			name: 'Lunch Package',
			includes: ['Plates', 'Napkins', 'Buns', 'Utensils', 'Sauces', 'Cups', 'Sweet Tea', 'Unsweet Tea', 'Lemonade', 'Ice', 'Corn Muffins', 'Chafing Dishes', 'Set up'],
			choices: [
				{ label: 'Choice of Salad', items: ['Caesar Salad', 'Garden Salad', 'Chefs seasonal salad'] },
				{ label: 'Choice of 2 Meats', items: ['Ribs', 'Smoked Chicken', 'Smoked Turkey', 'Pulled Pork'] },
				{ label: 'Choice of 3 sides', items: ['Mac & Cheese', 'BBQ Beans', 'Potato Salad', 'Coleslaw', 'Smoked Green Beans'] },
				{ label: 'Choice of 1 dessert', items: ['Banana Pudding', 'Seasonal Cobbler'] }
			]
		},
		{
			name: 'Dinner Package',
			includes: ['Plates', 'Napkins', 'Buns', 'Utensils', 'Sauces', 'Cups', 'Sweet Tea', 'Unsweet Tea', 'Lemonade', 'Ice', 'Corn Muffins', 'Chafing Dishes', 'Set up'],
			choices: [
				{ label: 'Choice of Salad', items: ['Caesar Salad', 'Garden Salad', 'Chefs seasonal salad'] },
				{ label: 'Choice of Appetizer', items: ['Smoked Wings', 'Cowboy Caviar'] },
				{ label: 'Choice of 2 Meats', items: ['Ribs', 'Smoked Chicken', 'Smoked Turkey', 'Pulled Pork'] },
				{ label: 'Choice of 3 sides', items: ['Mac & Cheese', 'BBQ Beans', 'Potato Salad', 'Coleslaw', 'Smoked Green Beans'] },
				{ label: 'Choice of 2 desserts', items: ['Banana Pudding', 'Seasonal Cobbler'] }
			]
		}
	];

	const tailgatePackages = [
		{
			name: 'Smoked Wings',
			description: 'Alabama White, Sweet James Jones, or Slims Shake-A-Plenty Spice Rub',
			options: ['25 wings', '50 wings', '100 wings']
		},
		{
			name: 'Whole Hog Package',
			description: 'Feeds 125-150 People. Call for inquiries.'
		}
	];

	const formPackages = [
		'Meat and 3 Package',
		'Lunch Package',
		'Dinner Package',
		'Smoked Wings Tailgate',
		'Whole Hog Package',
		'Custom/Not Sure'
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

<section class="bg-bbq-darker px-6 py-24 md:py-32">
	<div class="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[1.1fr_0.9fr]">
		<div>
			<h1 class="font-header text-7xl tracking-tight text-white md:text-8xl italic">
				Catering <span class="text-bbq-orange">Menu</span>
			</h1>
			<div class="mt-8 h-1.5 w-32 rounded-full bg-bbq-blue"></div>
			<p class="mt-10 max-w-xl text-xl leading-relaxed text-white/70 italic">
				"We offer 2 options: 1. Delivery Only 2. Set Up and Serve. We are delighted to assist in crafting tailor-made menus that align with your budget, preferences, and unique dietary requirements."
			</p>

			<!-- Meats -->
			<div class="mt-24 border-t border-white/10 pt-12">
				<h2 class="font-header text-5xl text-bbq-orange tracking-wider uppercase">Pit-Smoked Meats</h2>
				<div class="mt-8 space-y-1">
					{#each meats as item}
						<div class="group py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors rounded-xl px-4 -mx-4">
							<h3 class="font-accent text-2xl text-white group-hover:text-bbq-blue transition-colors uppercase tracking-widest">{item.name}</h3>
						</div>
					{/each}
				</div>
			</div>

			<!-- Sides -->
			<div class="mt-16 border-t border-white/10 pt-12">
				<h2 class="font-header text-5xl text-bbq-orange tracking-wider uppercase">Signature Sides</h2>
				<p class="mt-2 text-bbq-blue font-accent tracking-widest text-sm uppercase">Available in Pint, Quart, and Full Pan</p>
				<p class="mt-1 text-white/50 text-sm italic">All sides are vegetarian friendly unless specified</p>
				<div class="mt-8 space-y-1">
					{#each sides as item}
						<div class="group py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors rounded-xl px-4 -mx-4">
							<h3 class="font-accent text-xl text-white group-hover:text-bbq-blue transition-colors uppercase tracking-widest">{item.name}</h3>
						</div>
					{/each}
				</div>
			</div>

			<!-- Extras -->
			<div class="mt-16 border-t border-white/10 pt-12">
				<h2 class="font-header text-5xl text-bbq-orange tracking-wider uppercase">The Extras</h2>
				<div class="mt-8 grid grid-cols-2 gap-x-8 gap-y-1">
					{#each extras as item}
						<div class="group py-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors rounded-xl px-4 -mx-4">
							<h3 class="font-accent text-lg text-white/80 group-hover:text-bbq-blue transition-colors uppercase tracking-widest">{item.name}</h3>
						</div>
					{/each}
				</div>
			</div>

			<!-- Catering Packages -->
			<div class="mt-24 border-t border-white/10 pt-16">
				<h2 class="font-header text-6xl text-white tracking-tight uppercase italic mb-4 text-center lg:text-left">Catering <span class="text-bbq-orange">Packages</span></h2>
				<p class="mb-12 text-white/50 text-center lg:text-left font-accent tracking-widest uppercase">For 25 People or more | Buffet Style</p>
				
				<div class="space-y-16">
					{#each cateringPackages as pkg}
						<div class="bg-bbq-dark border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
							<div class="absolute top-0 right-0 w-32 h-32 bg-bbq-orange/10 rounded-full blur-3xl group-hover:bg-bbq-orange/20 transition-colors"></div>
							<h3 class="font-header text-4xl text-bbq-orange mb-6 uppercase tracking-wider">{pkg.name}</h3>
							
							<div class="grid gap-10 md:grid-cols-2">
								<div>
									<h4 class="font-accent text-bbq-blue text-xs tracking-[0.2em] uppercase mb-4">Includes:</h4>
									<p class="text-sm text-white/60 leading-relaxed uppercase tracking-wider">
										{pkg.includes.join(', ')}
									</p>
								</div>
								<div class="space-y-6">
									{#each pkg.choices as choice}
										<div>
											<h4 class="font-accent text-bbq-blue text-xs tracking-[0.2em] uppercase mb-2">{choice.label}:</h4>
											<p class="text-sm text-white leading-relaxed font-bold uppercase tracking-wider">
												{choice.items.join(', ')}
											</p>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Tailgate Packages -->
			<div class="mt-24 border-t border-white/10 pt-16">
				<h2 class="font-header text-6xl text-white tracking-tight uppercase italic mb-12 text-center lg:text-left">Tailgate <span class="text-bbq-orange">Packages</span></h2>
				<div class="grid gap-8 md:grid-cols-2">
					{#each tailgatePackages as pkg}
						<div class="bg-bbq-dark border border-white/10 rounded-3xl p-8 shadow-2xl group hover:border-bbq-blue/30 transition-colors">
							<h3 class="font-header text-3xl text-bbq-blue mb-4 uppercase tracking-widest">{pkg.name}</h3>
							<p class="text-white/70 mb-6 font-medium italic">{pkg.description}</p>
							{#if pkg.options}
								<div class="flex flex-wrap gap-3">
									{#each pkg.options as opt}
										<span class="bg-bbq-darker border border-white/5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-white/80">{opt}</span>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Request Form -->
		<div class="relative">
			<div class="sticky top-28">
				<div class="p-8 md:p-12 rounded-3xl bg-bbq-dark border border-white/10 shadow-2xl relative overflow-hidden">
					<!-- Background Accent -->
					<div class="absolute -top-24 -right-24 w-64 h-64 bg-bbq-orange rounded-full blur-[120px] opacity-10"></div>
					<div class="absolute -bottom-24 -left-24 w-64 h-64 bg-bbq-blue rounded-full blur-[120px] opacity-10"></div>

					<h2 class="font-header text-5xl text-white tracking-wide uppercase relative z-10">Request <span class="text-bbq-orange">Catering</span></h2>

					{#if submitted}
						<div class="mt-10 relative z-10">
							<div class="p-8 rounded-2xl bg-white/5 border border-bbq-blue/20">
								<h3 class="font-header text-3xl text-bbq-blue uppercase tracking-widest">Request received</h3>
								<p class="mt-6 text-lg leading-relaxed text-white/80">
									Thanks, <span class="text-white font-bold">{form.name}</span>. We have the details for your <span class="italic text-bbq-orange">{form.serviceStyle || 'catering'}</span> request.
								</p>
								<div class="mt-8 space-y-3 border-t border-white/10 pt-6">
									<div class="flex justify-between text-sm uppercase tracking-widest"><span class="text-white/40">Email</span><span class="text-white">{form.email}</span></div>
									<div class="flex justify-between text-sm uppercase tracking-widest"><span class="text-white/40">Phone</span><span class="text-white">{form.phone}</span></div>
									<div class="flex justify-between text-sm uppercase tracking-widest"><span class="text-white/40">Guests</span><span class="text-white">{form.guestCount || '---'}</span></div>
								</div>
							</div>
							<div class="mt-10 flex flex-col gap-4 sm:flex-row">
								<a
									href="mailto:info@smoqesignals.com"
									class="flex-1 inline-flex min-h-16 items-center justify-center rounded-xl bg-bbq-orange px-8 font-black uppercase tracking-widest text-white shadow-xl shadow-bbq-orange/20 transition-all hover:scale-105 hover:bg-bbq-orange-dark active:scale-95"
								>
									Email Us
								</a>
								<button
									type="button"
									onclick={resetForm}
									class="flex-1 inline-flex min-h-16 items-center justify-center rounded-xl border-2 border-bbq-blue px-8 font-black uppercase tracking-widest text-white transition-all hover:bg-bbq-blue hover:text-bbq-darker active:scale-95"
								>
									New Request
								</button>
							</div>
						</div>
					{:else}
						<form onsubmit={submitRequest} class="mt-10 space-y-8 relative z-10">
							<div class="grid gap-8 sm:grid-cols-2">
								<div class="space-y-3">
									<label for="name" class="font-accent text-sm tracking-[0.2em] uppercase text-white/40">Contact name</label>
									<input
										id="name"
										bind:value={form.name}
										required
										class="h-14 w-full rounded-xl border border-white/10 bg-bbq-darker/50 px-5 text-white outline-none transition focus:border-bbq-blue focus:ring-4 focus:ring-bbq-blue/10"
										placeholder="Your name"
									/>
								</div>

								<div class="space-y-3">
									<label for="email" class="font-accent text-sm tracking-[0.2em] uppercase text-white/40">Email</label>
									<input
										id="email"
										type="email"
										bind:value={form.email}
										required
										class="h-14 w-full rounded-xl border border-white/10 bg-bbq-darker/50 px-5 text-white outline-none transition focus:border-bbq-blue focus:ring-4 focus:ring-bbq-blue/10"
										placeholder="you@example.com"
									/>
								</div>
							</div>

							<div class="grid gap-8 sm:grid-cols-2">
								<div class="space-y-3">
									<label for="phone" class="font-accent text-sm tracking-[0.2em] uppercase text-white/40">Phone</label>
									<input
										id="phone"
										type="tel"
										bind:value={form.phone}
										required
										class="h-14 w-full rounded-xl border border-white/10 bg-bbq-darker/50 px-5 text-white outline-none transition focus:border-bbq-blue focus:ring-4 focus:ring-bbq-blue/10"
										placeholder="(615) 555-1234"
									/>
								</div>

								<div class="space-y-3">
									<label for="event-date" class="font-accent text-sm tracking-[0.2em] uppercase text-white/40">Event date</label>
									<input
										id="event-date"
										type="date"
										bind:value={form.eventDate}
										class="h-14 w-full rounded-xl border border-white/10 bg-bbq-darker/50 px-5 text-white outline-none transition focus:border-bbq-blue focus:ring-4 focus:ring-bbq-blue/10 [color-scheme:dark]"
									/>
								</div>
							</div>

							<div class="grid gap-8 sm:grid-cols-2">
								<div class="space-y-3">
									<label for="guest-count" class="font-accent text-sm tracking-[0.2em] uppercase text-white/40">Guest count</label>
									<input
										id="guest-count"
										inputmode="numeric"
										bind:value={form.guestCount}
										class="h-14 w-full rounded-xl border border-white/10 bg-bbq-darker/50 px-5 text-white outline-none transition focus:border-bbq-blue focus:ring-4 focus:ring-bbq-blue/10"
										placeholder="e.g. 50"
									/>
								</div>

								<div class="space-y-3">
									<label for="service-style" class="font-accent text-sm tracking-[0.2em] uppercase text-white/40">Service style</label>
									<select
										id="service-style"
										bind:value={form.serviceStyle}
										required
										class="h-14 w-full rounded-xl border border-white/10 bg-bbq-darker/50 px-5 text-white outline-none transition focus:border-bbq-blue focus:ring-4 focus:ring-bbq-blue/10 appearance-none [color-scheme:dark]"
									>
										<option value="">Select style</option>
										<option>Food truck on site</option>
										<option>Drop-off buffet</option>
										<option>Full-service buffet</option>
										<option>Not sure yet</option>
									</select>
								</div>
							</div>

							<div class="space-y-4">
								<label class="font-accent text-sm tracking-[0.2em] uppercase text-white/40">Select package</label>
								<div class="grid gap-3 sm:grid-cols-2">
									{#each formPackages as packageName}
										<label class="flex min-h-12 cursor-pointer items-center rounded-xl border border-white/10 bg-bbq-darker/50 px-4 text-[10px] font-bold uppercase tracking-widest text-white/70 transition-all hover:bg-white/5 has-[:checked]:border-bbq-blue has-[:checked]:bg-bbq-blue/10 has-[:checked]:text-bbq-blue">
											<input
												type="radio"
												name="package"
												bind:group={form.packageName}
												value={packageName}
												class="mr-3 accent-bbq-blue"
											/>
											{packageName}
										</label>
									{/each}
								</div>
							</div>

							<div class="space-y-3">
								<label for="notes" class="font-accent text-sm tracking-[0.2em] uppercase text-white/40">Notes</label>
								<textarea
									id="notes"
									bind:value={form.notes}
									rows="4"
									class="w-full rounded-xl border border-white/10 bg-bbq-darker/50 px-5 py-4 text-white outline-none transition focus:border-bbq-blue focus:ring-4 focus:ring-bbq-blue/10"
									placeholder="Tell us about your event, location, setup needs, dietary restrictions, etc."
								></textarea>
							</div>

							<div class="pt-8 border-t border-white/10">
								<button
									type="submit"
									class="min-h-16 w-full rounded-xl bg-bbq-orange px-8 font-black uppercase tracking-widest text-white shadow-2xl shadow-bbq-orange/30 transition-all hover:scale-105 hover:bg-bbq-orange-dark active:scale-95"
								>
									Send Catering Request
								</button>
								<p class="mt-6 text-center text-xs tracking-widest uppercase text-white/30">
									We will respond within 24-48 hours.
								</p>
							</div>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
