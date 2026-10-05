import type { MetadataRoute } from 'next';
import { source, getCanonicalPath } from '@/lib/source';
import { readPageHistory } from '@/lib/git-history.mjs';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map(page => {
    const lastModified = readPageHistory(`docs/${page.path}`)[0]?.date;
    return {
      url: `${site.url}${getCanonicalPath(page.path)}`,
      ...(lastModified ? { lastModified } : {}),
    };
  });
}
