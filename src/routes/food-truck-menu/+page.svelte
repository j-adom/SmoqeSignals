<svelte:head>
  <title>Food Truck Menu | SmoQe Signals BBQ</title>
</svelte:head>

<div class="mx-auto max-w-5xl py-24 px-6 text-center">
  <h1 class="font-header text-7xl text-white mb-6 uppercase tracking-tight italic">Food Truck <span class="text-bbq-orange">Menu</span></h1>
  <div class="mx-auto w-32 h-1.5 rounded-full bg-bbq-blue mb-16"></div>
  
  <div class="bg-bbq-dark p-10 md:p-16 shadow-2xl border border-white/10 rounded-3xl text-left text-white/70 leading-relaxed relative overflow-hidden">
    <!-- Accent Blur -->
    <div class="absolute -top-12 -right-12 w-48 h-48 bg-bbq-orange rounded-full blur-[100px] opacity-10"></div>

    <div class="grid gap-16 lg:grid-cols-2">
      <div>
        <h2 class="font-header text-4xl text-bbq-orange mb-8 border-b border-white/10 pb-4 uppercase tracking-wider">Plates & Combos</h2>
        <ul class="space-y-6">
          <li class="group bg-bbq-darker/50 p-6 rounded-2xl border border-white/5 hover:border-bbq-blue/30 transition-all">
            <h3 class="font-accent text-2xl text-white group-hover:text-bbq-blue transition-colors uppercase tracking-widest">Pulled Pork Plate</h3>
            <p class="text-sm mt-2 text-white/50">Slow-smoked perfection served with your choice of 2 classic sides.</p>
          </li>
          <li class="group bg-bbq-darker/50 p-6 rounded-2xl border border-white/5 hover:border-bbq-blue/30 transition-all">
            <h3 class="font-accent text-2xl text-white group-hover:text-bbq-blue transition-colors uppercase tracking-widest">Beef Brisket Plate</h3>
            <p class="text-sm mt-2 text-white/50">Tender, hickory-smoked brisket slices with legendary Memphis bark.</p>
          </li>
          <li class="group bg-bbq-darker/50 p-6 rounded-2xl border border-white/5 hover:border-bbq-blue/30 transition-all">
            <h3 class="font-accent text-2xl text-white group-hover:text-bbq-blue transition-colors uppercase tracking-widest">Veggie Pulled Pork</h3>
            <p class="text-sm mt-2 text-white/50">Our unique vegetarian recipe that packs true smoky BBQ flavor.</p>
          </li>
          <li class="group bg-bbq-darker/50 p-6 rounded-2xl border border-white/5 hover:border-bbq-blue/30 transition-all">
            <h3 class="font-accent text-2xl text-white group-hover:text-bbq-blue transition-colors uppercase tracking-widest">Smoked Wings Plate</h3>
            <p class="text-sm mt-2 text-white/50">A pile of our signature smoked wings with choice of sauce and 2 sides.</p>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-header text-4xl text-bbq-orange mb-8 border-b border-white/10 pb-4 uppercase tracking-wider">Signature Sides</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-6 bg-bbq-darker/50 border border-white/5 rounded-2xl font-accent text-white uppercase tracking-[0.2em] text-center hover:bg-bbq-blue/10 transition-colors">Baked Beans</div>
          <div class="p-6 bg-bbq-darker/50 border border-white/5 rounded-2xl font-accent text-white uppercase tracking-[0.2em] text-center hover:bg-bbq-blue/10 transition-colors">Cole Slaw</div>
          <div class="p-6 bg-bbq-darker/50 border border-white/5 rounded-2xl font-accent text-white uppercase tracking-[0.2em] text-center hover:bg-bbq-blue/10 transition-colors">Potato Salad</div>
          <div class="p-6 bg-bbq-darker/50 border border-white/5 rounded-2xl font-accent text-white uppercase tracking-[0.2em] text-center hover:bg-bbq-blue/10 transition-colors">Mac & Cheese</div>
          <div class="p-6 bg-bbq-darker/50 border border-white/5 rounded-2xl font-accent text-white uppercase tracking-[0.2em] text-center hover:bg-bbq-blue/10 transition-colors">Green Beans</div>
          <div class="p-6 bg-bbq-darker/50 border border-white/5 rounded-2xl font-accent text-white uppercase tracking-[0.2em] text-center hover:bg-bbq-blue/10 transition-colors">Cornbread</div>
        </div>

        <div class="mt-12 p-8 bg-bbq-orange/10 border border-bbq-orange/20 rounded-2xl text-center">
          <h4 class="font-header text-2xl text-white mb-2 uppercase tracking-widest">Planning an Event?</h4>
          <p class="text-sm text-white/60 mb-6 uppercase tracking-widest">Our food truck is available for private catering and corporate events.</p>
          <a href="/catering" class="inline-flex min-h-12 items-center justify-center rounded-xl bg-bbq-orange px-8 font-black uppercase tracking-widest text-white shadow-xl shadow-bbq-orange/20 transition-all hover:scale-105 active:scale-95">Request Catering</a>
        </div>
      </div>
    </div>
  </div>
</div>
