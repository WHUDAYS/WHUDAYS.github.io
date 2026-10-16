import { llmExport } from '@/lib/llms';

export const dynamic = 'force-static';

export async function GET() {
  return new Response(await llmExport.full(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
