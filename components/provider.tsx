'use client';
import { RootProvider } from '@fumadocs/base-ui/provider/next';
import type { ReactNode } from 'react';
import StaticSearchDialog from './search';

const translations = {
  'Layout Tab(layout tab trigger)': '切换分区',
  'Options(aria-label)': '选项', 'Theme(site menu)': '主题', 'Language(site menu)': '语言',
  'Toggle Theme(aria-label)': '切换主题',
  'Dark(aria-label)': '深色', 'Light(aria-label)': '浅色', 'System(aria-label)': '跟随系统',
  'Search(search trigger)': '搜索', 'Search(search dialog)': '搜索',
  'Open Search(search trigger)(aria-label)': '打开搜索', 'Close Search(search dialog)(aria-label)': '关闭搜索',
  'No results found(search dialog)': '没有找到结果',
  'On this page(table of contents)': '本页目录', 'Table of Contents(inline table of contents)': '本页目录',
  'Next Page(pagination)': '下一页', 'Previous Page(pagination)': '上一页',
  'Last updated on(page footer)': '最后更新',
  'Toggle Menu(mobile menu)(aria-label)': '菜单', 'Open Sidebar(sidebar)(aria-label)': '打开菜单',
  'Close Sidebar(sidebar)(aria-label)': '关闭菜单', 'Close Sidebar(aria-label)': '关闭菜单',
  'Collapse Sidebar(sidebar)(aria-label)': '折叠菜单', 'Hide Sidebar(sidebar)': '隐藏菜单', 'Show Sidebar(sidebar)': '显示菜单',
  'Toggle Theme(theme switcher)(aria-label)': '切换主题', 'Dark(theme switcher)(aria-label)': '深色',
  'Light(theme switcher)(aria-label)': '浅色', 'System(theme switcher)(aria-label)': '跟随系统',
  'Copy Text(code block)(aria-label)': '复制代码', 'Copied Text(code block)(aria-label)': '已复制',
  'Copy Anchor Link(heading anchor)(aria-label)': '复制锚点链接', 'Copied Anchor Link(heading anchor)(aria-label)': '已复制链接',
  'Copy Markdown(page actions)': '复制 Markdown', 'Copied Markdown(page actions)': '已复制 Markdown',
  'Open(page actions)': '打开', 'Open in GitHub(page actions)': '在 GitHub 查看', 'View as Markdown(page actions)': '查看 Markdown',
  'Open in Scira AI(page actions)': '在 Scira AI 中打开', 'Open in ChatGPT(page actions)': '在 ChatGPT 中打开',
  'Open in Claude(page actions)': '在 Claude 中打开', 'Open in Cursor(page actions)': '在 Cursor 中打开',
  'Read {url}, I want to ask questions about it.(page actions)': '请阅读 {url}，我想询问有关页面内容的问题。',
};
export function Provider({ children }: { children: ReactNode }) {
  return <RootProvider i18n={{ translations }} search={{ SearchDialog: StaticSearchDialog }}>
    {children}
  </RootProvider>;
}
