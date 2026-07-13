import config from '@payload-config';
import { getPayload } from 'payload';
import {
	isStorefrontRequest,
	parseCatering,
	publicAPIErrorResponse,
	readJSONBody
} from '../../../../public-api';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	if (!isStorefrontRequest(request)) {
		return Response.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
	}
	try {
		const data = parseCatering(await readJSONBody(request));
		const payload = await getPayload({ config });
		await payload.create({ collection: 'cateringRequests', data });
		return Response.json({ ok: true }, { status: 201 });
	} catch (error) {
		return publicAPIErrorResponse(error);
	}
}
