'use client';
import { RootProvider } from '@fumadocs/base-ui/provider/next';
import type { ReactNode } from 'react';
import StaticSearchDialog from './search';
import { defineTranslations } from 'fumadocs-core/i18n';
import { i18nProvider, uiTranslations } from '@fumadocs/base-ui/i18n';
import { zhCN as uiZhCN } from '@fumadocs/language/zh-cn';
import { gitChangelogTranslations, zhCN as historyZhCN } from 'fumadocs-page-history/i18n';

const translations = defineTranslations()
  .extend(uiTranslations())
  .extend(gitChangelogTranslations())
  .preset(uiZhCN())
  .preset(historyZhCN());
export function Provider({ children }: { children: ReactNode }) {
  return <RootProvider i18n={i18nProvider(translations)} search={{ SearchDialog: StaticSearchDialog }}>
    {children}
  </RootProvider>;
}
