import defaultMdxComponents from '@fumadocs/base-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as content from './content';
import { ZoomableImage } from './zoomable-image';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return { ...defaultMdxComponents, ...content, img: ZoomableImage, ZoomableImage, ...components };
}
export const useMDXComponents = getMDXComponents;
