import { source, getOGImagePath } from '@/lib/source';
import { pageOGImage } from '@/lib/og';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return source.getPages().map(page => ({ slug: getOGImagePath(page.path).slice('/og/'.length).split('/') }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = source.getPages().find(page => getOGImagePath(page.path) === `/og/${slug.join('/')}`);
  if (!page) return new Response('Not found', { status: 404 });
  return pageOGImage(page.data.title, page.data.description ?? '');
}
