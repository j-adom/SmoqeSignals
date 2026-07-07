<script lang="ts">
	import LegalPage from '$lib/components/LegalPage.svelte';
	import { BIZ } from '$lib/data/seed';
</script>

<LegalPage
	title="Privacy Policy"
	updated="July 2026"
	description="How Smoqe Signals BBQ collects, uses, and protects your information."
>
	<p>
		This Privacy Policy explains how {BIZ.legal} ("Smoqe Signals BBQ," "we," "us") collects, uses, and
		protects your information when you use our website, place an order, or contact us.
	</p>

	<h2>Information we collect</h2>
	<ul>
		<li>
			<strong>Information you give us:</strong> your name, email, phone number, and event details when
			you submit a catering or food-truck request, send a message through our contact form, or sign up
			for our newsletter.
		</li>
		<li>
			<strong>Order information:</strong> your shipping and billing address and the items you order.
			Payments are processed by <strong>Stripe</strong>; we do not collect or store your full card
			number on our servers.
		</li>
		<li>
			<strong>Automatically collected information:</strong> basic technical and usage data (such as your
			browser type and pages visited). Your shopping cart is stored locally in your browser and is not
			sent to us until you check out.
		</li>
	</ul>

	<h2>How we use your information</h2>
	<ul>
		<li>To process and fulfill orders and respond to catering and booking requests.</li>
		<li>To reply to your questions and provide customer support.</li>
		<li>To send our newsletter, if you have opted in (you can unsubscribe at any time).</li>
		<li>To operate, maintain, and improve our website.</li>
	</ul>

	<h2>How we share information</h2>
	<p>
		We do not sell your personal information. We share it only with service providers who help us
		run our business — such as Stripe for payment processing and our hosting and email providers —
		and when required by law.
	</p>

	<h2>Your choices</h2>
	<p>
		You can unsubscribe from our newsletter using the link in any email. To access, correct, or
		delete the information we hold about you, email us at <a href={`mailto:${BIZ.email}`}
			>{BIZ.email}</a
		>.
	</p>

	<h2>Cookies &amp; local storage</h2>
	<p>
		We use minimal cookies and browser local storage to keep the site working — for example, to
		remember the items in your cart between visits.
	</p>

	<h2>Contact us</h2>
	<p>
		Questions about this policy? Reach us at <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a> or
		{BIZ.phone}, or by mail at {BIZ.address}.
	</p>
</LegalPage>
