export interface MappedAuthor { name: string; username?: string; avatar?: string; mapByNameAliases?: string[]; mapByEmailAliases?: string[] }
export interface PublicAuthor { name: string; avatarUrl: string; url?: string }
export interface PageCommit { sha: string; shortSha: string; date: string; authoredAt: string; committedAt: string; tags?: { name: string; url: string }[]; message: string; description: string; authors: PublicAuthor[]; url: string }
export interface Frontmatter { layout?: string; gitChangelog?: boolean | { disableChangelog?: boolean; changelog?: boolean; disableContributors?: boolean }; disableChangelog?: boolean; nolebase?: { gitChangelog?: boolean } }
export const REPOSITORY_URL: string;
export function mapAuthor(name: string, email: string, registry?: MappedAuthor[]): PublicAuthor;
export function parseGitLog(output: string, registry?: MappedAuthor[], repoURL?: string): PageCommit[];
export function shouldShowChangelog(frontmatter?: Frontmatter): boolean;
export function readPageHistory(sourcePath: string, options?: { cwd?: string; registry?: MappedAuthor[]; repoURL?: string }): PageCommit[];
