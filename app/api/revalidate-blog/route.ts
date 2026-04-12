import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

/** Avoid CDN/browser caching GET ?secret= — otherwise “revalidate works only once” in the browser. */
const NO_STORE = {
  'Cache-Control': 'private, no-store, no-cache, must-revalidate, max-age=0',
} as const;

function getSecretFromRequest(request: Request): string | undefined {
  const url = new URL(request.url);
  const q = url.searchParams.get('secret')?.trim();
  if (q) return q;
  const h = request.headers.get('x-notion-revalidate-secret')?.trim();
  if (h) return h;
  const auth = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (auth) return auth;
  return undefined;
}

async function runRevalidate(): Promise<{ ok: true; revalidated: string[] }> {
  revalidateTag('notion-blog');
  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/sitemap.xml');
  return {
    ok: true,
    revalidated: ['tag:notion-blog', '/blog', '/', '/sitemap.xml'],
  };
}

/**
 * Odświeżenie cache bloga **bez deploya** (po edycji w Notion).
 *
 * **POST** — nagłówek `x-notion-revalidate-secret` lub JSON `{ "secret": "..." }`
 * **GET** — `?secret=...` (wygodne w przeglądarce; nie udostępniaj publicznie URL z sekretem)
 *
 * Wymaga NOTION_REVALIDATE_SECRET w env (jeden deploy konfiguracji na Vercelu).
 */
export async function POST(request: Request) {
  const expected = process.env.NOTION_REVALIDATE_SECRET?.trim();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'NOTION_REVALIDATE_SECRET is not set' },
      { status: 503, headers: NO_STORE },
    );
  }

  const url = new URL(request.url);
  let provided =
    url.searchParams.get('secret')?.trim() ||
    request.headers.get('x-notion-revalidate-secret')?.trim();
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
    const result = await runRevalidate();
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500, headers: NO_STORE });
  }
}

export async function GET(request: Request) {
  const expected = process.env.NOTION_REVALIDATE_SECRET?.trim();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'NOTION_REVALIDATE_SECRET is not set' },
      { status: 503, headers: NO_STORE },
    );
  }
  const provided = getSecretFromRequest(request);
  if (!provided || provided !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401, headers: NO_STORE });
  }
  try {
    const result = await runRevalidate();
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500, headers: NO_STORE });
  }
}
