import { describe, expect, it } from 'vitest';
import { userHasRole } from './access';

describe('userHasRole', () => {
	it('accepts only configured roles', () => {
		expect(userHasRole({ role: 'admin' }, ['admin'])).toBe(true);
		expect(userHasRole({ role: 'staff' }, ['admin'])).toBe(false);
		expect(userHasRole({ role: 'owner' }, ['admin'])).toBe(false);
		expect(userHasRole(null, ['admin'])).toBe(false);
	});
});
