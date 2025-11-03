import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PolicyDocument from '@/models/PolicyDocument';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  await connectDB();
  const documents = await PolicyDocument.find().sort({ uploadedAt: -1 });
  return NextResponse.json(documents);
}

export async function POST(req: Request) {
  await connectDB();

  // Parse form data
  const data = await req.formData();
  const file = data.get('file') as File;
  const title = data.get('title') as string;

  if (!file || !title) {
    return NextResponse.json({ error: 'Title and file are required.' }, { status: 400 });
  }

  // Save file to /public/uploads
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', filename);
  await writeFile(filePath, buffer);

  const fileUrl = `/uploads/${filename}`;

  const newDoc = new PolicyDocument({
    title,
    fileUrl,
  });

  await newDoc.save();

  return NextResponse.json(newDoc);
}
