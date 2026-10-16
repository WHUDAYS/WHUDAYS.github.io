import type { Root, Node } from 'fumadocs-core/page-tree';
import { flattenTree } from 'fumadocs-core/page-tree';
import type { LayoutTab } from '@fumadocs/base-ui/layouts/shared';
import { createElement } from 'react';
import { AudioLines, CalendarDays, FolderOpen, Info, MessagesSquare, UsersRound, Wrench, type LucideIcon } from 'lucide-react';
import navigation from './navigation.json';

export interface NavigationItem { text: string; link?: string; collapsed?: boolean; items?: NavigationItem[] }
export const sidebars = navigation.sidebar as Record<string, NavigationItem[]>;
const sectionIcons: Record<string, LucideIcon> = {
  '/about/': Info,
  '/activity/': CalendarDays,
  '/department/': UsersRound,
  '/group/': MessagesSquare,
  '/message-box/': AudioLines,
  '/maintainer/': Wrench,
};
export const sectionTabs: LayoutTab[] = navigation.nav
  .filter((item) => item.link !== '/')
  .map((item) => ({ title: item.text, url: item.link, icon: createElement(sectionIcons[item.link] ?? FolderOpen, { 'aria-hidden': true }) }));

function convert(item: NavigationItem): Node {
  if (item.items) return {
    type: 'folder', name: item.text,
    defaultOpen: item.collapsed === false,
    index: item.link ? { type: 'page', name: item.text, url: encodeURI(item.link) } : undefined,
    children: item.items.map(convert),
  };
  return { type: 'page', name: item.text, url: encodeURI(item.link ?? '/') };
}

export function getSidebar(path: string): Root {
  const key = Object.keys(sidebars).sort((a, b) => b.length - a.length)
    .find((prefix) => `${path.replace(/\/$/, '')}/`.startsWith(prefix));
  return { name: '菜单', children: key ? sidebars[key].map(convert) : [] };
}


/** Preserve VitePress pagination, including unlisted-page → section overview. */
export function getPagination(path: string) {
  const normalize = (value: string) => decodeURI(value).replace(/[?#].*$/, '').replace(/\/index(?:\.html)?$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const taken = new Set<string>();
  const links = flattenTree(getSidebar(normalize(path)).children).filter(item => {
    const url = normalize(item.url);
    if (taken.has(url)) return false;
    taken.add(url);
    return true;
  });
  const index = links.findIndex((item) => normalize(item.url) === normalize(path));
  return { previous: links[index - 1], next: links[index + 1] };
}
