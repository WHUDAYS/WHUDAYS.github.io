import { execFileSync } from 'node:child_process';
import path from 'node:path';

export const REPOSITORY_URL = 'https://github.com/WHUDAYS/WHUDAYS.github.io';
const PLACEHOLDER_AVATAR = '/avatars/_placeholder.png';
const normalize = (value) => String(value ?? '').trim().toLocaleLowerCase('en-US');

/** Convert a Git identity to public contributor metadata; never publish email aliases. */
export function mapAuthor(name, email, registry = []) {
  const byEmail = registry.find((author) => author.mapByEmailAliases?.some((alias) => normalize(alias) === normalize(email)));
  const author = byEmail ?? registry.find((entry) => [entry.name, entry.username, ...(entry.mapByNameAliases ?? [])].some((alias) => alias && normalize(alias) === normalize(name)));
  if (author) {
    return {
      name: author.name,
      avatarUrl: author.avatar || (author.username ? `https://github.com/${encodeURIComponent(author.username)}.png` : PLACEHOLDER_AVATAR),
      ...(author.username ? { url: `https://github.com/${encodeURIComponent(author.username)}` } : {}),
    };
  }
  const github = String(email).match(/^(?:\d+\+)?([a-z\d](?:[a-z\d-]*[a-z\d])?)@users\.noreply\.github\.com$/i)?.[1];
  return {
    name,
    avatarUrl: github ? `https://github.com/${encodeURIComponent(github)}.png` : PLACEHOLDER_AVATAR,
    ...(github ? { url: `https://github.com/${encodeURIComponent(github)}` } : {}),
  };
}

/** Native git log output is NUL-delimited so punctuation and multiline subjects are safe. */
export function parseGitLog(output, registry = [], repoURL = REPOSITORY_URL) {
  const fields = output.split('\0');
  const commits = [];
  for (let index = 0; index + 5 < fields.length; index += 6) {
    const [rawSha, authoredAt, committedAt, name, email, body] = fields.slice(index, index + 6);
    const sha = rawSha.trim();
    if (!/^[\da-f]{40,64}$/i.test(sha)) throw new Error(`Unexpected git log record: ${sha}`);
    const authors = [mapAuthor(name, email, registry)];
    for (const match of body.matchAll(/^Co-authored-by:\s*(.*?)\s*<([^<>]+)>\s*$/gim)) {
      const author = mapAuthor(match[1], match[2], registry);
      if (!authors.some((entry) => entry.name === author.name && entry.url === author.url)) authors.push(author);
    }
    // Coauthor emails are only lookup keys, not user-facing history data.
    const publicMessage = body.replace(/^Co-authored-by:.*(?:\r?\n|$)/gim, '').trim();
    const [message, ...description] = publicMessage.split(/\r?\n/);
    commits.push({ sha, shortSha: sha.slice(0, 7), date: authoredAt, authoredAt, committedAt, message, description: description.join('\n').trim(), authors, url: `${repoURL}/commit/${sha}` });
  }
  return commits;
}

export function shouldShowChangelog(frontmatter = {}) {
  const options = frontmatter.gitChangelog;
  return !['home', 'page'].includes(frontmatter.layout)
    && options !== false
    && !(options && typeof options === 'object' && (options.disableChangelog === true || options.changelog === false))
    && frontmatter.disableChangelog !== true
    && frontmatter.nolebase?.gitChangelog !== false;
}

/** Read all page revisions, following renames and preserving pre-MDX history. */
export function readPageHistory(sourcePath, { cwd = process.cwd(), registry = [], repoURL = REPOSITORY_URL } = {}) {
  const normalizedPath = sourcePath.replaceAll('\\', '/');
  if (!/^docs\/.+\.mdx?$/.test(normalizedPath) || normalizedPath.split('/').includes('..') || path.isAbsolute(normalizedPath)) {
    throw new Error(`History requires a repository-relative docs/*.md(x) path: ${sourcePath}`);
  }
  const git = (args) => execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (git(['rev-parse', '--is-shallow-repository']).trim() === 'true') {
    throw new Error('Complete page history requires a full checkout. Run git fetch --unshallow; CI must use fetch-depth: 0.');
  }
  const paths = [...new Set([normalizedPath.replace(/\.mdx?$/, '.mdx'), normalizedPath.replace(/\.mdx?$/, '.md')])];
  const commits = new Map();
  for (const source of paths) {
    // No max-count, time cutoff, or first-parent filter: every page revision remains accessible.
    const output = git(['log', '--follow', '--format=%H%x00%aI%x00%cI%x00%an%x00%ae%x00%B%x00', '--', source]);
    for (const commit of parseGitLog(output, registry, repoURL)) commits.set(commit.sha, commit);
  }
  const tags = git(['for-each-ref', '--format=%(objectname)%09%(*objectname)%09%(refname:strip=2)', 'refs/tags']);
  for (const line of tags.trim().split('\n').filter(Boolean)) {
    const [object, peeled, name] = line.split('\t');
    const commit = commits.get(peeled || object);
    if (commit) {
      commit.tags ??= [];
      commit.tags.push({ name, url: `${repoURL}/releases/tag/${encodeURIComponent(name)}` });
    }
  }
  return [...commits.values()].sort((left, right) => Date.parse(right.date) - Date.parse(left.date) || left.sha.localeCompare(right.sha));
}
