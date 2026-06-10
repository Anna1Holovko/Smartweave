import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const expected = process.env.BLOG_REVALIDATE_SECRET?.trim();

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = process.env.AIRTABLE_BLOG_API_KEY || process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BLOG_BASE_ID || 'app9YUgvYfBCLgsjq';
  const tableId = process.env.AIRTABLE_BLOG_TABLE_ID || 'tblZaKZwgmco4vAns';

  const debug: Record<string, unknown> = {
    hasToken: !!token,
    tokenPrefix: token ? token.slice(0, 10) + '...' : null,
    baseId,
    tableId,
  };

  if (!token) {
    return NextResponse.json({ ...debug, error: 'No token configured' });
  }

  try {
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}?maxRecords=3`;
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    debug.apiStatus = res.status;

    if (!res.ok) {
      debug.apiError = await res.text();
      return NextResponse.json(debug);
    }

    const data = await res.json();
    debug.recordCount = data.records?.length || 0;
    debug.sampleTitles = data.records?.slice(0, 3).map((r: any) => r.fields?.title || '(no title)');
    debug.sampleStatuses = data.records?.slice(0, 3).map((r: any) => r.fields?.status || '(no status)');

    return NextResponse.json(debug);
  } catch (e) {
    debug.fetchError = e instanceof Error ? e.message : String(e);
    return NextResponse.json(debug);
  }
}
