<script lang="ts">
	import LegalPage from '$lib/components/LegalPage.svelte';
	import { BIZ } from '$lib/data/seed';
</script>

<LegalPage
	title="Shipping & Returns"
	updated="July 2026"
	description="Shipping rates, delivery times, and the return policy for Smoqe Signals BBQ orders."
>
	<h2>Shipping</h2>
	<ul>
		<li>We currently ship within the United States.</li>
		<li>Orders ship within <strong>1–2 business days</strong>.</li>
		<li>
			Shipping is a flat <strong>$6.50</strong>, and <strong>free on orders over $45</strong>.
		</li>
		<li>Estimated delivery is <strong>2–5 business days</strong> after your order ships.</li>
	</ul>

	<h2>Problems with your order</h2>
	<p>
		If your order arrives damaged, incorrect, or incomplete, contact us within <strong
			>14 days</strong
		>
		of delivery at <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a> and we will make it right with a replacement
		or refund.
	</p>

	<h2>Returns</h2>
	<p>
		Because our rubs, seasonings, and sauces are consumable food products, we cannot accept returns
		of opened items for health and safety reasons. Unopened items in their original condition may be
		returned within <strong>14 days</strong> of delivery; return shipping is the customer's responsibility.
		Please contact us first so we can help.
	</p>

	<h2>Digital products</h2>
	<p>
		Digital items, such as our eBook, are final sale and non-refundable. Pre-orders are charged at
		purchase and delivered when the product is released.
	</p>

	<h2>Catering</h2>
	<p>
		Catering and food-truck orders are covered by your catering agreement and quote, not by this
		shipping and returns policy.
	</p>

	<h2>Contact us</h2>
	<p>
		Questions about a shipment or return? Reach us at <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a
		>
		or {BIZ.phone}.
	</p>
</LegalPage>
