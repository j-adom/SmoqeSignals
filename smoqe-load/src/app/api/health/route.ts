import config from '@payload-config';
import { getPayload } from 'payload';
import { healthResponse } from '@/health';

export const dynamic = 'force-dynamic';

export async function GET() {
	return healthResponse(async () => {
		const payload = await getPayload({ config });
		await payload.count({ collection: 'users' });
	});
}
