<script lang="ts">
	import LegalPage from '$lib/components/LegalPage.svelte';
	import { BIZ } from '$lib/data/seed';
</script>

<LegalPage
	title="Terms of Service"
	updated="July 2026"
	description="The terms that govern your use of the Smoqe Signals BBQ website and orders."
>
	<p>
		These Terms of Service ("Terms") govern your use of the {BIZ.legal} website and your purchases from
		us. By using this site or placing an order, you agree to these Terms.
	</p>

	<h2>Orders &amp; pricing</h2>
	<p>
		Prices, products, and menu availability may change without notice. We may refuse or cancel an
		order at our discretion — for example, if an item is unavailable or a pricing error occurred. If
		we cancel a paid order, we will refund it.
	</p>

	<h2>Catering &amp; food-truck bookings</h2>
	<p>
		Submitting a catering or food-truck request is not a confirmed booking. A booking is confirmed
		only after we follow up and agree on the details in writing. Deposits, minimums, and
		cancellation terms are set out in your quote and catering agreement.
	</p>

	<h2>Digital products</h2>
	<p>
		Digital items, such as our eBook, are licensed to you for personal, non-commercial use and may
		not be redistributed. Digital sales are final. Pre-orders are charged at the time of purchase
		and delivered when the product is released.
	</p>

	<h2>Intellectual property</h2>
	<p>
		The content on this site — including our recipes, text, images, logos, and branding — belongs to
		Smoqe Signals BBQ and may not be used without our permission.
	</p>

	<h2>Food allergies</h2>
	<p>
		Our food is prepared in a kitchen that handles common allergens. If you have a food allergy or
		dietary restriction, please tell us before ordering so we can advise you.
	</p>

	<h2>Disclaimer &amp; limitation of liability</h2>
	<p>
		This website and our products are provided "as is." To the fullest extent permitted by law,
		Smoqe Signals BBQ is not liable for any indirect or incidental damages arising from your use of
		the site or our products.
	</p>

	<h2>Governing law</h2>
	<p>These Terms are governed by the laws of the State of Tennessee.</p>

	<h2>Contact us</h2>
	<p>
		Questions about these Terms? Reach us at <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a> or
		{BIZ.phone}.
	</p>
</LegalPage>
