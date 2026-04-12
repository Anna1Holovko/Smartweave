import { NextResponse } from 'next/server';
import {
  fetchNotionArticlesFromApi,
  getNotionCacheSecondsFromEnv,
  isNotionBlogEnvConfigured,
  NOTION_LIST_REVALIDATE_SECONDS,
  shouldBypassNotionListCache,
} from '@/lib/notion-articles';

export const dynamic = 'force-dynamic';

const NO_STORE = {
  'Cache-Control': 'private, no-store, no-cache, must-revalidate, max-age=0',
} as const;

function debugAllowed(request: Request): boolean {
  /** Lokalnie `next dev` — bez sekretu (tylko na maszynie deweloperskiej). */
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  if (process.env.NOTION_DEBUG === '1' || process.env.NOTION_DEBUG === 'true') {
    return true;
  }
  const url = new URL(request.url);
  const q = url.searchParams.get('secret')?.trim();
  const header =
    request.headers.get('x-notion-debug-secret')?.trim() ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  const provided = q || header;
  const expected =
    process.env.NOTION_REVALIDATE_SECRET?.trim() ||
    process.env.NOTION_DEBUG_SECRET?.trim();
  return Boolean(expected && provided && provided === expected);
}

/**
 * GET /api/notion-blog-debug
 *
 * Dostęp gdy:
 * - NOTION_DEBUG=1 w env, **lub**
 * - ten sam sekret co revalidate: `?secret=` albo nagłówek `x-notion-debug-secret` / `Authorization: Bearer`
 *   (NOTION_REVALIDATE_SECRET albo NOTION_DEBUG_SECRET)
 *
 * Zawsze woła Notion na żywo (bez unstable_cache).
 */
export async function GET(request: Request) {
  if (!debugAllowed(request)) {
    const hasSecretInEnv = Boolean(
      process.env.NOTION_REVALIDATE_SECRET?.trim() || process.env.NOTION_DEBUG_SECRET?.trim(),
    );
    return NextResponse.json(
      {
        error: 'Unauthorized',
        how: hasSecretInEnv
          ? 'Dodaj do URL ten sam sekret co w Vercelu: /api/notion-blog-debug?secret=TWOJ_NOTION_REVALIDATE_SECRET (albo nagłówek x-notion-debug-secret). Albo ustaw NOTION_DEBUG=true w env.'
          : 'Ustaw w Vercelu NOTION_REVALIDATE_SECRET (jeden sekret do revalidate + debug), zrób redeploy env, potem: ?secret=... — albo NOTION_DEBUG=true.',
      },
      { status: 401, headers: NO_STORE },
    );
  }
  try {
    const articles = await fetchNotionArticlesFromApi();
    return NextResponse.json({
      ok: true,
      liveFromNotion: true,
      count: articles.length,
      slugs: articles.map((a) => a.slug),
      titles: articles.map((a) => a.title),
      coverUrls: articles.map((a) => a.cover_url ?? null),
      env: {
        notionConfigured: isNotionBlogEnvConfigured(),
        statusPublished: process.env.NOTION_STATUS_PUBLISHED?.trim() || 'Published',
        titleProperty: process.env.NOTION_PROP_TITLE || null,
        listCacheBypass: shouldBypassNotionListCache(),
        notionCacheSecondsEnv: getNotionCacheSecondsFromEnv(),
        listCacheRevalidateSeconds: NOTION_LIST_REVALIDATE_SECONDS,
        hint:
          articles.length === 0 && isNotionBlogEnvConfigured()
            ? 'Sprawdź w Notion: Status jak NOTION_STATUS_PUBLISHED, ta sama baza, integracja. Strona używa cache listy — POST /api/revalidate-blog lub ?secret= na revalidate (ten sam co tutaj).'
            : undefined,
        coverHint:
          'Okładka: w Notion ustaw „Add cover” na stronie wpisu albo kolumnę URL/Files i NOTION_PROP_COVER.',
      },
    }, { headers: NO_STORE });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500, headers: NO_STORE });
  }
}
