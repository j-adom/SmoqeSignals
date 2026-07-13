import type { Access, FieldAccess } from 'payload';

export type UserRole = 'admin' | 'staff' | 'editor';

const VALID_ROLES = new Set<UserRole>(['admin', 'staff', 'editor']);

export function userHasRole(user: unknown, roles: readonly UserRole[]): boolean {
	if (!user || typeof user !== 'object' || !('role' in user)) return false;
	const role = (user as { role?: unknown }).role;
	return typeof role === 'string' && VALID_ROLES.has(role as UserRole) && roles.includes(role as UserRole);
}

const roleAccess = (roles: readonly UserRole[]): Access => ({ req }) => userHasRole(req.user, roles);
const roleFieldAccess = (roles: readonly UserRole[]): FieldAccess => ({ req }) =>
	userHasRole(req.user, roles);

export const denyPublic: Access = () => false;
export const allTeam: Access = roleAccess(['admin', 'staff', 'editor']);
export const admins: Access = roleAccess(['admin']);
export const staffOrAdmins: Access = roleAccess(['admin', 'staff']);
export const contentManagers: Access = roleAccess(['admin', 'editor']);

export const allTeamField: FieldAccess = roleFieldAccess(['admin', 'staff', 'editor']);
export const adminsField: FieldAccess = roleFieldAccess(['admin']);

export const publishedOrTeam: Access = ({ req }) => {
	if (userHasRole(req.user, ['admin', 'staff', 'editor'])) return true;
	return { status: { equals: 'published' } };
};
