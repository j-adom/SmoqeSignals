import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import type { BlogPost, LexicalRoot, Product, ProductCategory } from '$lib/types';
import { POSTS, PRODUCTS } from '$lib/data/seed';

/**
 * Server-only Payload CMS client.
 *
 * Every read gracefully falls back to bundled seed data when the backend is
 * unreachable or `PAYLOAD_API_URL` is unset, so the storefront always renders
 * — even on a fresh Cloudflare deploy before the VPS backend is wired up.
 */

type Fetch = typeof fetch;

const API = (env.PAYLOAD_API_URL || '').replace(/\/$/, '');
const TIMEOUT_MS = 4000;
const USE_SEED_DATA = dev && !API;

function hasBackend(): boolean {
	return API.length > 0;
}

async function api<T>(path: string, fetchFn: Fetch): Promise<T | null> {
	if (!hasBackend()) return null;
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
	try {
		const res = await fetchFn(`${API}${path}`, {
			signal: ctrl.signal,
			headers: { accept: 'application/json' }
		});
		if (!res.ok) {
			console.error(
				JSON.stringify({ message: 'Payload request failed', path, status: res.status })
			);
			return null;
		}
		return (await res.json()) as T;
	} catch (error) {
		console.error(
			JSON.stringify({
				message: 'Payload request unavailable',
				path,
				error: error instanceof Error ? error.message : String(error)
			})
		);
		return null;
	} finally {
		clearTimeout(timer);
	}
}

/* ----------------------------- media helper ----------------------------- */

type MediaRef =
	| string
	| {
			url?: string;
			sizes?: Record<string, { url?: string } | undefined>;
	  }
	| null
	| undefined;

function resolveMedia(ref: MediaRef, fallback: string, variant = 'card'): string {
	if (!ref) return fallback;
	if (typeof ref === 'string') return fallback; // unpopulated relationship id
	const sized = ref.sizes?.[variant]?.url;
	const url = sized || ref.url;
	if (!url) return fallback;
	// Payload may return relative URLs; absolutize against the backend.
	if (url.startsWith('http')) return url;
	return `${API}${url}`;
}

/* ------------------------------- products ------------------------------- */

interface PayloadProduct {
	id: string | number;
	slug: string;
	name: string;
	category: ProductCategory;
	price: number;
	heat?: number;
	tag?: string | null;
	image?: MediaRef;
	short?: string;
	long?: string;
	size?: string;
	notes?: Array<{ note: string }>;
	featured?: boolean;
	inStock?: boolean;
	fulfillment?: Product['fulfillment'];
}

function mapProduct(d: PayloadProduct): Product {
	return {
		id: String(d.id),
		slug: d.slug,
		name: d.name,
		category: d.category,
		price: Number(d.price) || 0,
		heat: Math.max(0, Math.min(5, Number(d.heat) || 0)) as Product['heat'],
		tag: d.tag || null,
		image: resolveMedia(d.image, '/images/brisket-board.png'),
		short: d.short || '',
		long: d.long || d.short || '',
		size: d.size || '',
		notes: (d.notes || []).map((n) => n.note).filter(Boolean),
		featured: !!d.featured,
		inStock: d.inStock !== false,
		fulfillment: d.fulfillment || 'physical'
	};
}

export async function getProducts(fetchFn: Fetch = fetch): Promise<Product[]> {
	const data = await api<{ docs: PayloadProduct[] }>(
		'/api/products?limit=100&depth=1&sort=-featured',
		fetchFn
	);
	if (!data?.docs?.length) return USE_SEED_DATA ? PRODUCTS : [];
	return data.docs.map(mapProduct);
}

export async function getProductBySlug(
	slug: string,
	fetchFn: Fetch = fetch
): Promise<Product | null> {
	const data = await api<{ docs: PayloadProduct[] }>(
		`/api/products?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1`,
		fetchFn
	);
	if (data?.docs?.length) return mapProduct(data.docs[0]);
	return USE_SEED_DATA ? (PRODUCTS.find((p) => p.slug === slug) ?? null) : null;
}

/* -------------------------------- posts --------------------------------- */

interface PayloadPost {
	id: string | number;
	slug: string;
	title: string;
	excerpt?: string;
	publishDate?: string;
	createdAt?: string;
	readMins?: number;
	category?: string;
	featuredImage?: MediaRef;
	featured?: boolean;
	content?: LexicalRoot;
}

const CATEGORY_LABELS: Record<string, string> = {
	news: 'News',
	'pit-tips': 'Pit Tips',
	recipes: 'Recipes',
	'our-story': 'Our Story',
	events: 'Events'
};

function mapPost(d: PayloadPost): BlogPost {
	return {
		id: String(d.id),
		slug: d.slug,
		title: d.title,
		excerpt: d.excerpt || '',
		date: d.publishDate || d.createdAt || new Date().toISOString(),
		readMins: Number(d.readMins) || 4,
		category: d.category ? (CATEGORY_LABELS[d.category] ?? d.category) : 'News',
		cover: resolveMedia(d.featuredImage, '/images/brisket-board.png', 'card'),
		featured: !!d.featured,
		content: d.content ?? null,
		bodyText: null
	};
}

export async function getPosts(fetchFn: Fetch = fetch): Promise<BlogPost[]> {
	const data = await api<{ docs: PayloadPost[] }>(
		'/api/blogPosts?where[status][equals]=published&sort=-publishDate&limit=50&depth=1',
		fetchFn
	);
	if (!data?.docs?.length) return USE_SEED_DATA ? POSTS : [];
	return data.docs.map(mapPost);
}

export async function getPostBySlug(
	slug: string,
	fetchFn: Fetch = fetch
): Promise<BlogPost | null> {
	const data = await api<{ docs: PayloadPost[] }>(
		`/api/blogPosts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=1`,
		fetchFn
	);
	if (data?.docs?.length) return mapPost(data.docs[0]);
	return USE_SEED_DATA ? (POSTS.find((p) => p.slug === slug) ?? null) : null;
}

/* ----------------------------- submissions ------------------------------ */

async function postJSON(slug: string, body: object, fetchFn: Fetch): Promise<{ ok: boolean }> {
	const storefrontKey = env.STOREFRONT_API_KEY?.trim();
	if (!hasBackend() || !storefrontKey) return { ok: false };
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
	try {
		const res = await fetchFn(`${API}/api/public/${slug}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'x-storefront-key': storefrontKey
			},
			signal: ctrl.signal,
			body: JSON.stringify(body)
		});
		return { ok: res.ok };
	} catch (error) {
		console.error(
			JSON.stringify({
				message: 'Submission request failed',
				slug,
				error: error instanceof Error ? error.message : String(error)
			})
		);
		return { ok: false };
	} finally {
		clearTimeout(timer);
	}
}

export function subscribeNewsletter(email: string, source: string, fetchFn: Fetch = fetch) {
	return postJSON('newsletter', { email, source }, fetchFn);
}

export interface CateringPayload {
	name: string;
	email: string;
	phone: string;
	eventDate?: string;
	eventTime?: string;
	guestCount?: string;
	serviceStyle: string;
	location?: string;
	budget?: string;
	hearAbout?: string;
	notes?: string;
}
export function submitCatering(data: CateringPayload, fetchFn: Fetch = fetch) {
	return postJSON('catering', data, fetchFn);
}

export interface ContactPayload {
	name: string;
	email: string;
	message: string;
	inquiryType?: string;
}
export function submitContact(data: ContactPayload, fetchFn: Fetch = fetch) {
	return postJSON('contact', data, fetchFn);
}

/* ------------------------------- checkout ------------------------------- */

export interface CheckoutItem {
	slug: string;
	qty: number;
}

/**
 * Hands the cart to the Payload backend, which prices it authoritatively and
 * creates a Stripe Checkout session. Returns the hosted checkout URL.
 */
export async function createCheckout(
	items: CheckoutItem[],
	fetchFn: Fetch = fetch
): Promise<{ url: string } | { error: string }> {
	const storefrontKey = env.STOREFRONT_API_KEY?.trim();
	if (!hasBackend() || !storefrontKey) return { error: 'Checkout is not configured yet.' };
	try {
		const res = await fetchFn(`${API}/api/checkout`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'x-storefront-key': storefrontKey
			},
			body: JSON.stringify({ items })
		});
		const data = (await res.json()) as { url?: string; error?: string };
		if (!res.ok) return { error: data.error || 'Could not start checkout. Please try again.' };
		if (!data.url) return { error: 'Checkout session was not created.' };
		return { url: data.url };
	} catch {
		return { error: 'Could not reach the store right now.' };
	}
}
