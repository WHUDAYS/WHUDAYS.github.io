import { visit, SKIP } from 'unist-util-visit';
import { defaultStringifier } from 'fumadocs-core/mdx-plugins/remark-structure';

const fields = new Set(['title', 'name', 'description', 'desc', 'nickname', 'message', 'org', 'orgDesc', 'text', 'lead']);
const components = new Set(['TeamMembers', 'VPTeamMembers', 'TeamPageTitle', 'VPTeamPageTitle', 'TeamPageSection', 'VPTeamPageSection', 'MemberCard', 'ChatMessage', 'Callout', 'Badge']);
const blocks = new Set(['paragraph', 'listItem', 'blockquote', 'tableCell']);
const literal = value => ({ type: 'Literal', value });
const property = (name, value) => ({ type: 'Property', key: { type: 'Identifier', name }, value, kind: 'init', method: false, shorthand: false, computed: false });

/** Compile the same anchors into visible HTML and development search metadata. */
export function remarkSearchAnchors() {
  return tree => {
    const bindings = [];
    visit(tree, (node, _index, parent) => {
      const attributes = node.attributes ?? [];
      const style = attributes.find(attr => attr.name === 'style')?.value?.data?.estree?.body?.[0]?.expression;
      if (attributes.some(attr => attr.name === 'hidden') || style?.type === 'ObjectExpression' && style.properties.some(prop =>
        (prop.key?.name ?? prop.key?.value) === 'display' && prop.value?.value === 'none')) {
        visit(node, child => { child.data ??= {}; child.data.searchExcluded = true; });
        return SKIP;
      }
      const component = components.has(node.name);
      if (!blocks.has(node.type) && !component) return;
      const position = node.position?.start;
      if (!position) return;
      // Tight Markdown lists omit their paragraph wrapper in HTML.
      if (node.type === 'paragraph' && parent?.type === 'listItem') {
        node.data ??= {};
        node.data.searchAnchor = parent.data.hProperties.id;
        return;
      }
      let id = `search-${component ? 'component' : 'content'}-${position.line}-${position.column}`;
      if (component) {
        const existing = node.attributes.find(attr => attr.name === 'id');
        if (existing && typeof existing.value !== 'string') return;
        if (existing) id = existing.value;
        else node.attributes.push({ type: 'mdxJsxAttribute', name: 'id', value: id });
        const properties = [property('id', literal(id))];
        for (const attr of node.attributes) {
          if (attr.type !== 'mdxJsxAttribute' || (!fields.has(attr.name) && attr.name !== 'members')) continue;
          const expression = typeof attr.value === 'string' ? literal(attr.value) : attr.value?.data?.estree?.body?.[0]?.expression;
          if (expression) properties.push(property(attr.name, expression));
        }
        if (properties.length > 1) bindings.push({ type: 'ObjectExpression', properties });
      } else {
        node.data ??= {};
        node.data.hProperties ??= {};
        id = node.data.hProperties.id ?? id;
        node.data.hProperties.id = id;
      }
      node.data ??= {};
      node.data.searchAnchor = id;
    });
    // Append after author-defined exports so referenced arrays are initialized.
    tree.children.push({
      type: 'mdxjsEsm',
      value: '',
      data: { estree: { type: 'Program', sourceType: 'module', body: [{
        type: 'ExportNamedDeclaration', specifiers: [], source: null,
        declaration: { type: 'VariableDeclaration', kind: 'const', declarations: [{
          type: 'VariableDeclarator', id: { type: 'Identifier', name: 'searchComponentBindings' },
          init: { type: 'ArrayExpression', elements: bindings },
        }] },
      }] } },
    });
  };
}

const stringify = defaultStringifier({ filterMdxAttributes: (_node, attr) => fields.has(attr.name) && typeof attr.value === 'string' });

export function stringifySearchContent(node, context) {
  if (node.data?.searchExcluded) return '';
  const content = stringify.call(this, node, context).trim();
  if (node.type !== 'heading' && node.data?.searchAnchor && content) {
    context.addContent({ heading: node.data.searchAnchor, content });
    return '';
  }
  return content;
}
