import defaultMdxComponents from '@fumadocs/base-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as content from './content';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return { ...defaultMdxComponents, ...content, img: (props) => <img loading="lazy" {...props} />, ...components };
}
export const useMDXComponents = getMDXComponents;
