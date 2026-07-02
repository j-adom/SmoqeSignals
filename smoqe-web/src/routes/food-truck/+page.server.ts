import type { Actions } from './$types';
import { handleRequestSubmit } from '$lib/server/requests';

export const actions: Actions = {
	submit: async ({ request, fetch }) => handleRequestSubmit(request, fetch)
};
