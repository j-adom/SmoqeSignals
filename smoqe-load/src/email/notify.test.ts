import { describe, expect, it } from 'vitest';
import { escapeHTML } from './notify';

describe('escapeHTML', () => {
	it('escapes markup and attribute characters', () => {
		expect(escapeHTML(`<img src=x onerror="alert('x')">`)).toBe(
			'&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;'
		);
	});
});
