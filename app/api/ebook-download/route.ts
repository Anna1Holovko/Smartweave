import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const PASSWORD = process.env.EBOOK_DOWNLOAD_PASSWORD;

/** Map e-book id to filename in private/ebooks/ */
const EBOOK_FILES: Record<string, string> = {
  'jak-przygotowac-firme-na-ai-w-20': 'Jak-przygotowac-firme-na-AI-w-20.epub',
  'firma-w-erze-ai': 'SmartWeave_Firma_w_Erze_AI.pdf',
};

const PDF_IDS = new Set(['firma-w-erze-ai']);

export async function POST(request: Request) {
  if (!PASSWORD) {
    return NextResponse.json(
      { error: 'Download not configured' },
      { status: 503 }
    );
  }

  let body: { id?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { id, password } = body;
  if (!id || typeof password !== 'string') {
    return NextResponse.json(
      { error: 'Missing id or password' },
      { status: 400 }
    );
  }

  if (password !== PASSWORD) {
    return NextResponse.json(
      { error: 'Nieprawidłowe hasło' },
      { status: 401 }
    );
  }

  const filename = EBOOK_FILES[id];
  if (!filename) {
    return NextResponse.json(
      { error: 'E-book not found' },
      { status: 404 }
    );
  }

  const filePath = path.join(process.cwd(), 'private', 'ebooks', filename);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    );
  }

  const buffer = fs.readFileSync(filePath);
  const isPdf = PDF_IDS.has(id);
  const contentType = isPdf ? 'application/pdf' : 'application/epub+zip';
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(buffer.length),
    },
  });
}
