import { llms } from 'fumadocs-core/source';
import { source, getCanonicalPath, getMarkdownPath } from './source';
import { site } from './site';
import { llmComponents } from './llm-components';
import navigation from './navigation.json';

/** Reuse the official tree, linking its entries to their processed text. */
function getTextTree() {
  const tree = structuredClone(source.getPageTree());
  function rewrite(nodes: typeof tree.children) {
    for (const node of nodes) {
      if (node.type === 'page') {
        const page = source.getPageByHref(node.url)?.page;
        if (page) {
          node.description = page.data.description;
          node.url = `${site.url}${getMarkdownPath(page.path)}`;
        }
      } else if (node.type === 'folder') {
        if (node.index) rewrite([node.index]);
        rewrite(node.children);
      }
    }
  }
  rewrite(tree.children);
  return tree;
}

export const llmExport = llms({ ...source, getPageTree: getTextTree }, {
  renderName(node) {
    if (!node.type || node.type === 'root') return site.title;
    return node.type === 'folder'
      ? navigation.nav.find(section => section.link === `/${node.name}/`)?.text ?? String(node.name)
      : String(node.name);
  },
  renderDescription: node => !node.type || node.type === 'root' ? site.description : String(node.description ?? ''),
  async renderPage(page) {
    const content = page.data.layout === 'home'
      ? `# ${page.data.title}\n\n${page.data.description}\n\n${(page.data.features ?? []).map((feature: { title: string; link: string }) => `- [${feature.title}](${feature.link})`).join('\n')}`
      : await page.data.getText('processed', { components: llmComponents });
    return `<!-- Source: ${site.url}${getCanonicalPath(page.path)} -->\n\n${content}`;
  },
});

export function getLLMIndex() {
  return `${llmExport.index()}\n\n## 完整文本\n\n- [全站内容](${site.url}/llms-full.txt)\n`;
}
