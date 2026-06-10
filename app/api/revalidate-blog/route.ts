import { NextResponse } from 'next/server';
import { revalidateBlogCache } from '@/lib/revalidate-blog-cache';

export const dynamic = 'force-dynamic';

/** Avoid CDN/browser caching GET ?secret= — otherwise “revalidate works only once” in the browser. */
const NO_STORE = {
  'Cache-Control': 'private, no-store, no-cache, must-revalidate, max-age=0',
} as const;

function getSecretFromRequest(request: Request): string | undefined {
  const url = new URL(request.url);
  const q = url.searchParams.get('secret')?.trim();
  if (q) return q;
  const h = request.headers.get('x-revalidate-secret')?.trim();
  if (h) return h;
  const auth = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (auth) return auth;
  return undefined;
}

/**
 * Odświeżenie cache bloga **bez deploya** (po zmianie statusu w Airtable).
 *
 * **POST** — nagłówek `x-revalidate-secret` lub JSON `{ "secret": "..." }`
 * **GET** — `?secret=...` (wygodne w przeglądarce; nie udostępniaj publicznie URL z sekretem)
 *
 * Wymaga BLOG_REVALIDATE_SECRET w env (lub NOTION_REVALIDATE_SECRET dla kompatybilności).
 */
export async function POST(request: Request) {
  const expected = process.env.BLOG_REVALIDATE_SECRET?.trim() || process.env.NOTION_REVALIDATE_SECRET?.trim();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'BLOG_REVALIDATE_SECRET is not set' },
      { status: 503, headers: NO_STORE },
    );
  }

  let provided = getSecretFromRequest(request);
  if (!provided) {
    try {
      const body = (await request.json()) as { secret?: string };
      if (typeof body?.secret === 'string') provided = body.secret.trim();
    } catch {
      /* empty or non-json */
    }
  }

  if (!provided || provided !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }

  try {
    const result = await revalidateBlogCache();
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500, headers: NO_STORE });
  }
}

export async function GET(request: Request) {
  const expected = process.env.BLOG_REVALIDATE_SECRET?.trim() || process.env.NOTION_REVALIDATE_SECRET?.trim();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'BLOG_REVALIDATE_SECRET is not set' },
      { status: 503, headers: NO_STORE },
    );
  }
  const provided = getSecretFromRequest(request);
  if (!provided || provided !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }
  try {
    const result = await revalidateBlogCache();
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500, headers: NO_STORE });
  }
}
