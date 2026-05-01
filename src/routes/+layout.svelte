<script lang="ts">
  import './layout.css';
</script>

<div class="flex min-h-screen flex-col bg-[#f4f4f4] text-[#32373c] font-sans">
  <!-- Navigation Header -->
  <header class="bg-white sticky top-0 z-50 shadow-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="/" class="flex items-center gap-4">
        <h1 class="text-2xl font-bold uppercase tracking-tight text-[#f4511e]">SmoQe Signals BBQ</h1>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
        <a href="/" class="hover:text-[#f4511e] transition-colors">Home</a>
        <a href="/about-us" class="hover:text-[#f4511e] transition-colors">About Us</a>
        <a href="/food-truck-menu" class="hover:text-[#f4511e] transition-colors">Book The Food Truck</a>
        <div class="group relative">
          <a href="/catering" class="hover:text-[#f4511e] transition-colors flex items-center gap-1">
            Catering And Events
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
          <div class="absolute left-0 mt-2 hidden w-56 flex-col bg-white shadow-xl group-hover:flex">
            <a href="/catering-faqs" class="px-4 py-3 hover:bg-[#f4511e] hover:text-white transition-colors">Catering FAQs</a>
            <a href="/catering-requirments" class="px-4 py-3 hover:bg-[#f4511e] hover:text-white transition-colors">Catering Requirments</a>
          </div>
        </div>
        <a href="/contact-us" class="hover:text-[#f4511e] transition-colors">Contact Us</a>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden p-2 text-[#32373c] hover:text-[#f4511e]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="mt-20 border-t-4 border-[#f4511e] bg-[#32373c] pt-16 pb-8 text-[#c9c8cd]">
    <div class="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3">
      <!-- Info Column -->
      <div class="flex flex-col gap-6">
        <h3 class="text-2xl font-bold uppercase text-white">SmoQe Signals BBQ</h3>
        <p class="text-sm leading-relaxed">
          SmoQe Signals BBQ Food Truck is located in Nashville TN. Founded in 2012, over the years our business has expanded to cater for special events and gatherings, growing the reputation of our tender Pulled Pork, Veggie Pulled Pork, and some of the best Brisket in Nashville.
        </p>
      </div>

      <!-- Links Column -->
      <div class="flex flex-col gap-6">
        <h3 class="text-xl font-bold uppercase text-white">Quick Links</h3>
        <ul class="space-y-3 text-sm">
          <li><a href="/" class="hover:text-[#f4511e] transition-colors">Home</a></li>
          <li><a href="/about-us" class="hover:text-[#f4511e] transition-colors">About Us</a></li>
          <li><a href="/food-truck-menu" class="hover:text-[#f4511e] transition-colors">Book The Food Truck</a></li>
          <li><a href="/catering" class="hover:text-[#f4511e] transition-colors">Catering And Events</a></li>
          <li><a href="/contact-us" class="hover:text-[#f4511e] transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <!-- Contact Column -->
      <div class="flex flex-col gap-6">
        <h3 class="text-xl font-bold uppercase text-white">Contact Us</h3>
        <ul class="space-y-4 text-sm">
          <li class="flex items-start gap-4">
            <span class="text-[#f4511e]">📍</span>
            <span>PO Box 9112<br />Nashville, TN 37209</span>
          </li>
          <li class="flex items-center gap-4">
            <span class="text-[#f4511e]">📞</span>
            <a href="tel:6154294851" class="hover:text-white transition-colors">615-429-4851</a>
          </li>
          <li class="flex items-center gap-4">
            <span class="text-[#f4511e]">✉️</span>
            <a href="mailto:info@smoqesignals.com" class="hover:text-white transition-colors">info@smoqesignals.com</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Copyright -->
    <div class="mx-auto mt-16 max-w-7xl border-t border-neutral-700 px-6 pt-6 text-center text-xs tracking-wide">
      <p>©2023 SmoQe Signals BBS. All Rights Reserved. | Site Designed by UrVoyce</p>
    </div>
  </footer>
</div>
