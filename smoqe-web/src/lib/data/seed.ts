import type {
	BizInfo,
	BlogPost,
	Faq,
	MenuItem,
	Product
} from '$lib/types';

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
		long: "The rub that started it all. A balanced, all-natural blend built for pork, chicken, and ribs — equal parts sweet, savory, and smoke. Shake it on before the pit and let low-and-slow do the rest.",
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
		long: "Texas-style simplicity with a West Tennessee accent. Coarse-cracked pepper and sea salt build the bark; a touch of ground coffee deepens the smoke ring. Made for brisket, beef ribs, and tri-tip.",
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
		long: "A gold-standard mustard sauce for pulled pork and chicken. Yellow mustard and honey, sharpened with cider vinegar and a pinch of cayenne. Bright, tangy, and built to cut through fat.",
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

export const PRODUCT_CATEGORIES = ['All', 'Dry Rub', 'Seasoning', 'Sauce', 'Gift Set', 'Gear'] as const;

// Walk-up truck sides — single-serving style.
const TRUCK_SIDES: MenuItem[] = [
	{ name: 'Baked Beans', desc: 'Slow-cooked and smoky.' },
	{ name: 'Creamy Coleslaw', desc: 'Cool, crisp, and tangy.' },
	{ name: 'Fries', desc: 'Hot, crisp, and truck-fresh.' },
	{ name: 'Mac & Cheese', desc: 'Rich, creamy, and always a favorite.' },
	{ name: 'Potato Salad', desc: 'Classic cookout style.' }
];

// Catering sides — offered by the pint, quart, or full pan.
const CATERING_SIDES: MenuItem[] = [
	{ name: 'Baked Beans', desc: 'Slow-cooked and smoky.' },
	{ name: 'Creamy Coleslaw', desc: 'Cool, crisp, and tangy.' },
	{ name: 'Mac & Cheese', desc: 'Rich, creamy, and event-ready.' },
	{ name: 'Potato Salad', desc: 'Classic cookout style.' },
	{ name: 'Green Beans', desc: 'Smoked Southern-style green beans.' },
	{ name: 'Collard Greens', desc: 'Southern greens with deep flavor.' },
	{ name: 'Cornbread', desc: 'Sweet, sturdy, made for BBQ plates.' }
];

// Walk-up / event truck menu — plates, loaded specialties, wings, and sides served on site.
export const TRUCK_MENU: {
	plates: MenuItem[];
	specialties: MenuItem[];
	wings: { note: string; sauces: string[] };
	sides: MenuItem[];
} = {
	plates: [
		{ name: 'Pulled Pork Plate', desc: 'Slow-smoked, hand-pulled, with two classic sides.' },
		{ name: 'Beef Brisket Plate', desc: 'Hickory-smoked slices with that legendary bark, two sides.' },
		{ name: 'Smoked Wing Basket', desc: "Crisp-skin wings tossed in Slim's rub, choice of sauce." },
		{ name: 'Veggie Pulled "Pork"', desc: 'Our secret vegetarian recipe with true BBQ flavor, two sides.' }
	],
	specialties: [
		{ name: 'BBQ Fries', desc: 'Fries piled high with smoked meat and sauce.' },
		{ name: 'Mega Fries', desc: 'A loaded, share-worthy mountain of BBQ fries.' },
		{ name: 'BBQ Nachos', desc: 'Crisp chips, smoked meat, cheese, and the works.' },
		{ name: 'Mega Nachos', desc: 'Our full-size loaded nacho platter.' },
		{ name: "Smack'n Mac'n Cheese", desc: 'Creamy mac topped with smoked meat.' }
	],
	wings: {
		note: "Deep-fried and tossed in your choice of Slim's homemade sauce. Available in 6, 12, or 18-piece portions.",
		sauces: [
			'BBQ',
			'Honey Gold',
			'Honey Hot',
			'Lemon Pepper',
			'Buffalo Lemon Pepper',
			'Honey Hot Lemon Pepper',
			'BBQ Lemon Pepper'
		]
	},
	sides: TRUCK_SIDES
};

// Catering meats — by the sandwich or the pound, built into buffets and full-service spreads.
export const CATERING_MENU: { meats: MenuItem[]; sides: MenuItem[]; sidesNote: string } = {
	meats: [
		{ name: 'Pulled Pork', desc: 'Smoky, tender, hand-pulled — by the sandwich or the pound.' },
		{ name: 'Brisket', desc: 'Sliced or chopped, hickory-smoked to juicy perfection.' },
		{ name: 'Chopped Chicken', desc: 'Smoked and chopped — by the sandwich or the pound.' },
		{ name: 'Pork Ribs', desc: 'Dry-rubbed and smoked low — half rack or full rack.' },
		{ name: 'Pork Rib Tips', desc: 'Meaty, smoky rib tips by the pound.' },
		{ name: 'Turkey Tips', desc: 'Smoked turkey tips by the pound.' },
		{ name: 'Smoked Sliced Turkey', desc: 'Tender, lightly seasoned slices for a lighter spread.' },
		{ name: 'Smoked Wings', desc: 'Crisp outside, juicy inside, tossed in your choice of sauce.' },
		{ name: 'Beef Sausage Links', desc: 'Smoked links with a savory kick.' },
		{ name: 'Veggie Pulled "Pork"', desc: 'Our secret vegetarian recipe with true BBQ flavor.' },
		{ name: 'Whole Hog', desc: 'Feeds a crowd (125–150). Call for inquiries.' }
	],
	sides: CATERING_SIDES,
	sidesNote: 'Sides are available by the Pint, Quart, or Full Pan. Vegetarian friendly unless specified.'
};

// Pre-built catering packages (buffet style). Pricing is by quote.
export const CATERING_PACKAGES: { name: string; blurb: string; choices: string[] }[] = [
	{
		name: 'Meat & 3 Package',
		blurb: 'Choice of 1 meat, 3 sides, and 1 dessert.',
		choices: [
			'Meat (1): Ribs, Smoked Chicken, Smoked Turkey, or Pulled Pork',
			'Sides (3): Mac & Cheese, BBQ Beans, Potato Salad, Coleslaw, or Smoked Green Beans',
			'Dessert (1): Banana Pudding or Seasonal Cobbler'
		]
	},
	{
		name: 'Lunch Package',
		blurb: 'A salad, two meats, three sides, and a dessert.',
		choices: [
			"Salad: Caesar, Garden, or Chef's Seasonal",
			'Meats (2): Ribs, Smoked Chicken, Smoked Turkey, or Pulled Pork',
			'Sides (3): Mac & Cheese, BBQ Beans, Potato Salad, Coleslaw, or Smoked Green Beans',
			'Dessert (1): Banana Pudding or Seasonal Cobbler'
		]
	},
	{
		name: 'Dinner Package',
		blurb: 'A salad, an appetizer, two meats, three sides, and two desserts.',
		choices: [
			"Salad: Caesar, Garden, or Chef's Seasonal",
			'Appetizer: Smoked Wings or Cowboy Caviar',
			'Meats (2): Ribs, Smoked Chicken, Smoked Turkey, or Pulled Pork',
			'Sides (3): Mac & Cheese, BBQ Beans, Potato Salad, Coleslaw, or Smoked Green Beans',
			'Desserts (2): Banana Pudding or Seasonal Cobbler'
		]
	},
	{
		name: 'Tailgate Wings Package',
		blurb:
			"Smoked wings by the batch — choice of Alabama White, Sweet James Jones, or Slim's Shake-A-Plenty Spice Rub. Available in 25, 50, or 100 count.",
		choices: []
	},
	{
		name: 'Whole Hog Package',
		blurb: 'Feeds 125–150 people. Call for inquiries.',
		choices: []
	}
];

export const CATERING_PACKAGES_NOTE =
	'Catering packages are for 25 people or more and served buffet style. Every package includes plates, napkins, buns, utensils, sauces, cups, sweet & unsweet tea, lemonade, ice, corn muffins, chafing dishes, and set up. Servers, additional meats, sides, and desserts are available on request — contact us for a quote.';

export const CATERING_DESSERTS: MenuItem[] = [
	{ name: 'Banana Pudding', desc: 'Classic Southern banana pudding.' },
	{ name: 'Seasonal Cobbler', desc: "Warm cobbler made with the season's fruit." }
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
		a: 'We have a $300 minimum on deliveries before tax and the delivery fee — ideal for roughly 20 people.'
	},
	{
		q: 'How much is the delivery fee?',
		a: 'A 15% service fee is applied to your total food and beverage.'
	},
	{
		q: 'What is included in the paper goods sets?',
		a: 'Each paper goods set includes heavy-duty paper plates, cups, wet naps, a culinary set, and a dinner napkin — $1.75 per person.'
	},
	{
		q: 'What will the food be delivered in?',
		a: 'Our food is delivered in disposable aluminum serving trays. Wire chafing (warming) sets are available for $15 per set.'
	},
	{
		q: 'Can you accommodate dietary restrictions?',
		a: 'Absolutely. Our Veggie Pulled "Pork" lets vegetarians in on the real BBQ experience, and most rubs are gluten free. Note any allergies or dietary needs when you book and we will plan around them.'
	},
	{
		q: 'How do deposits work?',
		a: 'A 50% deposit secures your date, with the balance due before the event. Final menu and pricing are confirmed once we review your details.'
	}
];

// Highlight bullets for the "What We Offer" block on the catering page.
export const WHAT_WE_OFFER = [
	{ t: '$300 Order Minimum', d: 'Ideal for approximately 20 people — our catering packages start at this budget-friendly threshold.' },
	{ t: '48-Hour Notice', d: 'While we pride ourselves on flexibility, a 48-hour notice lets us craft your feast to perfection.' },
	{ t: 'Cancellation Policy', d: 'Please allow 24 hours for cancellations. Within 24 hours of your scheduled delivery, a 50% charge applies.' },
	{ t: 'Full-Service Catering', d: "For a truly immersive experience, provide us with at least two (2) weeks' notice for full-service catering." },
	{ t: 'Delivery Options', d: "Choose 'Delivery Only' or 'Set Up and Serve' for a hands-on touch." },
	{ t: 'Tailor-Made Menus', d: 'Menus tailored to your preferences, dietary needs, and budget.' }
];

// Longer-form terms for legal protection ("Catering Made Easy").
export const CATERING_TERMS: string[] = [
	"We kindly request a minimum of two (2) weeks or 14 days of advance notice for Full Service Catering events. All final event details — including the menu, guest count, venue location, and service times — are confirmed two (2) weeks before the event. If your event requires additional planning such as menu tastings, site visits, or venue coordination, please provide sufficient lead time to accommodate these needs. This may also include arranging insurance and contracts, among other considerations.",
	"For all Full Service Catering events, we require a signed contract on file, which we provide once we secure your credit card information. Full Service events have a minimum expenditure requirement of $1,000 on food and drink before factoring in service fees, gratuity, and tax.",
	"In the event of a cancellation within 48 hours of the designated arrival time, a 100% cancellation fee applies to cover all costs, including food, beverage, service fees, gratuity, and tax. Cancellations occurring within one (1) week or seven (7) days before the designated arrival time but prior to the 48-hour mark will result in a 50% cancellation fee for all food, beverage, service fees, and tax.",
	"For Full Service events, we require a minimum of two (2) SmoQe Signals BBQ team members to ensure the seamless execution of your event. Our catering team determines the specific number of team members needed based on the event's requirements.",
	"Our responsibilities include event cleanup related to our buffet and prep area, as well as pre-bussing and clearing dinner tables. While we handle rental cleanup tasks such as plate scraping, stacking, and organizing, please note that we do not wash and sanitize rentals.",
	"Regarding garbage removal, we are responsible for disposing of our buffet and preparation trash. However, we do not handle the removal of accumulated event trash unless both the guest and SmoQe Signals BBQ agree to this service, which incurs a $450 trash removal fee added to the final invoice."
];

// Always-on holiday-meats promotion (home page).
export const HOLIDAY_MEATS = {
	eyebrow: 'Holiday Pre-Orders',
	title: 'Holiday Smoqed Meats',
	blurb: 'Make the holidays easy — let us handle the centerpiece. Pre-order early; holiday dates book fast.',
	items: [
		{ name: 'Whole Turkeys — Deep-Fried or Smoqed', desc: 'Juicy golden deep-fried, or low-and-slow Smoqed whole turkeys, ready to carve for your table.' },
		{ name: 'Double Smoqed Honey Ham', desc: 'Twice-smoked and glazed with honey for a sweet, deeply smoky holiday ham.' }
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
		excerpt: 'A faster site, an online rub shop, and an easier way to book the truck. Here is what changed and why.',
		featured: true,
		content: null,
		bodyText: [
			"Twelve years ago we were a concession stand and a borrowed smoker. Today we are a food truck, a catering crew, and now a shelf of rubs you can put in your own kitchen. It felt like time the website caught up.",
			"The new site does three things the old one couldn't. You can sign up for the newsletter and actually hear from us. You can book catering through a real form instead of a phone-tag marathon. And you can buy the rubs we have been handing out at events for years.",
			"Everything you loved is still here — the menu, the story, the history that runs back to Paris, Tennessee and our uncles Clyde and Clay. We just gave it a porch to sit on.",
			"Pull up a chair. There is more coming: recipes, pit tips, and the occasional argument about sauce."
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
		excerpt: 'Low and slow is not a slogan, it is a discipline. A few things we have learned standing next to the smoke.',
		featured: false,
		content: null,
		bodyText: [
			"People ask for the secret all the time. The honest answer is boring: time. A brisket does not care about your schedule. It is done when it is done, and trying to rush it is the fastest way to ruin good meat.",
			"We run hickory low and slow — 225 to 250, steady, all day. The bark you are chasing comes from a dry surface and a patient fire, not from cranking the heat. If you are peeking every ten minutes, you are losing more smoke than you think.",
			"Rub matters, but it matters less than people hope. A balanced rub seasons the bark and helps it set. It will not save a fire you did not tend. Salt early, smoke steady, rest long.",
			"That rest at the end is the part everybody skips. Give a brisket an hour wrapped and resting before you slice it. The difference is night and day."
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
		excerpt: 'West Tennessee taught us the fire. Nashville gave us the crowd. A short history of how we got here.',
		featured: false,
		content: null,
		bodyText: [
			"Before there was a truck, there was a backyard in Paris, Tennessee, and two uncles named Clyde and Clay who treated barbecue like a craft worth getting right. Most of what we cook traces back to standing next to them, waiting.",
			"When we brought it to Nashville in 2012, we were not sure the city needed another BBQ outfit. Turns out there is always room for the real thing. The line told us we were onto something.",
			"West Tennessee barbecue is its own dialect — drier, smokier, less drowned in sauce than what you find further south. We have kept that accent on purpose. It is who we are.",
			"Every plate we serve is a little bit of Paris carried up the road. That is the legacy, and we are not done writing it."
		]
	}
];
