import { describe, expect, it } from 'vitest';
import { validateProductionEnv } from './env';

const validEnv: NodeJS.ProcessEnv = {
	NODE_ENV: 'production',
	PAYLOAD_SECRET: 'p'.repeat(32),
	STOREFRONT_API_KEY: 's'.repeat(32),
	DATABASE_URI: 'postgres://db.example/smoqe',
	PAYLOAD_PUBLIC_SERVER_URL: 'https://cms.example.com',
	FRONTEND_URL: 'https://example.com',
	STRIPE_SECRET_KEY: 'sk_live_value',
	STRIPE_WEBHOOK_SECRET: 'whsec_value',
	STRIPE_AUTOMATIC_TAX: 'true',
	SMTP_HOST: 'smtp.example.com',
	SMTP_USER: 'user',
	SMTP_PASSWORD: 'password',
	FROM_EMAIL: 'orders@example.com',
	STAFF_NOTIFICATION_EMAIL: 'staff@example.com',
	R2_ACCESS_KEY_ID: 'access',
	R2_SECRET_ACCESS_KEY: 'secret',
	R2_BUCKET: 'bucket',
	R2_ACCOUNT_ID: 'account'
};

describe('validateProductionEnv', () => {
	it('accepts a complete production environment', () => {
		expect(() => validateProductionEnv(validEnv)).not.toThrow();
	});

	it('rejects insecure and shared secrets', () => {
		expect(() =>
			validateProductionEnv({ ...validEnv, FRONTEND_URL: 'http://example.com', STOREFRONT_API_KEY: validEnv.PAYLOAD_SECRET })
		).toThrow(/different secrets|https:\/\//);
	});
});
