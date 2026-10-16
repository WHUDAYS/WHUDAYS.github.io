import { visit } from 'unist-util-visit';
import { replaceSource } from 'fumadocs-core/mdx-plugins/stringifier';

/** Keep embedded archives accessible in text without exporting player markup. */
export function remarkLLMMedia() {
  return (tree, file) => {
    visit(tree, node => {
      if (node.name === 'a') {
        const href = node.attributes.find(attr => attr.name === 'href')?.value;
        if (typeof href === 'string') replaceSource(file, node, s => `[${s.inner(node).trim()}](<${href.trim()}>)`);
        return;
      }
      if (!['iframe', 'video', 'audio'].includes(node.name)) return;
      const src = node.attributes.find(attr => attr.name === 'src')?.value;
      if (typeof src !== 'string') return;
      let href = src.startsWith('//') ? `https:${src}` : src;
      if (href.startsWith('/pdfjs/web/viewer.html?')) {
        href = new URL(href, 'https://whudays.org').searchParams.get('file') ?? href;
      }
      replaceSource(file, node, `[${node.name === 'iframe' ? '嵌入内容' : '媒体文件'}](<${href}>)`);
    });
  };
}
