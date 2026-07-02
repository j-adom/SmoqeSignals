/**
 * Seed script — populates an admin user, a starter product catalog, and a
 * couple of blog posts so the CMS isn't empty on first run.
 *
 *   pnpm seed
 *
 * Safe to re-run: it skips anything that already exists (matched by slug/email).
 */
import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../src/payload.config';

type LexParagraph = { text: string };
function lexical(paragraphs: string[]) {
	return {
		root: {
			type: 'root',
			format: '',
			indent: 0,
			version: 1,
			direction: 'ltr',
			children: paragraphs.map((text) => ({
				type: 'paragraph',
				format: '',
				indent: 0,
				version: 1,
				direction: 'ltr',
				children: [{ type: 'text', text, format: 0, version: 1, mode: 'normal', style: '', detail: 0 }]
			}))
		}
	};
}

const PRODUCTS = [
	{ name: "Slim's Original Shake-A-Rub", category: 'Dry Rub', price: 12, heat: 2, tag: 'Best Seller', size: '6 oz shaker', featured: true, short: 'All-natural all-purpose rub. The one we put on everything.', long: 'The rub that started it all. A balanced, all-natural blend built for pork, chicken, and ribs — equal parts sweet, savory, and smoke.', notes: ['All natural', 'No MSG', 'Gluten free'] },
	{ name: 'Sweet Heat Rib Rub', category: 'Dry Rub', price: 13, heat: 3, tag: 'Hot', size: '6 oz shaker', featured: true, short: 'Brown sugar up front, cayenne on the finish. Built for ribs.', long: 'Brown sugar and paprika lay down the bark while cayenne and chili bring a slow-building backdoor heat.', notes: ['All natural', 'Medium heat'] },
	{ name: 'Brisket & Beef Rub', category: 'Dry Rub', price: 14, heat: 1, tag: null, size: '7 oz shaker', featured: true, short: 'Coarse black pepper, sea salt, and a whisper of coffee.', long: 'Texas-style simplicity with a West Tennessee accent. Coarse-cracked pepper and sea salt build the bark.', notes: ['All natural', 'Mild'] },
	{ name: 'Nashville Hot Seasoning', category: 'Seasoning', price: 13, heat: 4, tag: 'Hot', size: '6 oz shaker', featured: false, short: 'A nod to our hometown. Cayenne-forward and unapologetic.', long: 'Our tribute to the city that raised us. Real Music City heat, balanced with brown sugar and garlic.', notes: ['All natural', 'Hot'] },
	{ name: 'Signature BBQ Sauce', category: 'Sauce', price: 11, heat: 2, tag: null, size: '16 oz bottle', featured: false, short: 'Tomato base, molasses, vinegar tang. The house pour.', long: 'A Tennessee table sauce that knows when to stop. Thick enough to cling, thin enough to mop.', notes: ['Small batch', 'Medium'] },
	{ name: 'Pitmaster Trio Gift Set', category: 'Gift Set', price: 34, heat: 2, tag: 'Save $4', size: '3 × 6 oz shakers', featured: true, short: 'Original, Sweet Heat, and Brisket rubs in a boxed set.', long: 'Three of our most-reached-for shakers, boxed up with a recipe card. The easiest way to gift a backyard pitmaster.', notes: ['Gift boxed', 'Recipe card included'] }
];

const POSTS = [
	{ title: 'Welcome to the New Smoqe Signals', category: 'news', readMins: 3, featured: true, excerpt: 'A faster site, an online rub shop, and an easier way to book the truck.', body: ['Twelve years ago we were a concession stand and a borrowed smoker. Today we are a food truck, a catering crew, and now a shelf of rubs you can put in your own kitchen.', 'You can sign up for the newsletter, book catering through a real form, and buy the rubs we have been handing out at events for years.', 'Pull up a chair. There is more coming: recipes, pit tips, and the occasional argument about sauce.'] },
	{ title: 'The Secret Is Patience (and Hickory)', category: 'pit-tips', readMins: 5, featured: false, excerpt: 'Low and slow is not a slogan, it is a discipline.', body: ['People ask for the secret all the time. The honest answer is boring: time. A brisket does not care about your schedule.', 'We run hickory low and slow — 225 to 250, steady, all day. The bark comes from a dry surface and a patient fire.', 'Salt early, smoke steady, rest long. That rest at the end is the part everybody skips.'] }
];

async function run() {
	const payload = await getPayload({ config });

	// Admin user
	const email = process.env.SEED_ADMIN_EMAIL || 'admin@smoqesignals.com';
	const password = process.env.SEED_ADMIN_PASSWORD || 'changeme123';
	const existingUsers = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 });
	if (!existingUsers.docs.length) {
		await payload.create({ collection: 'users', data: { email, password, name: 'Smoqe Admin', role: 'admin' } });
		payload.logger.info(`Created admin user: ${email} / ${password}`);
	}

	// Products
	for (const p of PRODUCTS) {
		const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
		const existing = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1 });
		if (existing.docs.length) continue;
		await payload.create({
			collection: 'products',
			data: {
				...p,
				slug,
				inStock: true,
				notes: p.notes.map((note) => ({ note }))
			} as never
		});
		payload.logger.info(`Seeded product: ${p.name}`);
	}

	// Posts
	for (const post of POSTS) {
		const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
		const existing = await payload.find({ collection: 'blogPosts', where: { slug: { equals: slug } }, limit: 1 });
		if (existing.docs.length) continue;
		await payload.create({
			collection: 'blogPosts',
			data: {
				title: post.title,
				slug,
				excerpt: post.excerpt,
				category: post.category,
				readMins: post.readMins,
				featured: post.featured,
				status: 'published',
				publishDate: new Date().toISOString(),
				content: lexical(post.body)
			} as never
		});
		payload.logger.info(`Seeded post: ${post.title}`);
	}

	payload.logger.info('Seed complete.');
	process.exit(0);
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
