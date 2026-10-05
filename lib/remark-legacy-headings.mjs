import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

// VitePress 2 / @mdit-vue/shared slug rules. Keep existing inbound fragments,
// including Chinese headings, duplicated headings and punctuation-heavy titles.
export function legacySlugify(value) {
  return value.normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u0000-\u001f]/g, '')
    .replace(/[\s~`!@#$%^&*()\-_=+\[\]{}|;:'"“”‘’,.<>/?\\]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase();
}

export function remarkLegacyHeadings() {
  return (tree) => {
    const slugs = new Map();
    visit(tree, 'heading', (node) => {
      let text = toString(node);
      const explicit = text.match(/\s*\{#([^}]+)\}\s*$/);
      if (explicit) {
        const last = node.children.at(-1);
        if (last?.type === 'text') last.value = last.value.replace(/\s*\{#[^}]+\}\s*$/, '');
        text = text.slice(0, explicit.index);
      }
      const base = explicit?.[1] ?? legacySlugify(text);
      const count = slugs.get(base) ?? 0;
      slugs.set(base, count + 1);
      node.data ??= {};
      node.data.hProperties ??= {};
      node.data.hProperties.id = count ? `${base}-${count}` : base;
    });
  };
}
