import type { BaseLayoutProps } from '@fumadocs/base-ui/layouts/shared';
import navigation from './navigation.json';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: <span className="flex min-w-0 items-center gap-2">
      <img src="/WHUDAYS.png" alt="" width={36} height={36} className="size-9 shrink-0 object-contain" />
      <span>武汉大学动漫协会-WHUDAYS</span>
    </span>, url: '/' },
    links: navigation.nav.map((item) => ({ text: item.text, url: item.link })),
  };
}
