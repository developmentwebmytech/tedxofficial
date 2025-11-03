import { connectDB } from '@/lib/mongodb';
import Speaker from '@/models/speaker';
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function GET() {
  await connectDB();
  const speakers = await Speaker.find();
  return NextResponse.json(speakers);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const about = formData.get('about') as string;
    const linkedin = formData.get('linkedin') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const file = formData.get('image') as File | null;

    if (!name || !about || !file || file.size === 0) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const image = `/uploads/${fileName}`;

    const speaker = await Speaker.create({
      name,
      about,
      image,
      social: { linkedin, twitter, instagram },
    });

    return NextResponse.json(speaker, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
