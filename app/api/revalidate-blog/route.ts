import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

/**
 * POST /api/revalidate-blog — bust Next.js cache for Notion blog data (no redeploy).
 *
 * Header: `x-notion-revalidate-secret: <NOTION_REVALIDATE_SECRET>`
 * or JSON body: `{ "secret": "<same>" }`
 *
 * Call from Notion Automations, cron, or curl after publishing. Set NOTION_REVALIDATE_SECRET in Vercel env.
 */
export async function POST(request: Request) {
  const expected = process.env.NOTION_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'NOTION_REVALIDATE_SECRET is not set' },
      { status: 503 },
    );
  }

  let provided = request.headers.get('x-notion-revalidate-secret')?.trim();
  if (!provided) {
    try {
      const body = (await request.json()) as { secret?: string };
      if (typeof body?.secret === 'string') provided = body.secret.trim();
    } catch {
      /* empty body */
    }
  }

  if (!provided || provided !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    revalidateTag('notion-blog');
    revalidatePath('/blog');
    revalidatePath('/');
    revalidatePath('/sitemap.xml');
    return NextResponse.json({
      ok: true,
      revalidated: ['tag:notion-blog', '/blog', '/', '/sitemap.xml'],
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
