import { getPageHistory, shouldShowChangelog, type ChangelogFrontmatter } from '../lib/changelog';
import { GitHistoryView } from './git-history-view';

/** Read history only on the server and preserve all original per-page exclusions. */
export function GitChangelog({ sourcePath, frontmatter = {} }: { sourcePath: string; frontmatter?: ChangelogFrontmatter }) {
  if (!shouldShowChangelog(frontmatter)) return null;
  return <GitHistoryView commits={getPageHistory(sourcePath)} />;
}
