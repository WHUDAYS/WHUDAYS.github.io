import { visit, SKIP } from 'unist-util-visit';

const fields = new Set(['title', 'name', 'description', 'desc', 'nickname', 'message', 'org', 'orgDesc', 'text', 'lead']);
const components = new Set(['TeamMembers', 'VPTeamMembers', 'TeamPageTitle', 'VPTeamPageTitle', 'TeamPageSection', 'VPTeamPageSection', 'MemberCard', 'ChatMessage', 'Callout', 'Badge']);
const blocks = new Set(['paragraph', 'listItem', 'blockquote', 'tableCell']);
const literal = value => ({ type: 'Literal', value });
const property = (name, value) => ({ type: 'Property', key: { type: 'Identifier', name }, value, kind: 'init', method: false, shorthand: false, computed: false });

// Fumadocs 16.17 accepts per-node records instead of a custom stringifier.
function searchText(node) {
  if (node.data?.searchExcluded || ['mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'image', 'imageReference'].includes(node.type)) return '';
  const attributes = (node.attributes ?? [])
    .filter(attr => fields.has(attr.name) && typeof attr.value === 'string')
    .map(attr => attr.value);
  const content = node.children ? node.children.map(searchText).join(node.type === 'paragraph' ? '' : ' ') : node.value ?? '';
  return attributes.length ? [...attributes, content].join(' ') : content;
}

/** Compile the same anchors into visible HTML and development search metadata. */
export function remarkSearchAnchors() {
  return tree => {
    const bindings = [];
    visit(tree, (node, _index, parent) => {
      const attributes = node.attributes ?? [];
      const style = attributes.find(attr => attr.name === 'style')?.value?.data?.estree?.body?.[0]?.expression;
      if (attributes.some(attr => attr.name === 'hidden') || style?.type === 'ObjectExpression' && style.properties.some(prop =>
        (prop.key?.name ?? prop.key?.value) === 'display' && prop.value?.value === 'none')) {
        visit(node, child => {
          child.data ??= {};
          child.data.searchExcluded = true;
          child.data.structuredData = { contents: [] };
        });
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
    // Resolve text after the first pass has marked every hidden subtree.
    visit(tree, (node, _index, parent) => {
      if (!node.data?.searchAnchor || node.data.searchExcluded || node.type === 'paragraph' && parent?.type === 'listItem') return;
      const content = searchText(node).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      node.data.structuredData = { contents: content ? [{ heading: node.data.searchAnchor, content }] : [] };
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
