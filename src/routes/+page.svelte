<script lang="ts">
  let email = $state('');
  let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
  let message = $state('');

  async function subscribe(e: Event) {
    e.preventDefault();
    status = 'loading';
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        status = 'success';
        message = data.message || 'Thanks for subscribing!';
        email = '';
      } else {
        status = 'error';
        message = data.error || 'Failed to subscribe.';
      }
    } catch (e) {
      status = 'error';
      message = 'An unexpected error occurred.';
    }
  }
</script>

<svelte:head>
  <title>SmoQe Signals BBQ | Nashville Bred, Memphis Approved</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative flex h-[600px] items-center justify-center text-center overflow-hidden bg-cover bg-center" style="background-image: url('/images/hero_bbq.png');">
  <div class="absolute inset-0 bg-black/60"></div>
  <div class="relative z-10 mx-auto max-w-4xl px-6">
    <h1 class="mb-4 text-4xl font-extrabold text-white md:text-6xl tracking-tight">
      SmoQe Signals BBQ:
    </h1>
    <h2 class="mb-8 text-2xl font-light text-[#f4f4f4] md:text-4xl">
      Nashville Bred<br />Memphis Approved,<br />Tennessee Tradition
    </h2>
    <a href="/food-truck-menu" class="inline-block rounded bg-[#f4511e] px-8 py-4 font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#d04014]">
      Book Us for Your Event
    </a>
  </div>
</section>

<!-- Our Story Section -->
<section class="py-20 px-6 max-w-4xl mx-auto text-center">
  <h2 class="text-4xl font-bold text-[#32373c] mb-6">Our Story</h2>
  <div class="mx-auto w-16 border-b-4 border-[#f4511e] mb-8"></div>
  <p class="text-lg text-[#666] leading-relaxed mb-8">
    At SmoQe Signals BBQ, we're more than just pit masters and flavor enthusiasts. We're storytellers of taste, weaving the rich traditions of West Tennessee BBQ into the vibrant tapestry of Nashville's culinary scene. Hailing from Paris, TN, our journey began with a passion ignited by flavors passed down from uncles Clyde and Clay – a legacy that's still present in every mouthwatering bite. From a humble concession stand to the thriving SmoQe Signals BBQ of today, our dedication to bringing you the true essence of West TN BBQ remains unwavering.
  </p>
  <a href="/about-us" class="inline-block rounded bg-[#f4511e] px-8 py-3 font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#d04014]">
    The History
  </a>
</section>

<!-- Features Row -->
<section class="bg-white py-20 px-6">
  <div class="mx-auto max-w-7xl grid gap-8 md:grid-cols-3">
    <!-- Feature 1 -->
    <div class="text-center group flex flex-col items-center">
      <img src="/images/smoker.png" alt="Authentic Pit Smoking" class="h-48 w-full object-cover rounded-lg shadow-sm mb-6 transition-transform group-hover:scale-105" />
      <h3 class="text-xl font-bold text-[#32373c] mb-3">Authentic Pit Smoking</h3>
      <p class="text-sm font-medium text-[#666]">Infused Smoky Flavor, Time-Honored Tradition</p>
    </div>
    <!-- Feature 2 -->
    <div class="text-center group flex flex-col items-center">
      <img src="/images/food-truck-copy.png" alt="Roaming Flavor Oasis" class="h-48 w-full object-cover rounded-lg shadow-sm mb-6 transition-transform group-hover:scale-105" />
      <h3 class="text-xl font-bold text-[#32373c] mb-3">Roaming Flavor Oasis</h3>
      <p class="text-sm font-medium text-[#666]">On-the-Move BBQ Delight</p>
    </div>
    <!-- Feature 3 -->
    <div class="text-center group flex flex-col items-center">
      <img src="/images/plates2.png" alt="Event-Crafted Catering" class="h-48 w-full object-cover rounded-lg shadow-sm mb-6 transition-transform group-hover:scale-105" />
      <h3 class="text-xl font-bold text-[#32373c] mb-3">Event-Crafted Catering</h3>
      <p class="text-sm font-medium text-[#666]">Culinary Magic, Unforgettable Events</p>
    </div>
  </div>
</section>

<!-- Catering Highlight -->
<section class="py-20 px-6 bg-[#f4f4f4]">
  <div class="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
    <div class="md:w-1/2">
      <img src="/images/food-truck_white.png" alt="White Food Truck illustration" class="w-full max-w-md mx-auto" />
      <div class="mt-8 text-center md:text-left">
        <h4 class="text-2xl font-bold text-[#32373c] mb-4 relative inline-block">
          Elevate Your Occasion
          <div class="absolute -bottom-2 left-0 w-12 border-b-4 border-[#f4511e]"></div>
        </h4>
        <p class="text-[#666] leading-relaxed mt-4">
          From corporate gatherings to cherished celebrations, our catering services bring the flair of authentic West TN BBQ to every event. Discover the perfect blend of tradition and taste that makes your occasion unforgettable.
        </p>
      </div>
    </div>
    <div class="md:w-1/2 p-10 bg-white shadow-xl rounded-lg">
      <h2 class="text-4xl font-extrabold text-[#32373c] mb-4">Catering and Events</h2>
      <h3 class="text-2xl font-medium text-[#f4511e] mb-6">Crafting Memorable Culinary Experiences</h3>
      <a href="/catering" class="inline-block rounded bg-[#32373c] px-8 py-4 font-bold uppercase tracking-wider text-white transition-colors hover:bg-black">
        Explore Catering
      </a>
    </div>
  </div>
</section>

<!-- Savor the Feast -->
<section class="bg-[#32373c] py-24 px-6 text-center text-white relative">
  <div class="mx-auto max-w-4xl relative z-10">
    <h2 class="text-4xl font-bold mb-8 text-[#f4511e]">Savor the Feast</h2>
    <p class="text-lg text-white/80 leading-relaxed mb-6">
      At SmoQe Signals BBQ, we're not just serving food – we're crafting culinary experiences that leave you speechless. From the juicy, tender brisket to the irresistibly crispy wings, each dish is a masterpiece of flavor and passion.
    </p>
    <p class="text-lg text-white/80 leading-relaxed mb-8">
      Our wings are a sensation of textures, crispy on the outside, succulent on the inside. The brisket, slow-cooked to perfection, melts in your mouth with every bite. With every dish, we're weaving stories of tradition, taste, and the joy of sharing good food with good company.
    </p>
    <a href="/food-truck-menu" class="inline-block rounded bg-[#f4511e] px-8 py-3 font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#d04014]">
      Indulge in Our Menu
    </a>
  </div>
</section>

<!-- Follow Us On The Gram (Placeholder) -->
<section class="py-20 px-6 max-w-4xl mx-auto text-center">
  <h2 class="text-4xl font-bold text-[#32373c] mb-6">Follow Us On The Gram</h2>
  <div class="mx-auto w-16 border-b-4 border-[#f4511e] mb-12"></div>
  <div class="bg-white p-8 border border-neutral-200 shadow-sm rounded-lg flex items-center justify-center min-h-[400px]">
    <p class="text-neutral-500 italic">Instagram widget placeholder</p>
  </div>
</section>

<!-- Culinary Traditions / Final CTA -->
<section class="bg-white py-24 px-6 text-center border-t border-neutral-200">
  <div class="mx-auto max-w-3xl">
    <h2 class="text-4xl font-bold text-[#32373c] mb-4">Let's Make Your Event Unforgettable</h2>
    <div class="mx-auto w-16 border-b-4 border-[#f4511e] mb-8"></div>
    <p class="text-xl text-[#666] font-light mb-10">
      Whether it's a Family gathering, celebration, or corporate affair, let SmoQe Signals BBQ add the perfect touch of flavor to your occasion.
    </p>
    <a href="/contact-us" class="inline-block rounded bg-[#f4511e] px-8 py-4 font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#d04014]">
      Contact Us Now
    </a>
  </div>
</section>

<!-- Newsletter Integration -->
<section id="newsletter" class="bg-[#f4511e] py-16 px-6">
  <div class="mx-auto max-w-2xl text-center">
    <h2 class="mb-4 text-3xl font-bold text-white">Join the Newsletter</h2>
    <p class="mb-6 text-white/90">Stay up to date with the truck location and events!</p>
    <form onsubmit={subscribe} class="flex w-full flex-col gap-3 sm:flex-row">
      <input type="email" bind:value={email} required placeholder="Enter your email address..." class="flex-1 rounded border-none px-6 py-4 text-neutral-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#32373c]" />
      <button type="submit" disabled={status === 'loading'} class="rounded bg-[#32373c] px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-black disabled:opacity-70">
        {status === 'loading' ? 'Joining...' : 'Subscribe'}
      </button>
    </form>
    {#if status === 'success'}
      <p class="mt-4 font-bold text-white">{message}</p>
    {:else if status === 'error'}
      <p class="mt-4 font-bold text-white">{message}</p>
    {/if}
  </div>
</section>
