import { describe, expect, it } from 'vitest';
import { healthResponse } from './health';

describe('healthResponse', () => {
	it('returns 200 ok when the ping succeeds', async () => {
		const res = await healthResponse(async () => undefined);
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ status: 'ok' });
	});

	it('returns 503 when the ping fails', async () => {
		const res = await healthResponse(async () => {
			throw new Error('database unreachable');
		});
		expect(res.status).toBe(503);
		expect(await res.json()).toEqual({ status: 'unavailable' });
	});
});
