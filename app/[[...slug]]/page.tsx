import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsLayout } from '@fumadocs/base-ui/layouts/spacious';
import { HomeLayout } from '@fumadocs/base-ui/layouts/home';
import { DocsPage, DocsBody, MarkdownCopyButton, ViewOptionsPopover } from '@fumadocs/base-ui/layouts/spacious/page';
import { Heading } from '@fumadocs/base-ui/components/heading';
import { Lightbox } from '@fumadocs/base-ui/components/image-zoom';
import { source, getCanonicalPath, getMarkdownPath, getOGImagePath } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { getLayoutTree, getPagination, sectionTabs } from '@/lib/navigation';
import { getMDXComponents } from '@/components/mdx';
import { TeamPageTitle } from '@/components/content';
import { CanonicalUrl } from '@/components/canonical-url';
import { Home } from '@/components/home';
import { SiteFooter } from '@/components/site-footer';
import { site } from '@/lib/site';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';

type Props = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return source.getPages().map((page) => ({ slug: page.slugs.map(decodeURIComponent) })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const path = getCanonicalPath(page.path);
  const images = [{ url: getOGImagePath(page.path), width: 1200, height: 630, alt: page.data.title }];
  return {
    title: page.data.layout === 'home' ? { absolute: site.title } : page.data.title,
    description: page.data.description ?? site.description,
    alternates: { canonical: `${site.url}${path}` },
    openGraph: { type: 'website', locale: 'zh_CN', siteName: site.title, title: page.data.title, description: page.data.description ?? site.description, url: `${site.url}${path}`, images },
    twitter: { card: 'summary_large_image', title: page.data.title, description: page.data.description ?? site.description, images },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const data = page.data;
  if (data.layout === 'home') return <><CanonicalUrl path="/" /><Home hero={data.hero} features={data.features} /></>;
  const MDX = data.body;
  const markdownUrl = getMarkdownPath(page.path);
  const pageActions = data.layout === 'page' && page.path.startsWith('about/hq/') ? null : <div className="not-prose my-6 flex flex-wrap items-center gap-2" aria-label="页面操作">
    <MarkdownCopyButton markdownUrl={markdownUrl} />
    <ViewOptionsPopover markdownUrl={markdownUrl}
      githubUrl={`https://github.com/WHUDAYS/WHUDAYS.github.io/blob/main/docs/${page.path.split('/').map(encodeURIComponent).join('/')}`}
      pageUrl={`${site.url}${getCanonicalPath(page.path)}`} />
  </div>;
  const content = <Lightbox><MDX components={getMDXComponents({
    h1: (props) => <><Heading as="h1" {...props} />{pageActions}</>,
    TeamPageTitle: (props) => <><TeamPageTitle {...props} />{pageActions}</>,
  })} /></Lightbox>;
  if (data.layout === 'page') return <HomeLayout {...baseOptions()}><CanonicalUrl path={getCanonicalPath(page.path)} />
    <main id="main-content" className="team-document"><div data-search-content>{content}<span data-search-content-end /></div></main><SiteFooter />
  </HomeLayout>;
  const outline = data.outline;
  const toc = data.toc.filter((entry) => entry.depth >= (Array.isArray(outline) ? outline[0] : 2) && entry.depth <= (Array.isArray(outline) ? outline[1] : typeof outline === 'number' ? outline : outline === 'deep' ? 6 : 2));
  return <DocsLayout {...baseOptions()} links={[]} tree={getLayoutTree(page.url)} tabs={sectionTabs}>
    <CanonicalUrl path={getCanonicalPath(page.path)} />
    <BreadcrumbSchema url={page.url} section={page.slugs[0]} />
    <DocsPage id="main-content" toc={toc} footer={{ items: getPagination(page.url) }} breadcrumb={{ includeRoot: { url: `/${page.slugs[0]}/` }, includePage: true, 'aria-label': '当前位置' }} tableOfContent={{ enabled: outline !== false, style: 'clerk' }} tableOfContentPopover={{ enabled: outline !== false, style: 'clerk' }}>
      <DocsBody><div data-search-content>{content}<span data-search-content-end /></div></DocsBody>
      <a className="back-to-top" href="#main-content">回到顶部 ↑</a>
      <SiteFooter />
    </DocsPage>
  </DocsLayout>;
}
