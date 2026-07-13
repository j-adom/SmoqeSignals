import config from '@payload-config';
import { getPayload } from 'payload';
import {
	isStorefrontRequest,
	parseNewsletter,
	publicAPIErrorResponse,
	readJSONBody
} from '../../../../public-api';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	if (!isStorefrontRequest(request)) {
		return Response.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
	}
	try {
		const data = parseNewsletter(await readJSONBody(request));
		const payload = await getPayload({ config });
		const existing = await payload.find({
			collection: 'newsletterSubscribers',
			where: { email: { equals: data.email } },
			limit: 1
		});
		if (existing.docs[0]) {
			await payload.update({
				collection: 'newsletterSubscribers',
				id: existing.docs[0].id,
				data: { source: data.source, status: 'subscribed' }
			});
		} else {
			await payload.create({ collection: 'newsletterSubscribers', data });
		}
		return Response.json({ ok: true }, { status: existing.docs[0] ? 200 : 201 });
	} catch (error) {
		return publicAPIErrorResponse(error);
	}
}
