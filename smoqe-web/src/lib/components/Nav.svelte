<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X, ShoppingCart } from '@lucide/svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import Logo from './Logo.svelte';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/shop', label: 'Shop' },
		{ href: '/food-truck', label: 'Food Truck' },
		{ href: '/catering', label: 'Catering' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	let mobileOpen = $state(false);

	function isActive(href: string): boolean {
		const path = page.url.pathname;
		return href === '/' ? path === '/' : path.startsWith(href);
	}
</script>

<header class="border-paper-line bg-paper/85 sticky top-0 z-50 border-b backdrop-blur-md">
	<div class="container-wide flex h-[74px] items-center justify-between">
		<a
			href="/"
			class="flex items-center"
			aria-label="Smoqe Signals BBQ home"
			onclick={() => (mobileOpen = false)}
		>
			<Logo variant="brown" h={42} />
		</a>

		<nav class="hidden items-center gap-1 md:flex">
			{#each links as l (l.href)}
				<a
					href={l.href}
					class={`hover:text-flame rounded px-3.5 py-2 text-[14.5px] font-bold transition-colors ${
						isActive(l.href) ? 'text-flame' : 'text-char'
					}`}
				>
					{l.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2.5">
			<a href="/food-truck" class="btn btn-primary btn-sm hidden md:inline-flex">Book the Truck</a>
			<button
				class="border-paper-line text-ink hover:border-flame hover:text-flame relative grid h-11 w-11 place-items-center rounded border bg-white transition-colors"
				onclick={() => (cart.open = true)}
				aria-label="Open cart"
			>
				<ShoppingCart size={20} />
				{#if cart.count > 0}
					<span
						class="border-paper bg-flame absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full border-2 px-1 text-[11px] font-extrabold text-white"
					>
						{cart.count}
					</span>
				{/if}
			</button>
			<button
				class="border-paper-line text-ink grid h-11 w-11 place-items-center rounded border bg-white md:hidden"
				onclick={() => (mobileOpen = true)}
				aria-label="Open menu"
			>
				<Menu size={22} />
			</button>
		</div>
	</div>
</header>

<!-- Mobile menu -->
<div
	class={`bg-paper fixed inset-0 z-[80] flex flex-col p-6 transition-transform duration-300 md:hidden ${
		mobileOpen ? 'translate-y-0' : 'pointer-events-none -translate-y-full'
	}`}
>
	<div class="mb-4 flex items-center justify-between">
		<Logo variant="brown" h={36} />
		<button
			class="border-paper-line grid h-11 w-11 place-items-center rounded border bg-white"
			onclick={() => (mobileOpen = false)}
			aria-label="Close menu"
		>
			<X size={22} />
		</button>
	</div>
	{#each links as l (l.href)}
		<a
			href={l.href}
			class="display border-paper-line text-ink border-b py-4 text-3xl"
			onclick={() => (mobileOpen = false)}
		>
			{l.label}
		</a>
	{/each}
	<a href="/food-truck" class="btn btn-primary btn-block mt-6" onclick={() => (mobileOpen = false)}>
		Book the Truck
	</a>
</div>
