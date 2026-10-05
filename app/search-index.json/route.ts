import { createSearchTokenizer } from '@/lib/search-tokenizer';
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { collectComponentText } from '@/lib/search-component-text.mjs';

export const dynamic = 'force-static';
export const revalidate = false;
export async function GET() {
  const api = createFromSource(source, {
    tokenizer: createSearchTokenizer(),
    buildIndex(page) {
      const text = collectComponentText(page.data._exports);
      return {
        id: page.url,
        url: page.url,
        title: page.data.title,
        description: page.data.description,
        structuredData: {
          ...page.data.structuredData,
          contents: [...page.data.structuredData.contents, ...text],
        },
      };
    },
  });
  return api.staticGET();
}
