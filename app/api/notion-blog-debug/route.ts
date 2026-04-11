import { NextResponse } from 'next/server';
import { getNotionArticles } from '@/lib/notion-articles';

/**
 * GET /api/notion-blog-debug — only when NOTION_DEBUG=1 in env.
 * Returns how many articles Notion returned (no secrets). Use to verify integration.
 */
export async function GET() {
  if (process.env.NOTION_DEBUG !== '1' && process.env.NOTION_DEBUG !== 'true') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  try {
    const articles = await getNotionArticles();
    return NextResponse.json({
      ok: true,
      count: articles.length,
      slugs: articles.map((a) => a.slug),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
