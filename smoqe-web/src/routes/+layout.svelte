<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { BIZ } from '$lib/data/seed';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
	import Toast from '$lib/components/Toast.svelte';

	let { children } = $props();

	const SITE_TITLE = 'Smoqe Signals BBQ — Nashville BBQ Food Truck & Catering';
	const SITE_DESC =
		"Slim's Smoqe Signals BBQ — Nashville food truck favorites, event catering, and all-natural dry rubs rooted in West Tennessee BBQ tradition.";
	const SOCIALS = [
		'https://www.facebook.com/slimsmokinbbq1',
		'https://www.instagram.com/smoqesignalsbbq'
	];

	const origin = $derived(page.url.origin);
	const ogImage = $derived(`${origin}/images/brisket-board.png`);

	// LocalBusiness/Restaurant structured data for rich local search results.
	const localBusiness = $derived({
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		name: BIZ.name,
		description: SITE_DESC,
		servesCuisine: 'Barbecue',
		priceRange: '$$',
		telephone: BIZ.phone,
		email: BIZ.email,
		url: origin,
		image: ogImage,
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'PO Box 9112',
			addressLocality: 'Nashville',
			addressRegion: 'TN',
			postalCode: '37209',
			addressCountry: 'US'
		},
		areaServed: 'Nashville, TN',
		sameAs: SOCIALS
	});
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={BIZ.name} />
	<meta property="og:title" content={SITE_TITLE} />
	<meta property="og:description" content={SITE_DESC} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESC} />
	<meta name="twitter:image" content={ogImage} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(localBusiness)}</` + `script>`}
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

<CartDrawer />
<Toast />
