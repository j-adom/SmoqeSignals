import { browser } from '$app/environment';

class ToastStore {
	message = $state('');
	visible = $state(false);
	private timer: ReturnType<typeof setTimeout> | null = null;

	show(message: string, ms = 2800) {
		this.message = message;
		this.visible = true;
		if (!browser) return;
		if (this.timer) clearTimeout(this.timer);
		this.timer = setTimeout(() => (this.visible = false), ms);
	}
}

export const toast = new ToastStore();
