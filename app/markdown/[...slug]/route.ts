import { source, getMarkdownPath } from '@/lib/source';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return source.getPages().map(page => ({
    slug: getMarkdownPath(page.path).slice('/markdown/'.length).split('/').map(decodeURIComponent),
  }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const requestedPath = `/markdown/${slug.join('/')}`;
  const page = source.getPages().find(page => getMarkdownPath(page.path) === requestedPath);
  if (!page) return new Response('Not found', { status: 404 });
  return new Response(await page.data.getText('raw'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
