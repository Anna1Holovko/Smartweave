import { NextResponse } from 'next/server';
import { getAirtableDebugInfo } from '@/lib/airtable';

/**
 * GET /api/airtable-debug?secret=YOUR_SECRET
 * Returns Airtable config status, table schema field names, and the field names we use when creating records.
 * Set AIRTABLE_DEBUG_SECRET in env and pass it as ?secret= so only you can view this.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = process.env.AIRTABLE_DEBUG_SECRET;
  if (!secret || searchParams.get('secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const info = await getAirtableDebugInfo();
    return NextResponse.json(info);
  } catch (e) {
    console.error('[Airtable debug]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
