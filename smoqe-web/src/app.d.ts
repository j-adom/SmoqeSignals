// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				PAYLOAD_API_URL?: string;
				PUBLIC_SITE_URL?: string;
			};
		}
	}
}

export {};
