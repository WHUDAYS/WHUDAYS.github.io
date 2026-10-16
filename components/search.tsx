'use client';

import { createSearchDatabase } from '@/lib/search-tokenizer';
import { useStaticSearch } from 'fumadocs-core/search/client/orama-static';
import {
  SearchDialog, SearchDialogClose, SearchDialogContent, SearchDialogHeader,
  SearchDialogIcon, SearchDialogInput, SearchDialogList, SearchDialogOverlay,
  type SharedProps, type SearchItemType,
} from '@fumadocs/base-ui/components/dialog/search';

function revealSearchResult(item: SearchItemType) {
  if (item.type === 'action' || item.external) return;
  const destination = new URL(item.url, window.location.href);
  if (!destination.hash) return;
  const deadline = performance.now() + 5000;
  const reveal = () => {
    if (window.location.pathname.replace(/\/$/, '') === destination.pathname.replace(/\/$/, '') && window.location.hash === destination.hash) {
      const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
      if (target) {
        let opened = false;
        for (let parent = target.parentElement; parent; parent = parent.parentElement) {
          if (parent instanceof HTMLDetailsElement && !parent.open) { parent.open = true; opened = true; }
        }
        if (opened) target.scrollIntoView({ block: 'start', behavior: 'instant' });
        return;
      }
    }
    if (performance.now() < deadline) requestAnimationFrame(reveal);
  };
  // Next.js completes navigation asynchronously; reveal after the target mounts.
  requestAnimationFrame(reveal);
}

export default function StaticSearchDialog(props: SharedProps) {
  const search = useStaticSearch({
    from: '/search-index.json', initDB: createSearchDatabase,
  });
  return <SearchDialog {...search} {...props} onSelect={revealSearchResult}>
    <SearchDialogOverlay />
    <SearchDialogContent>
      <SearchDialogHeader>
        <SearchDialogIcon />
        <SearchDialogInput placeholder="搜索社团活动、成员与文档…" />
        <SearchDialogClose />
      </SearchDialogHeader>
      <SearchDialogList />
    </SearchDialogContent>
  </SearchDialog>;
}
