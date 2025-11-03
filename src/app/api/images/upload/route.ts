// app/api/upload/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import {Image} from '../../../../models/Image';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  try {
    fs.writeFileSync(filePath, buffer);
    console.log('✅ File saved at:', filePath);

    await connectDB();
    console.log('✅ Connected to DB');

    const saved = await Image.create({
      filename,
      url: `/uploads/${filename}`,
    });

    console.log('✅ Image saved in DB:', saved);
    console.log('✅ Upload success:', saved);

    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (error) {
    console.error('❌ Upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    // app/api/upload/route.ts


  }
}
