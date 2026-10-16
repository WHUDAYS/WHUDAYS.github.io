import { visit } from 'unist-util-visit';

/** Preserve image links, and route raw MDX images through the same image component. */
export function remarkImageZoom() {
  return tree => {
    visit(tree, node => {
      if (node.type === 'link' || node.type === 'linkReference' || node.name === 'a') {
        visit(node, child => {
          if (child.type === 'image' || child.type === 'imageReference') {
            child.data ??= {};
            child.data.hProperties ??= {};
            child.data.hProperties['data-no-zoom'] = true;
          } else if (child.name === 'img') {
            child.attributes.push({ type: 'mdxJsxAttribute', name: 'data-no-zoom', value: 'true' });
          }
        });
      }
      if (node.name === 'img') node.name = 'ZoomableImage';
    });
  };
}
