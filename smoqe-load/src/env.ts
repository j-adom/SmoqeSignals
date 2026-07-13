const PLACEHOLDER_VALUES = ['change-me', 'changeme', 'build-time-placeholder'];

function isPlaceholder(value: string): boolean {
	const normalized = value.toLowerCase();
	return PLACEHOLDER_VALUES.some((placeholder) => normalized.includes(placeholder));
}

function isSecureURL(value: string): boolean {
	try {
		return new URL(value).protocol === 'https:';
	} catch {
		return false;
	}
}

export function validateProductionEnv(env: NodeJS.ProcessEnv = process.env): void {
	if (env.NODE_ENV !== 'production' || env.SKIP_ENV_VALIDATION === '1') return;

	const errors: string[] = [];
	const requireValue = (name: string, minLength = 1): string => {
		const value = env[name]?.trim() || '';
		if (value.length < minLength || isPlaceholder(value)) {
			errors.push(`${name} must be set to a non-placeholder value${minLength > 1 ? ` of at least ${minLength} characters` : ''}.`);
		}
		return value;
	};

	const payloadSecret = requireValue('PAYLOAD_SECRET', 32);
	const storefrontKey = requireValue('STOREFRONT_API_KEY', 32);
	const databaseURI = requireValue('DATABASE_URI');
	const serverURL = requireValue('PAYLOAD_PUBLIC_SERVER_URL');
	const frontendURL = requireValue('FRONTEND_URL');

	if (payloadSecret && payloadSecret === storefrontKey) {
		errors.push('PAYLOAD_SECRET and STOREFRONT_API_KEY must be different secrets.');
	}
	if (databaseURI && !databaseURI.startsWith('postgres')) {
		errors.push('DATABASE_URI must use PostgreSQL in production.');
	}
	if (serverURL && !isSecureURL(serverURL)) {
		errors.push('PAYLOAD_PUBLIC_SERVER_URL must be an https:// URL in production.');
	}
	if (frontendURL && !isSecureURL(frontendURL)) {
		errors.push('FRONTEND_URL must be an https:// URL in production.');
	}
	if (env.STRIPE_AUTOMATIC_TAX !== 'true') {
		errors.push('STRIPE_AUTOMATIC_TAX must be true in production.');
	}

	for (const name of [
		'STRIPE_SECRET_KEY',
		'STRIPE_WEBHOOK_SECRET',
		'SMTP_HOST',
		'SMTP_USER',
		'SMTP_PASSWORD',
		'FROM_EMAIL',
		'STAFF_NOTIFICATION_EMAIL',
		'R2_ACCESS_KEY_ID',
		'R2_SECRET_ACCESS_KEY',
		'R2_BUCKET'
	]) {
		requireValue(name);
	}

	if (!env.R2_ENDPOINT?.trim() && !env.R2_ACCOUNT_ID?.trim()) {
		errors.push('Set R2_ENDPOINT or R2_ACCOUNT_ID for persistent production media.');
	}

	if (errors.length) {
		throw new Error(`Invalid production environment:\n- ${errors.join('\n- ')}`);
	}
}
