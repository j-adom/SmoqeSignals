import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	try {
		const { email, name } = await request.json();

		// Update to your actual Listmonk URL and LIST_IDS
		const LISTMONK_URL = process.env.LISTMONK_URL || 'https://listmonk.example.com/api/subscribers';
		const LISTMONK_USER = process.env.LISTMONK_USER || 'admin';
		const LISTMONK_PASS = process.env.LISTMONK_PASS || 'admin';
		const LIST_IDS = [1]; // Replace with your list IDs

		const response = await fetch(LISTMONK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Basic ' + Buffer.from(`${LISTMONK_USER}:${LISTMONK_PASS}`).toString('base64')
			},
			body: JSON.stringify({
				email,
				name: name || '',
				status: 'enabled',
				lists: LIST_IDS
			})
		});

		if (!response.ok) {
			const text = await response.text();
			console.error('Listmonk API error:', text);
			return json({ error: 'Failed to subscribe' }, { status: response.status });
		}

		return json({ success: true, message: 'Subscribed successfully!' });
	} catch (error) {
		console.error('Subscription error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
