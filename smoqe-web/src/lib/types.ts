/**
 * Normalized domain types shared across the Smoqe Signals frontend.
 * Both the Payload REST client and the bundled seed-data fallback
 * resolve to these shapes, so components never care about the source.
 */

export type Heat = 0 | 1 | 2 | 3 | 4 | 5;

export type ProductCategory =
	| 'Dry Rub'
	| 'Seasoning'
	| 'Sauce'
	| 'Gift Set'
	| 'Gear';

export interface Product {
	id: string;
	slug: string;
	name: string;
	category: ProductCategory;
	price: number; // dollars
	heat: Heat;
	tag: string | null; // "Best Seller", "Hot", "Save $4"…
	image: string; // resolved URL
	short: string;
	long: string;
	size: string;
	notes: string[];
	featured: boolean;
	inStock: boolean;
}

/** Minimal Lexical root, as returned by Payload richText fields. */
export interface LexicalNode {
	type?: string;
	tag?: string | number;
	text?: string;
	format?: number | string;
	listType?: string;
	url?: string;
	fields?: Record<string, unknown>;
	children?: LexicalNode[];
	[key: string]: unknown;
}
export interface LexicalRoot {
	root: LexicalNode;
}

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	date: string; // ISO
	readMins: number;
	category: string; // human label / tag
	cover: string; // resolved URL
	featured: boolean;
	/** Rich content from Payload (rendered with LexicalRenderer)… */
	content: LexicalRoot | null;
	/** …or plain paragraphs from the seed fallback. */
	bodyText: string[] | null;
}

export interface MenuItem {
	name: string;
	desc: string;
	price?: string;
}

export interface Faq {
	q: string;
	a: string;
}

export interface Testimonial {
	quote: string;
	name: string;
	source?: string; // where the review came from, e.g. "Restaurantji", "Google"
}

export interface CartLine {
	id: string;
	slug: string;
	name: string;
	price: number;
	image: string;
	size: string;
	qty: number;
}

export interface BizInfo {
	name: string;
	legal: string;
	tagline: string;
	phone: string;
	phoneHref: string;
	email: string;
	address: string;
	founded: number;
}
