export async function healthResponse(ping: () => Promise<unknown>): Promise<Response> {
	try {
		await ping();
		return Response.json({ status: 'ok' });
	} catch {
		return Response.json({ status: 'unavailable' }, { status: 503 });
	}
}
