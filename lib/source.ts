import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});

export function getCanonicalPath(path: string) {
  return '/' + path.replace(/index\.mdx?$/, '').replace(/\.mdx?$/, '');
}

export function getMarkdownPath(path: string) {
  return `/markdown${getCanonicalPath(path).replace(/\/$/, '') || '/index'}.txt`;
}
