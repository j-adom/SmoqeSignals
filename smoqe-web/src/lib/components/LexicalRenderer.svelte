<script lang="ts" module>
	import type { LexicalNode, LexicalRoot } from '$lib/types';

	const FMT = { bold: 1, italic: 2, strike: 4, underline: 8, code: 16 };

	function esc(s: string): string {
		return s
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function text(node: LexicalNode): string {
		let t = esc(node.text ?? '');
		const f = typeof node.format === 'number' ? node.format : 0;
		if (f & FMT.code) t = `<code>${t}</code>`;
		if (f & FMT.bold) t = `<strong>${t}</strong>`;
		if (f & FMT.italic) t = `<em>${t}</em>`;
		if (f & FMT.underline) t = `<u>${t}</u>`;
		if (f & FMT.strike) t = `<s>${t}</s>`;
		return t;
	}

	function children(node: LexicalNode): string {
		return (node.children ?? []).map(serialize).join('');
	}

	function safeURL(value: string): string {
		const url = value.trim();
		if (url.startsWith('/') || url.startsWith('#')) return url;
		try {
			const parsed = new URL(url);
			return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol) ? url : '#';
		} catch {
			return '#';
		}
	}

	function serialize(node: LexicalNode): string {
		switch (node.type) {
			case 'text':
				return text(node);
			case 'linebreak':
				return '<br/>';
			case 'paragraph': {
				const inner = children(node);
				return inner.trim() ? `<p>${inner}</p>` : '';
			}
			case 'heading': {
				const tag = ['h2', 'h3', 'h4'].includes(String(node.tag)) ? String(node.tag) : 'h2';
				return `<${tag}>${children(node)}</${tag}>`;
			}
			case 'quote':
				return `<blockquote>${children(node)}</blockquote>`;
			case 'list': {
				const tag = node.listType === 'number' ? 'ol' : 'ul';
				return `<${tag}>${children(node)}</${tag}>`;
			}
			case 'listitem':
				return `<li>${children(node)}</li>`;
			case 'link': {
				const url = safeURL((node.fields as { url?: string } | undefined)?.url || node.url || '#');
				return `<a href="${esc(url)}" rel="noopener">${children(node)}</a>`;
			}
			case 'root':
				return children(node);
			default:
				return children(node);
		}
	}

	export function lexicalToHtml(doc: LexicalRoot | null): string {
		if (!doc?.root) return '';
		return serialize(doc.root);
	}
</script>

<script lang="ts">
	let { content }: { content: LexicalRoot | null } = $props();
	const html = $derived(lexicalToHtml(content));
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html html}
