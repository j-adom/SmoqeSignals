<script lang="ts">
	import { X, ShoppingCart, Truck } from '@lucide/svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { toast } from '$lib/stores/toast.svelte';
	import { money } from '$lib/utils';

	let loading = $state(false);

	async function checkout() {
		if (cart.items.length === 0 || loading) return;
		loading = true;
		try {
			const res = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					items: cart.items.map((i) => ({ slug: i.slug, qty: i.qty }))
				})
			});
			const data = (await res.json()) as { url?: string; error?: string };
			if (data.url) {
				window.location.href = data.url;
				return;
			}
			toast.show(data.error || 'Checkout is not available yet.');
		} catch {
			toast.show('Could not reach the store right now.');
		} finally {
			loading = false;
		}
	}
</script>

<!-- scrim -->
<div
	class={`fixed inset-0 z-[90] bg-smoke-900/50 backdrop-blur-[2px] transition-opacity duration-300 ${
		cart.open ? 'opacity-100' : 'pointer-events-none opacity-0'
	}`}
	onclick={() => (cart.open = false)}
	role="presentation"
></div>

<!-- drawer -->
<aside
	class={`fixed bottom-0 right-0 top-0 z-[91] flex w-[min(420px,92vw)] flex-col bg-paper shadow-[-20px_0_60px_rgba(0,0,0,0.3)] transition-transform duration-300 ${
		cart.open ? 'translate-x-0' : 'translate-x-full'
	}`}
	aria-label="Shopping cart"
	aria-hidden={!cart.open}
>
	<div class="flex items-center justify-between border-b border-paper-line px-6 py-[22px]">
		<span class="display text-2xl">Your Cart</span>
		<button
			class="grid h-11 w-11 place-items-center rounded border border-paper-line bg-white"
			onclick={() => (cart.open = false)}
			aria-label="Close cart"
		>
			<X size={20} />
		</button>
	</div>

	<div class="flex-1 overflow-y-auto px-6">
		{#if cart.items.length === 0}
			<div class="px-3 py-16 text-center text-ink-soft">
				<ShoppingCart size={52} class="mx-auto mb-3.5 text-paper-line" />
				<p class="mb-1 font-extrabold text-ink">Your cart is empty</p>
				<p class="mb-5 text-sm">Real BBQ flavor, shipped to your door.</p>
				<a href="/shop" class="btn btn-dark btn-sm" onclick={() => (cart.open = false)}>
					Shop the Rubs
				</a>
			</div>
		{:else}
			{#each cart.items as item (item.id)}
				<div class="flex gap-3.5 border-b border-paper-line py-[18px]">
					<img
						src={item.image}
						alt={item.name}
						class="h-[70px] w-[70px] shrink-0 rounded bg-paper-2 object-cover"
					/>
					<div class="min-w-0 flex-1">
						<div class="text-[14.5px] font-extrabold leading-tight">{item.name}</div>
						<div class="mb-2.5 mt-0.5 text-[12.5px] text-ink-soft">{item.size}</div>
						<div class="flex items-center justify-between">
							<span class="inline-flex items-center overflow-hidden rounded border border-paper-line">
								<button
									class="grid h-[30px] w-[30px] place-items-center bg-white text-char hover:bg-paper-2"
									onclick={() => cart.setQty(item.id, item.qty - 1)}
									aria-label="Decrease quantity"
								>
									–
								</button>
								<span class="w-[34px] text-center text-sm font-extrabold">{item.qty}</span>
								<button
									class="grid h-[30px] w-[30px] place-items-center bg-white text-char hover:bg-paper-2"
									onclick={() => cart.setQty(item.id, item.qty + 1)}
									aria-label="Increase quantity"
								>
									+
								</button>
							</span>
							<span class="font-extrabold">{money(item.price * item.qty)}</span>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	{#if cart.items.length > 0}
		<div class="border-t border-paper-line bg-white px-6 py-5">
			<div class="mb-1 flex items-baseline justify-between">
				<span class="font-bold text-ink-soft">Subtotal</span>
				<span class="display text-2xl">{money(cart.total)}</span>
			</div>
			<p class="mb-3.5 flex items-center gap-1.5 text-[12.5px] text-ink-soft">
				<Truck size={14} /> Free shipping over $45 · taxes at checkout
			</p>
			<button class="btn btn-primary btn-block" onclick={checkout} disabled={loading}>
				{loading ? 'Starting checkout…' : 'Checkout'}
			</button>
			<button
				class="btn btn-ghost btn-block btn-sm mt-2.5 border-paper-line"
				onclick={() => (cart.open = false)}
			>
				Keep Shopping
			</button>
		</div>
	{/if}
</aside>
