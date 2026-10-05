import defaultMdxComponents from '@fumadocs/base-ui/mdx';
import { Callout } from '@fumadocs/base-ui/components/callout';
import type { MDXComponents } from 'mdx/types';
import * as content from './content';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return { ...defaultMdxComponents, ...content, Callout, img: (props) => <img loading="lazy" {...props} />, ...components };
}
export const useMDXComponents = getMDXComponents;
