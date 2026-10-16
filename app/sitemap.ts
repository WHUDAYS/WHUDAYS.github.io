import type { MetadataRoute } from 'next';
import { source, getCanonicalPath } from '@/lib/source';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map(page => ({
    url: `${site.url}${getCanonicalPath(page.path)}`,
    ...(page.data.lastModified ? { lastModified: page.data.lastModified } : {}),
  }));
}
