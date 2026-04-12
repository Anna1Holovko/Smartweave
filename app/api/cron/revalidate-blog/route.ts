import { NextResponse } from 'next/server';
import { revalidateBlogCache } from '@/lib/revalidate-blog-cache';

export const dynamic = 'force-dynamic';

const NO_STORE = {
  'Cache-Control': 'private, no-store, no-cache, must-revalidate, max-age=0',
} as const;

/**
 * Vercel Cron (vercel.json) calls GET with `Authorization: Bearer <CRON_SECRET>`.
 * Manual: same Bearer, or `?secret=` matching CRON_SECRET or NOTION_REVALIDATE_SECRET.
 */
function authorized(request: Request): boolean {
  const url = new URL(request.url);
  const q = url.searchParams.get('secret')?.trim();
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  const cronSecret = process.env.CRON_SECRET?.trim();
  const notionSecret = process.env.NOTION_REVALIDATE_SECRET?.trim();
  const candidates = [cronSecret, notionSecret].filter(Boolean) as string[];
  if (candidates.length === 0) return false;
  if (q && candidates.includes(q)) return true;
  if (bearer && candidates.includes(bearer)) return true;
  return false;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
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
