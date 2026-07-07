<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { toast } from '$lib/stores/toast.svelte';
</script>

<div
	class={`bg-smoke-900 fixed bottom-6 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2.5 rounded px-[22px] py-3.5 text-sm font-bold text-white shadow-[var(--shadow-lift)] transition-all duration-200 ${
		toast.visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
	}`}
	role="status"
	aria-live="polite"
>
	<Check size={18} class="text-ember" />
	{toast.message}
</div>
