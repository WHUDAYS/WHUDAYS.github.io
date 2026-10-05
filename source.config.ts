import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';
import remarkGfm from 'remark-gfm';
import { remarkLegacyHeadings } from './lib/remark-legacy-headings.mjs';
import { remarkSearchAnchors, stringifySearchContent } from './lib/remark-search-anchors.mjs';

export const docs = defineDocs({
  dir: 'docs',
  meta: { files: ['**/meta.json'] },
  docs: {
    files: ['**/*.mdx'],
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      layout: z.string().optional(),
      sidebar: z.boolean().optional(),
      outline: z.union([z.boolean(), z.number(), z.array(z.number()), z.string()]).optional(),
      gitChangelog: z.union([z.boolean(), z.record(z.string(), z.unknown())]).optional(),
      hero: z.any().optional(),
      features: z.array(z.any()).optional(),
    }).passthrough(),
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (plugins) => {
      const configured = [...plugins];
      const index = configured.findIndex((plugin) => plugin === remarkGfm);
      if (index >= 0) configured[index] = [remarkGfm, { singleTilde: false }];
      // Assign card/content targets and exclude hidden lists before indexing.
      return [remarkLegacyHeadings, remarkSearchAnchors, ...configured];
    },
    // Keep archive URLs stable; no runtime image service or remote build fetches.
    remarkImageOptions: false,
    remarkStructureOptions: {
      stringify: stringifySearchContent,
    },
    rehypeCodeOptions: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
