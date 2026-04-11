import { NextResponse } from 'next/server';
import { getNotionArticles, isNotionBlogEnvConfigured } from '@/lib/notion-articles';

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
      titles: articles.map((a) => a.title),
      env: {
        notionConfigured: isNotionBlogEnvConfigured(),
        statusPublished: process.env.NOTION_STATUS_PUBLISHED?.trim() || 'Published',
        titleProperty: process.env.NOTION_PROP_TITLE || null,
        hint:
          articles.length === 0 && isNotionBlogEnvConfigured()
            ? 'Sprawdź w Notion: Status dokładnie jak NOTION_STATUS_PUBLISHED, wiersz w tej samej bazie co NOTION_BLOG_DATABASE_ID, kolumna tytułu wypełniona (lub NOTION_PROP_TITLE). Ustaw NOTION_SKIP_CACHE=1 i odśwież.'
            : undefined,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
