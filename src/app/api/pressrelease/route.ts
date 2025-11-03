// /app/api/pressrelease/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { connectDB } from '@/lib/mongodb';
import PressRelease from '@/models/pressRelease';

// POST: Create a new press release
export async function POST(req: NextRequest) {
  await connectDB();

  const formData = await req.formData();
  const title = formData.get('title') as string;
  const date = formData.get('date') as string;
  const file = formData.get('file') as File | null;

  if (!title || !file || !date) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  await writeFile(filePath, buffer);

  const newRelease = new PressRelease({
    title,
    date, // ✅ store date explicitly
    pdfUrl: `/uploads/${filename}`,
  });

  await newRelease.save();

  return NextResponse.json(newRelease, { status: 201 });
}

// GET: Return all press releases
export async function GET() {
  await connectDB();

  try {
    const releases = await PressRelease.find().sort({ createdAt: -1 });
    return NextResponse.json(releases, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch press releases' }, { status: 500 });
  }
}
