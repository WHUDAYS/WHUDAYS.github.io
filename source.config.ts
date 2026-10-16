import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';
import { pageSchema } from 'fumadocs-core/source/schema';
import remarkGfm from 'remark-gfm';
import path from 'node:path';
import { remarkGitChangelog } from 'fumadocs-page-history/remark';
import { gitChangelogSchema } from 'fumadocs-page-history/schema';
import type { HistoryOptions } from 'fumadocs-page-history/git';
import { buildAuthorMappings } from './lib/people.js';
import { remarkLegacyHeadings } from './lib/remark-legacy-headings.mjs';
import { remarkSearchAnchors } from './lib/remark-search-anchors.mjs';

const historyOptions = {
  repository: { url: 'https://github.com/WHUDAYS/WHUDAYS.github.io' },
  authorMappings: buildAuthorMappings(),
  // Vue → React rewrites can fall below Git's default rename threshold.
  getHistoryPaths: (sourcePath) => sourcePath.startsWith('docs/') && sourcePath.endsWith('.mdx')
    ? [sourcePath.replace(/\.mdx$/, '.md')]
    : [],
} satisfies HistoryOptions;

export const docs = defineDocs({
  dir: 'docs',
  meta: { files: ['**/meta.json'] },
  docs: {
    files: ['**/*.mdx'],
    lastModified: true,
    schema: pageSchema.extend({
      layout: z.string().optional(),
      sidebar: z.boolean().optional(),
      outline: z.union([z.boolean(), z.number(), z.array(z.number()), z.string()]).optional(),
      hero: z.any().optional(),
      features: z.array(z.any()).optional(),
    }).extend(gitChangelogSchema.shape).passthrough(),
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (plugins) => {
      const configured = [...plugins];
      const index = configured.findIndex((plugin) => plugin === remarkGfm);
      if (index >= 0) configured[index] = [remarkGfm, { singleTilde: false }];
      // Assign card/content targets and exclude hidden lists before indexing.
      return [remarkLegacyHeadings, remarkSearchAnchors, ...configured, [remarkGitChangelog, {
        ...historyOptions,
        filter: (filePath: string) => filePath !== path.resolve('docs/index.mdx'),
        display: {
          locale: 'zh-CN',
          hideChangelogHeader: true,
          hideContributorsHeader: true,
          displayAuthorsInsideCommitLine: true,
        },
      }]];
    },
    // Keep archive URLs stable; no runtime image service or remote build fetches.
    remarkImageOptions: false,
    rehypeCodeOptions: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
