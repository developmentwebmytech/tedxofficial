// /app/api/list-uploads/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uploadPath = path.join(process.cwd(), 'public', 'uploads');

  try {
    const files = fs.readdirSync(uploadPath);
    const imageUrls = files.map(file => `/uploads/${file}`);
    return NextResponse.json(imageUrls);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Unable to read uploads folder' }, { status: 500 });
  }
}
