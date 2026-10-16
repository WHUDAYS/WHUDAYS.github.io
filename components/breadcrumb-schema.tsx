import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { getLayoutTree } from '@/lib/navigation';
import { site } from '@/lib/site';

/** Use the same tree and options as the visible Fumadocs breadcrumbs. */
export function BreadcrumbSchema({ url, section }: { url: string; section: string }) {
  const seen = new Set<string>();
  const items = getBreadcrumbItems(url, getLayoutTree(url), {
    includeRoot: { url: `/${section}/` }, includePage: true,
  }).flatMap(item => {
    if (!item.url || typeof item.name !== 'string') return [];
    const canonical = new URL(`${item.url.replace(/\/$/, '')}/`, site.url).href;
    if (seen.has(canonical)) return [];
    seen.add(canonical);
    return [{ '@type': 'ListItem', position: seen.size, name: item.name, item: canonical }];
  });
  if (items.length < 2) return null;
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}
