<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Tristar from '$lib/components/Tristar.svelte';
	import NewsletterBand from '$lib/components/NewsletterBand.svelte';

	const stats = [
		{ n: '2012', l: 'Started with a smoker on the porch' },
		{ n: '2016', l: 'First food truck hit the road' },
		{ n: '2027', l: 'Flagship location opens' }
	];
</script>

<svelte:head>
	<title>The History | Smoqe Signals BBQ</title>
	<meta
		name="description"
		content="Founded in 2012 with a smoker on the front porch, Smoqe Signals BBQ grew from a Nashville side hustle into a food truck carrying the West Tennessee tradition of low-and-slow BBQ."
	/>
</svelte:head>

<div class="rise">
	<!-- hero -->
	<section class="bg-smoke-900 relative overflow-hidden text-white">
		<div class="absolute inset-0">
			<img src="/images/bbq-spread.jpg" alt="" class="h-full w-full object-cover opacity-[0.32]" />
			<div
				class="absolute inset-0"
				style="background:linear-gradient(180deg, rgba(12,9,6,.8), rgba(12,9,6,.92))"
			></div>
		</div>
		<div class="container-tight relative max-w-3xl py-[84px] text-center">
			<div class="mb-[18px] flex justify-center"><Tristar lg /></div>
			<span class="eyebrow text-ember">The History</span>
			<h1 class="display my-4 text-[clamp(2.5rem,7vw,4.75rem)]">
				Nashville bred,<br />Memphis approved,<br />Tennessee tradition
			</h1>
		</div>
	</section>

	<section class="py-[88px]">
		<div class="container-tight max-w-3xl">
			<div class="text-ink text-[18px] leading-[1.8]">
				<p class="mb-6">
					<span class="display text-flame mr-2 text-[22px]">Smoqe Signals BBQ</span> was founded in
					<strong>2012</strong> as a hobby and a way to pass time. In the beginning there was no name,
					only a smoker on the front porch. At the time, Shon was working in the marketing department
					at Bridgestone Corporation, promoting events on the side. He'd always enjoyed cooking as a hobby
					and a way to relieve stress after a long day in the office. "I've never been much of a heavy
					eater — in the beginning I'd cook and just give it away to friends." Soon his corporate and
					event life got too busy and he stopped cooking. That only made demand grow — the same people
					he used to feed for free now offered to pay him since he no longer had the time. Back then there
					wasn't a name, there wasn't a business, only love. Demand grew so much that Shon started leaving
					work at lunch on Fridays — slipping out from Bridgestone's corporate offices just to check the
					ribs he'd put on that morning. Hickory wood has a sweet aroma that doesn't come out of your
					clothes easily. When he got back to the office, his coworkers would ask, his manager would order,
					and the rest is history. From that day until his last day there, the office ordered every single
					week.
				</p>
				<p class="text-ink-soft mb-6">
					As fate would have it, demand got so large Shon could no longer keep up on the small grill
					he'd been given as a gift — a Home Depot special. With the proceeds from the side hustle,
					he drove down to Warrior, Alabama and bought a huge reverse-flow smoker he could pull
					behind his pickup truck — there was no looking back. With just a smoker and great food,
					Shon became a staple outside local nightclubs like Club Miami, Anthem, The 5 Spot, and
					events like The BoomBap. He still didn't consider BBQ a full-time thing until he switched
					companies — and in the interview, they asked about the BBQ. "I brought a bottle of my
					seasoning into the interview and gave it to them." Shon let it be known BBQ came first.
					The company was impressed enough to hire him anyway and gave him the freedom to keep
					pursuing it. He was known as "FoodTruck" around the office before he even had one. That's
					where Smoqe Signals BBQ was born. In 2016, Shon bought his first food truck, closing out
					his corporate chapter and opening the Smoqe Signals era.
				</p>
				<p class="text-ink-soft mb-6">
					Smoqe Signals holds to the West Tennessee tradition of low-and-slow BBQ. No gas, chips,
					chunks, or pellets — only locally sourced hickory, oak, and fruit woods like cherry and
					Georgia peach. The team sources meats locally and uses only the freshest ingredients;
					sides are made fresh daily (most meat-free), adapting to seasonal limitations and personal
					request.
				</p>
				<p class="text-ink-soft">
					Whether you're planning a cozy backyard gathering or a large corporate event, Smoqe
					Signals BBQ has got you covered. Book the food truck — equipped with a wood-burning
					reverse-flow smoker — for the authentic West TN BBQ experience that transforms any space
					into BBQ heaven.
				</p>
			</div>

			<div class="border-flame bg-paper-2 mt-10 rounded-lg border-l-4 p-7">
				<span class="eyebrow text-ember">The Pitmaster</span>
				<h2 class="display mt-2 text-2xl">Shon "Slim" Harmon</h2>
				<p class="text-ink-soft mt-3 text-[17px] leading-relaxed">
					Slim is a historian and connoisseur of all things BBQ. His love for the craft set him on a
					path to merge traditional BBQ from Paris, TN — the catfish capital of the world — with the
					vibrant Nashville culinary scene. That merger created the brand SmoQe Signals BBQ: a food
					truck, a catalogue of seasonings, and a set of live fire cooking techniques all his own.
					He's since written a BBQ cookbook (out Late Summer 2026) and a book about the journey (out
					Fall 2027). He also consults with food truck and hospitality operators building the same
					kind of business.
				</p>
				<p class="text-ink-soft mt-3 text-[17px] leading-relaxed">
					Today, Shon is expanding beyond the food truck and into hospitality development as
					co-founder of Project 1410 — the first development under his newly formed partnership,
					opening Spring 2027. Project 1410 is the redevelopment of a 13,000-square-foot warehouse
					on Buchanan Street in North Nashville, anchored by the flagship SmoQe Signals BBQ joint.
					Two additional concepts will open alongside it — Shon's first ventures outside BBQ.
				</p>
			</div>

			<blockquote class="border-flame mt-10 border-l-4 pl-6">
				<p class="text-ink text-[19px] leading-[1.7] font-semibold">
					"Someone caught my Facebook Live — opening the smoker to check the meat — and said: 'That
					boy is making smoke signals with that smoker.' That's where the name came from.
					<em class="text-flame not-italic">Follow the SmoQe.</em>"
				</p>
				<footer class="text-ink-soft mt-3 text-sm font-semibold">
					— Slim, from <cite>The Art of Pulled Pork</cite> (available Late Summer 2026)
				</footer>
			</blockquote>

			<div class="my-12 grid gap-5 sm:grid-cols-3">
				{#each stats as s (s.l)}
					<div class="card-brand p-6 text-center">
						<div class="display text-flame text-[clamp(1.6rem,3vw,2.125rem)]">{s.n}</div>
						<div class="text-ink-soft mt-1.5 text-sm font-semibold">{s.l}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="container-wide">
			<div class="border-paper-line grid overflow-hidden rounded-lg border md:grid-cols-2">
				<img
					src="/images/shon.png"
					alt="Shon, pitmaster and owner"
					class="h-full min-h-[420px] w-full object-cover object-top"
				/>
				<div class="bg-smoke-900 flex flex-col justify-center p-12 text-white">
					<span class="eyebrow text-ember">The Pitmaster</span>
					<h2 class="display my-4 text-[clamp(1.75rem,3.6vw,2.5rem)]">Patience over shortcuts</h2>
					<p class="text-cream-text text-[16.5px] leading-relaxed">
						"Because none of it (BBQ/Business) happens without the fundamentals. None of it happens
						without the patience, the discipline, and the love for the craft that this book is built
						on."
					</p>
					<p class="text-cream-muted mt-3 text-sm font-semibold">
						— Slim, from <cite>The Art of Pulled Pork</cite> (available Late Summer 2026)
					</p>
					<a href="/food-truck" class="btn btn-primary mt-7 self-start">
						Book the Truck <ArrowRight size={18} />
					</a>
				</div>
			</div>
		</div>
	</section>

	<NewsletterBand />
</div>
