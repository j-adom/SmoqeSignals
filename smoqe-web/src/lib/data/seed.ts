import type { BizInfo, BlogPost, Faq, Product, Testimonial } from '$lib/types';

/**
 * Bundled fallback content. The site renders entirely from this when the
 * Payload backend is unreachable (e.g. first deploy, backend down, local dev
 * without the CMS running). Real brand facts are preserved; the merch line is
 * a plausible starting catalog you can edit/replace in Payload.
 */

export const BIZ: BizInfo = {
	name: 'Smoqe Signals BBQ',
	legal: "Slim's Smoqe Signals BBQ",
	tagline: 'Nashville Bred · Memphis Approved · Tennessee Tradition',
	phone: '615-429-4851',
	phoneHref: 'tel:6154294851',
	email: 'info@smoqesignals.com',
	address: 'PO Box 9112, Nashville, TN 37209',
	founded: 2012
};

export const PRODUCTS: Product[] = [
	{
		id: 'seed-slims-original',
		slug: 'slims-original-shake-a-rub',
		name: "Slim's Original Shake-A-Rub",
		category: 'Dry Rub',
		price: 12,
		heat: 2,
		tag: 'Best Seller',
		image: '/images/wings-rub.jpg',
		short: 'All-natural all-purpose rub. The one we put on everything.',
		long: 'The rub that started it all. A balanced, all-natural blend built for pork, chicken, and ribs — equal parts sweet, savory, and smoke. Shake it on before the pit and let low-and-slow do the rest.',
		size: '6 oz shaker',
		notes: ['All natural', 'No MSG', 'Gluten free'],
		featured: true,
		inStock: true
	},
	{
		id: 'seed-sweet-heat-rib',
		slug: 'sweet-heat-rib-rub',
		name: 'Sweet Heat Rib Rub',
		category: 'Dry Rub',
		price: 13,
		heat: 3,
		tag: 'Heat',
		image: '/images/brisket-board.png',
		short: 'Brown sugar up front, cayenne on the finish. Built for ribs.',
		long: 'Brown sugar and paprika lay down the bark while cayenne and chili bring a slow-building backdoor heat. Engineered for spare ribs and pork shoulder, but it sings on wings too.',
		size: '6 oz shaker',
		notes: ['All natural', 'Medium heat'],
		featured: true,
		inStock: true
	},
	{
		id: 'seed-brisket-beef',
		slug: 'brisket-and-beef-rub',
		name: 'Brisket & Beef Rub',
		category: 'Dry Rub',
		price: 14,
		heat: 1,
		tag: null,
		image: '/images/brisket-board.png',
		short: 'Coarse black pepper, sea salt, and a whisper of coffee.',
		long: 'Texas-style simplicity with a West Tennessee accent. Coarse-cracked pepper and sea salt build the bark; a touch of ground coffee deepens the smoke ring. Made for brisket, beef ribs, and tri-tip.',
		size: '7 oz shaker',
		notes: ['All natural', 'Mild'],
		featured: true,
		inStock: true
	},
	{
		id: 'seed-poultry-rub',
		slug: 'smoked-poultry-rub',
		name: 'Smoked Poultry Rub',
		category: 'Dry Rub',
		price: 12,
		heat: 1,
		tag: null,
		image: '/images/wings-rub.jpg',
		short: 'Herbs, citrus, and smoked paprika for birds of all sizes.',
		long: 'Thyme, sage, and a bright lemon-pepper lift cut through smoked paprika and garlic — keeps smoked turkey, chicken, and wings tasting clean, not heavy.',
		size: '6 oz shaker',
		notes: ['All natural', 'Mild'],
		featured: false,
		inStock: true
	},
	{
		id: 'seed-nashville-hot',
		slug: 'nashville-hot-seasoning',
		name: 'Nashville Hot Seasoning',
		category: 'Seasoning',
		price: 13,
		heat: 4,
		tag: 'Hot',
		image: '/images/wings-rub.jpg',
		short: 'A nod to our hometown. Cayenne-forward and unapologetic.',
		long: 'Our tribute to the city that raised us. Cayenne and chili de árbol carry real Music City heat, balanced with brown sugar and garlic so it builds instead of burns. Dust it on wings, fries, or anything that can take it.',
		size: '6 oz shaker',
		notes: ['All natural', 'Hot'],
		featured: false,
		inStock: true
	},
	{
		id: 'seed-memphis-dust',
		slug: 'memphis-dust-pork-rub',
		name: 'Memphis Dust Pork Rub',
		category: 'Dry Rub',
		price: 13,
		heat: 2,
		tag: null,
		image: '/images/brisket-board.png',
		short: 'Paprika, mustard, and sugar — classic dry-rib bark.',
		long: 'The dry-rib classic. Paprika and brown sugar caramelize into a deep mahogany bark while mustard powder and celery seed keep it honest. Memphis-style ribs, no sauce required.',
		size: '7 oz shaker',
		notes: ['All natural', 'Medium'],
		featured: false,
		inStock: true
	},
	{
		id: 'seed-signature-sauce',
		slug: 'signature-bbq-sauce',
		name: 'Signature BBQ Sauce',
		category: 'Sauce',
		price: 11,
		heat: 2,
		tag: null,
		image: '/images/bbq-spread.jpg',
		short: 'Tomato base, molasses, vinegar tang. The house pour.',
		long: 'A Tennessee table sauce that knows when to stop. Tomato and molasses bring the body, cider vinegar cuts the sweetness, and a back note of smoke ties it to the pit. Thick enough to cling, thin enough to mop.',
		size: '16 oz bottle',
		notes: ['Small batch', 'Medium'],
		featured: false,
		inStock: true
	},
	{
		id: 'seed-carolina-gold',
		slug: 'carolina-gold-mustard-sauce',
		name: 'Carolina Gold Mustard Sauce',
		category: 'Sauce',
		price: 11,
		heat: 1,
		tag: null,
		image: '/images/bbq-spread.jpg',
		short: 'Tangy yellow-mustard base for pulled pork.',
		long: 'A gold-standard mustard sauce for pulled pork and chicken. Yellow mustard and honey, sharpened with cider vinegar and a pinch of cayenne. Bright, tangy, and built to cut through fat.',
		size: '16 oz bottle',
		notes: ['Small batch', 'Mild'],
		featured: false,
		inStock: true
	},
	{
		id: 'seed-pitmaster-trio',
		slug: 'pitmaster-trio-gift-set',
		name: 'Pitmaster Trio Gift Set',
		category: 'Gift Set',
		price: 34,
		heat: 2,
		tag: 'Save $4',
		image: '/images/brisket-board.png',
		short: 'Original, Sweet Heat, and Brisket rubs in a boxed set.',
		long: 'Three of our most-reached-for shakers — Original, Sweet Heat Rib, and Brisket & Beef — boxed up with a recipe card. The easiest way to gift a backyard pitmaster, or to start your own shelf.',
		size: '3 × 6 oz shakers',
		notes: ['Gift boxed', 'Recipe card included'],
		featured: true,
		inStock: true
	},
	{
		id: 'seed-trucker-hat',
		slug: 'tristar-trucker-hat',
		name: 'Tristar Trucker Hat',
		category: 'Gear',
		price: 28,
		heat: 0,
		tag: null,
		image: '/images/logo-on-dark.png',
		short: 'Charcoal mesh-back with the flame tristar patch.',
		long: 'Structured charcoal front, black mesh back, snapback fit. Embroidered flame-tristar patch on the front. Broken in by the pit, ready for the tailgate.',
		size: 'One size · snapback',
		notes: ['Embroidered patch', 'Mesh back'],
		featured: false,
		inStock: true
	},
	{
		id: 'seed-pit-tee',
		slug: 'worth-following-pit-tee',
		name: '"Worth Following" Pit Tee',
		category: 'Gear',
		price: 26,
		heat: 0,
		tag: null,
		image: '/images/food-truck.png',
		short: 'Soft charcoal tee with the smoke-signal back print.',
		long: 'Ringspun charcoal cotton, soft-hand front logo and a smoke-signal graphic across the back. The shirt you reach for on a long smoke.',
		size: 'S–3XL',
		notes: ['100% ringspun cotton', 'Unisex fit'],
		featured: false,
		inStock: true
	}
];

export const PRODUCT_CATEGORIES = [
	'All',
	'Dry Rub',
	'Seasoning',
	'Sauce',
	'Gift Set',
	'Gear'
] as const;

// Walk-up / event truck menu — smoked meats, loaded specialties, wings, and sides served on site.
export const TRUCK_MENU: {
	meats: string[];
	specialties: string[];
	wings: { note: string; sauces: string[] };
	sides: string[];
	sidesNote: string;
} = {
	meats: [
		'Pulled Pork',
		'Beef Brisket',
		'Smoked Sliced Turkey Breast',
		'Veggie Pulled "Pork" (vegetarian option)'
	],
	specialties: ['BBQ Fries', 'Mega Fries', 'BBQ Nachos', 'Mega Nachos', "Smack'n Mac'n Cheese"],
	wings: {
		note: "Deep-fried wings tossed in your choice of Slim's homemade sauce. Available in 6, 12, or 18-piece portions.",
		sauces: [
			'BBQ',
			'Honey Gold',
			'Honey Hot',
			'Honey Hot Lemon Pepper',
			'BBQ Lemon Pepper',
			'Hot',
			'Buffalo',
			'Lime Pepper'
		]
	},
	sides: ['Smoked BBQ Beans', 'Creamy Cole Slaw', 'Golden French Fries'],
	sidesNote: 'All sides are vegetarian friendly unless specified.'
};

// Catering menu — centered name-only lists grouped by protein, per Shon (July 2026).
export const CATERING_MENU: {
	sections: { category: string; items: string[] }[];
	sides: string[];
	sidesNote: string;
} = {
	sections: [
		{
			category: 'Pork',
			items: [
				'Pulled Pork — by the pound',
				'Pork Ribs — Half Rack / Full Rack',
				'Pork Rib Tips — by the pound',
				'Pork Sausage Links',
				'Pork Belly Burnt Ends',
				'Whole Hog — call for inquiries'
			]
		},
		{
			category: 'Beef',
			items: [
				'Beef Brisket — by the pound',
				'Beef Back Ribs',
				'Beef Dino Ribs',
				'Beef Short Ribs',
				'Brisket Burnt Ends'
			]
		},
		{
			category: 'Poultry',
			items: [
				'Pulled Chicken — by the pound',
				'Smoked Sliced Turkey Breast',
				'Turkey Tips — by the pound',
				'Smoked Whole Wings',
				'Chicken Quarters',
				'Whole Chicken',
				'Half Chicken'
			]
		},
		{
			category: 'Vegetarian',
			items: ['Veggie Pulled "Pork"']
		},
		{
			category: 'Seafood',
			items: ['Grilled Salmon', 'Grilled Prawns', 'Grilled Snapper with Pickled Veggies']
		}
	],
	sides: ['BBQ Baked Beans', 'Cole Slaw', 'Potato Salad', 'Green Beans', 'Mac & Cheese'],
	sidesNote:
		'Available in Pint, Quart, and Full Pan. All sides are vegetarian friendly unless specified.'
};

// Feature items that replaced the pre-built packages grid, per Shon (July 2026).
export const CATERING_FEATURES: { name: string; blurb: string }[] = [
	{
		name: 'Whole Hog',
		blurb: 'Feeds 125–150 people. Market Price — call for inquiries.'
	},
	{
		name: 'Wings',
		blurb:
			'Deep-fried wings, tossed in your choice of sauce: BBQ, Honey Gold, Lemon Pepper, BBQ Lemon Pepper, Lime Pepper, Honey Hot, Buffalo Lemon Pepper, and Honey Hot Lemon Pepper — the last three each available mild or hot. Available in 25, 50, or 100-piece portions.'
	},
	{
		name: 'Tailgate',
		blurb:
			'Hosting a tailgate this football season? Let us cater it. Get in touch through the form below.'
	}
];

export const CATERING_EXTRAS = [
	'BBQ Sauce',
	'Buns',
	'Paper Goods',
	'Chafing Dishes',
	'Cups',
	'Ice',
	'Set Up'
];

/**
 * Customer reviews shown in the testimonials section. Empty until Shon supplies
 * real quotes — the section hides itself when this is empty so nothing fake
 * ships. Add entries like:
 *   { quote: 'Best brisket in Nashville.', name: 'Jane D.', source: 'Google' }
 */
export const TESTIMONIALS: Testimonial[] = [];

export const TRUCK_SERVICE_STYLES = [
	'Food truck on site',
	'Private party',
	'Corporate lunch',
	'Festival or market',
	'Wedding'
];

export const CATERING_SERVICE_STYLES = [
	'Drop-off buffet',
	'Full-service catering',
	'Corporate lunch',
	'Wedding or private event'
];

export const TRUCK_FAQS: Faq[] = [
	{
		q: 'What space does the food truck need?',
		a: 'The truck needs a minimum clearance of 30 × 15 feet on a level surface. We run on our own generators, though for quiet indoor events we may ask for a 220v hookup.'
	},
	{
		q: 'How far in advance should I book the truck?',
		a: 'Smaller truck bookings can sometimes move quickly, but popular dates fill fast. Reach out as early as you can and we will tell you straight what is available.'
	},
	{
		q: 'Is there a minimum for truck bookings?',
		a: 'Yes — event bookings carry a minimum. Tell us your date, headcount, and location and we will send the details with your quote.'
	}
];

export const CATERING_FAQS: Faq[] = [
	{
		q: 'How far in advance do I need to book?',
		a: 'We ask for at least 2 weeks notice on full-service events so we have the supplies and meats ready for the long smoking process. Smaller drop-off orders can sometimes move faster — reach out and we will tell you straight.'
	},
	{
		q: 'Is there a minimum on deliveries?',
		a: '$300 minimum on deliveries, before tax and the delivery fee.'
	},
	{
		q: 'How much is the delivery fee?',
		a: 'A 15% service fee on your total food and beverage, for deliveries within a 10-mile radius. Additional charges may apply for deliveries beyond that.'
	},
	{
		q: 'What is included in the paper goods sets?',
		a: 'Heavy duty paper plates, cups, wet naps, culinary set, and dinner napkin.'
	},
	{
		q: 'What will the food be delivered in?',
		a: 'Disposable aluminum serving trays.'
	},
	{
		q: 'Can you accommodate dietary restrictions?',
		a: 'Yes, we offer vegetarian options across our meats and sides — just let us know when you book so we can tailor your menu.'
	},
	{
		q: 'How do deposits work?',
		a: "A deposit is required to reserve your date. Cancel within 24 hours of your event and you'll forfeit 50% of your deposit; canceling the day of the event means no refund."
	},
	{
		q: 'What is the Full-Service setup?',
		a: "Our Full-Service events offer a seamless, hassle-free dining experience, backed by our team's genuine Southern warmth. We arrive one hour before your event to handle setup — the menu board, warmers, serving utensils, and sauces — then stay on-site throughout to oversee the food presentation and keep the ambiance flawless for your guests. Afterward, our team stays an additional hour to handle cleanup. We work closely with hosts and event planners, paying close attention to every detail of your event. Want a preview? Ask and we'll send photos from past Full-Service events."
	}
];

// "Catering Made Easy" — policy copy, one source of truth per fact (Shon, July 2026).
export const CATERING_TERMS: { title: string; bullets: { label: string; text: string }[] }[] = [
	{
		title: 'Standard & Delivery Orders',
		bullets: [
			{
				label: '$300 Order Minimum',
				text: 'Ideal for approximately 20 people, our catering packages start at this budget-friendly threshold.'
			},
			{
				label: '48-Hour Notice',
				text: 'While we pride ourselves on flexibility, a 48-hour notice lets us craft your feast to perfection.'
			},
			{
				label: 'Deposit & Cancellation',
				text: "A deposit secures your booking. Cancel within 24 hours of your event and you'll forfeit 50% of your deposit; cancellations made the day of the event are non-refundable."
			},
			{
				label: 'Delivery Options',
				text: "Choose 'Delivery Only' or 'Set Up and Serve' for a hands-on touch."
			},
			{
				label: 'Tailor-Made Menus',
				text: 'Menus tailored to your preferences, dietary needs, and budget.'
			}
		]
	},
	{
		title: 'Full-Service Events',
		bullets: [
			{
				label: 'Advance Notice',
				text: 'We require a minimum of two (2) weeks (14 days) advance notice for Full-Service Catering events. All final event details — menu, guest count, venue location, and service times — are confirmed two weeks before the event. Events needing extra planning (menu tastings, site visits, venue coordination, insurance/contracts) should allow additional lead time.'
			},
			{
				label: 'Contract & Minimum Spend',
				text: 'Full-Service events require a signed contract on file, provided once we secure your credit card information, plus a minimum expenditure of $1,000 on food and drink before service fees, gratuity, and tax.'
			},
			{
				label: 'Cancellation Fees',
				text: 'Cancel within 48 hours of the event: 100% cancellation fee, covering food, beverage, service fees, gratuity, and tax. Cancel between 48 hours and 1 week out: 50% cancellation fee on the same.'
			},
			{
				label: 'Staffing',
				text: 'Minimum of two (2) SmoQe Signals BBQ team members required per Full-Service event; our team determines exact staffing needs based on the event.'
			},
			{
				label: 'Cleanup & Trash',
				text: 'We handle buffet/prep-area cleanup and pre-bussing/clearing tables, plus rental cleanup tasks (scraping, stacking) — we do not wash or sanitize rentals. We dispose of our own buffet/prep trash; removing accumulated event trash is optional and incurs a $450 fee if requested.'
			}
		]
	}
];

// Always-on holiday-meats promotion (home page).
export const HOLIDAY_MEATS = {
	eyebrow: 'Holiday Pre-Orders',
	title: 'Holiday Smoqed Meats',
	blurb:
		"Make the holidays easy — let us handle the centerpiece. Spots go fast. Join the list and we'll reach out with pre-order details as soon as they open.",
	items: [
		{
			name: 'Whole Turkeys — Deep-Fried or Smoqed',
			desc: 'Juicy golden deep-fried, or low-and-slow Smoqed whole turkeys, ready to carve for your table.'
		},
		{
			name: 'Double Smoqed Honey Ham',
			desc: 'Twice-smoked and glazed with honey for a sweet, deeply smoky holiday ham.'
		}
	]
};

export const POSTS: BlogPost[] = [
	{
		id: 'seed-welcome',
		slug: 'welcome-to-the-new-smoqe-signals',
		title: 'Welcome to the New Smoqe Signals',
		date: '2026-03-20',
		readMins: 3,
		category: 'News',
		cover: '/images/brisket-board.png',
		excerpt:
			'A faster site, an online rub shop, and an easier way to book the truck. Here is what changed and why.',
		featured: true,
		content: null,
		bodyText: [
			'Twelve years ago we were a concession stand and a borrowed smoker. Today we are a food truck, a catering crew, and now a shelf of rubs you can put in your own kitchen. It felt like time the website caught up.',
			"The new site does three things the old one couldn't. You can sign up for the newsletter and actually hear from us. You can book catering through a real form instead of a phone-tag marathon. And you can buy the rubs we have been handing out at events for years.",
			'Everything you loved is still here — the menu, the story, the history that runs back to Paris, Tennessee and our uncles Clyde and Clay. We just gave it a porch to sit on.',
			'Pull up a chair. There is more coming: recipes, pit tips, and the occasional argument about sauce.'
		]
	},
	{
		id: 'seed-patience',
		slug: 'the-secret-is-patience',
		title: 'The Secret Is Patience (and Hickory)',
		date: '2026-04-08',
		readMins: 5,
		category: 'Pit Tips',
		cover: '/images/bbq-spread.jpg',
		excerpt:
			'Low and slow is not a slogan, it is a discipline. A few things we have learned standing next to the smoke.',
		featured: false,
		content: null,
		bodyText: [
			'People ask for the secret all the time. The honest answer is boring: time. A brisket does not care about your schedule. It is done when it is done, and trying to rush it is the fastest way to ruin good meat.',
			'We run hickory low and slow — 225 to 250, steady, all day. The bark you are chasing comes from a dry surface and a patient fire, not from cranking the heat. If you are peeking every ten minutes, you are losing more smoke than you think.',
			'Rub matters, but it matters less than people hope. A balanced rub seasons the bark and helps it set. It will not save a fire you did not tend. Salt early, smoke steady, rest long.',
			'That rest at the end is the part everybody skips. Give a brisket an hour wrapped and resting before you slice it. The difference is night and day.'
		]
	},
	{
		id: 'seed-paris',
		slug: 'from-paris-tennessee',
		title: 'From Paris, Tennessee to Music City',
		date: '2026-05-02',
		readMins: 4,
		category: 'Our Story',
		cover: '/images/shon.png',
		excerpt:
			'West Tennessee taught us the fire. Nashville gave us the crowd. A short history of how we got here.',
		featured: false,
		content: null,
		bodyText: [
			'Before there was a truck, there was a backyard in Paris, Tennessee, and two uncles named Clyde and Clay who treated barbecue like a craft worth getting right. Most of what we cook traces back to standing next to them, waiting.',
			'When we brought it to Nashville in 2012, we were not sure the city needed another BBQ outfit. Turns out there is always room for the real thing. The line told us we were onto something.',
			'West Tennessee barbecue is its own dialect — drier, smokier, less drowned in sauce than what you find further south. We have kept that accent on purpose. It is who we are.',
			'Every plate we serve is a little bit of Paris carried up the road. That is the legacy, and we are not done writing it.'
		]
	}
];
