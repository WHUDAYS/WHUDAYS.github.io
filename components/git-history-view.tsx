'use client';

/*!
 * Adapted from @nolebase/vitepress-plugin-git-changelog 2.17.1 (MIT).
 * https://github.com/nolebase/integrations/tree/v2.17.1/packages/vitepress-plugin-git-changelog
 *
 * MIT License
 *
 * Copyright (c) 2023-PRESENT All the contributors of Nólëbase
 * Copyright (c) GitHub, Inc. (Octicons)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Fragment, useEffect, useId, useState, type ReactNode } from 'react';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import type { HistoryAuthor, HistoryCommit } from '../lib/changelog';
import './git-changelog.css';

const repository = 'https://github.com/WHUDAYS/WHUDAYS.github.io';
const absoluteDate = (date: string) => new Date(date).toLocaleDateString('zh-CN');
const fullDate = (date: string) => new Date(date).toLocaleString('zh-CN', { dateStyle: 'full', timeStyle: 'long' });

// The same Octicons used by Nolebase's UnoCSS build, without its global CSS reset.
const iconPaths = {
  "history": "m.427 1.927l1.215 1.215a8.002 8.002 0 1 1-1.6 5.685a.75.75 0 1 1 1.493-.154a6.5 6.5 0 1 0 1.18-4.458l1.358 1.358A.25.25 0 0 1 3.896 6H.25A.25.25 0 0 1 0 5.75V2.104a.25.25 0 0 1 .427-.177M7.75 4a.75.75 0 0 1 .75.75v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5A.75.75 0 0 1 7.75 4",
  "sort-desc": "M0 4.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 4.25m0 4a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8.25m0 4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75M13.5 10h2.25a.25.25 0 0 1 .177.427l-3 3a.25.25 0 0 1-.354 0l-3-3A.25.25 0 0 1 9.75 10H12V3.75a.75.75 0 0 1 1.5 0z",
  "sort-asc": "m12.927 2.573l3 3A.25.25 0 0 1 15.75 6H13.5v6.75a.75.75 0 0 1-1.5 0V6H9.75a.25.25 0 0 1-.177-.427l3-3a.25.25 0 0 1 .354 0M0 12.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75m0-4a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8.25m0-4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 4.25",
  "chevron-down": "M12.78 5.22a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.75.75 0 0 1 1.06 0",
  "git-commit": "M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0",
  "rocket": "M14.064 0h.186C15.216 0 16 .784 16 1.75v.186a8.75 8.75 0 0 1-2.564 6.186l-.458.459q-.472.471-.979.904v3.207c0 .608-.315 1.172-.833 1.49l-2.774 1.707a.75.75 0 0 1-1.11-.418l-.954-3.102a1 1 0 0 1-.145-.125L3.754 9.816a1 1 0 0 1-.124-.145L.528 8.717a.75.75 0 0 1-.418-1.11l1.71-2.774A1.75 1.75 0 0 1 3.31 4h3.204q.433-.508.904-.979l.459-.458A8.75 8.75 0 0 1 14.064 0M8.938 3.623h-.002l-.458.458c-.76.76-1.437 1.598-2.02 2.5l-1.5 2.317l2.143 2.143l2.317-1.5c.902-.583 1.74-1.26 2.499-2.02l.459-.458a7.25 7.25 0 0 0 2.123-5.127V1.75a.25.25 0 0 0-.25-.25h-.186a7.25 7.25 0 0 0-5.125 2.123M3.56 14.56c-.732.732-2.334 1.045-3.005 1.148a.23.23 0 0 1-.201-.064a.23.23 0 0 1-.064-.201c.103-.671.416-2.273 1.15-3.003a1.502 1.502 0 1 1 2.12 2.12m6.94-3.935q-.132.09-.266.175l-2.35 1.521l.548 1.783l1.949-1.2a.25.25 0 0 0 .119-.213ZM3.678 8.116L5.2 5.766q.087-.135.176-.266H3.309a.25.25 0 0 0-.213.119l-1.2 1.95ZM12 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
} as const;
function Icon({ name, className = '' }: { name: keyof typeof iconPaths; className?: string }) {
  return <svg className={`git-changelog-icon ${className}`} viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d={iconPaths[name]} /></svg>;
}

function safeLink(href: string) {
  return /^(?:https?:\/\/|\/|#)/i.test(href) ? href : undefined;
}

/** Nolebase's inline Markdown and issue links, rendered as escaped React nodes. */
function CommitMessage({ message }: { message: string }) {
  const parts: ReactNode[] = [];
  const tokens = /`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)|#(\d+)/g;
  let cursor = 0;
  for (const match of message.matchAll(tokens)) {
    parts.push(message.slice(cursor, match.index));
    const [, code, bold, italic, label, href, issue] = match;
    parts.push(<Fragment key={match.index}>{code !== undefined ? <code>{code}</code>
      : bold !== undefined ? <b>{bold}</b>
        : italic !== undefined ? <i>{italic}</i>
          : issue !== undefined ? <a href={`${repository}/issues/${issue}`}>#{issue}</a>
            : <a href={safeLink(href)}>{label}</a>}</Fragment>);
    cursor = match.index + match[0].length;
  }
  parts.push(message.slice(cursor));
  return <>{parts}</>;
}

function Author({ author }: { author: HistoryAuthor }) {
  const content = <><img src={author.avatarUrl} alt={`${author.name} 的头像`} width={24} height={24} loading="lazy" /><span className="vp-nolebase-git-changelog-author-name">{author.name}</span></>;
  return author.url
    ? <a className="vp-nolebase-git-changelog-author" href={author.url}>{content}</a>
    : <span className="vp-nolebase-git-changelog-author">{content}</span>;
}

function CommittedOn({ commit }: { commit: HistoryCommit }) {
  return <time dateTime={commit.date} title={fullDate(commit.date)}> 于 {absoluteDate(commit.date)}</time>;
}

function CommitList({ commits }: { commits: HistoryCommit[] }) {
  return <div className="git-changelog-list">{commits.map(commit => <Fragment key={commit.sha}>
    {commit.tags?.length ? <>
      <span className="git-changelog-release-icon"><Icon name="rocket" /></span>
      <div className="git-changelog-release" data-commit={commit.sha}>
        {commit.tags.map(tag => <a href={tag.url} key={tag.name} target="_blank" rel="noreferrer"><code>{tag.name}</code></a>)}
        <CommittedOn commit={commit} />
      </div>
    </> : <>
      <Icon name="git-commit" className="git-changelog-commit-icon" />
      <div className="git-changelog-entry" data-commit={commit.sha}>
        <a className="git-changelog-sha" href={commit.url} target="_blank" rel="noreferrer" aria-label={`查看提交 ${commit.shortSha}`}><code>{commit.shortSha}</code></a>
        <span aria-hidden="true">-</span>
        <span className="git-changelog-content">
          <span className="git-changelog-message"><CommitMessage message={commit.message} /></span>
          <span className="vp-nolebase-git-changelog-authors">{commit.authors.map((author, index) => <Author author={author} key={`${author.name}:${index}`} />)}</span>
          <CommittedOn commit={commit} />
        </span>
      </div>
    </>}
  </Fragment>)}</div>;
}

/** React port of Nolebase 2.17.1 Changelog/CommitRegularLine/CommitTagLine.
 * The original site's author-name patch is preserved. Contributors were disabled.
 * All records stay in the exported HTML; collapsing only changes their visibility.
 */
export function GitHistoryView({ commits }: { commits: HistoryCommit[] }) {
  const [descending, setDescending] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const historyId = useId();
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const latest = commits[0];
  const fresh = latest && now !== null && differenceInDays(now, new Date(latest.date)) < 1;
  const ordered = descending ? commits : [...commits].reverse();
  return <section className="git-changelog not-prose" aria-labelledby="页面历史" data-git-changelog data-history-count={commits.length}>
    <h2 id="页面历史">页面历史<a href="#页面历史" aria-label="页面历史的永久链接" className="git-changelog-anchor">#</a></h2>
    {!latest ? <div className="git-changelog-empty">暂无最近变更历史</div> : <div
      className="vp-nolebase-git-changelog vp-nolebase-git-changelog-history vp-nolebase-git-changelog-history-list vp-nolebase-git-changelog-history-container"
      data-expanded={expanded} data-fresh={fresh ? true : undefined}
    >
      <div className="vp-nolebase-git-changelog-title">
        <button type="button" className="git-changelog-toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={historyId}>
          <span className="vp-nolebase-git-changelog-last-edited-title"><Icon name="history" />
            <span>最后编辑于 <time dateTime={latest.date} title={fullDate(latest.date)}>{now === null ? absoluteDate(latest.date) : formatDistanceToNow(new Date(latest.date), { locale: zhCN, addSuffix: true })}</time></span>
          </span>
          <span className="vp-nolebase-git-changelog-view-full-history-title"><span>查看完整历史</span><Icon name="chevron-down" className="git-changelog-chevron" /></span>
        </button>
        <button type="button" className="git-changelog-sort" onClick={() => expanded && setDescending(!descending)} aria-disabled={!expanded} aria-label={descending ? '按最早提交排序' : '按最新提交排序'} title={descending ? '按最早提交排序' : '按最新提交排序'}>
          <Icon name={descending ? 'sort-desc' : 'sort-asc'} />
        </button>
      </div>
      <div id={historyId} className="git-changelog-collapse" aria-hidden={!expanded} inert={!expanded}>
        <div className="git-changelog-collapse-content"><CommitList commits={ordered} /></div>
      </div>
    </div>}
  </section>;
}
