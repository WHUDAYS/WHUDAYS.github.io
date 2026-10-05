import 'server-only';
import { cache } from 'react';
import { buildMapAuthors } from './people.js';
import { readPageHistory, shouldShowChangelog as isVisible } from './git-history.mjs';

export type HistoryAuthor = { name: string; avatarUrl: string; url?: string };
export type HistoryCommit = {
  sha: string;
  shortSha: string;
  date: string;
  authoredAt: string; committedAt: string; tags?: { name: string; url: string }[];
  message: string;
  description: string;
  authors: HistoryAuthor[];
  url: string;
};
export type ChangelogFrontmatter = {
  layout?: string;
  gitChangelog?: boolean | { disableChangelog?: boolean; changelog?: boolean; disableContributors?: boolean };
  disableChangelog?: boolean;
  nolebase?: { gitChangelog?: boolean };
};

/** Build-time, request-deduplicated server API. No email aliases reach the browser. */
export const getPageHistory = cache((sourcePath: string): HistoryCommit[] =>
  readPageHistory(sourcePath, { registry: buildMapAuthors() }),
);
export const shouldShowChangelog = (frontmatter: ChangelogFrontmatter = {}) => isVisible(frontmatter);
