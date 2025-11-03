import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Collaborator from '@/models/collaborator';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    await connectDB();
    const collaborators = await Collaborator.find();
    return NextResponse.json(collaborators);
  } catch (error) {
    console.error('Error fetching collaborators:', error);
    return NextResponse.json({ message: 'Failed to fetch collaborators' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const about = formData.get('about') as string;
    const file = formData.get('image') as File | null;
    const linkedin = formData.get('linkedin') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;

    if (!name || !about || !file || file.size === 0) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // File Handling
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    // Save to DB
    const newCollaborator = await Collaborator.create({
      name,
      about,
      imageUrl,
      social: {
        linkedin,
        twitter,
        instagram,
      },
    });

    return NextResponse.json(newCollaborator, { status: 201 });
  } catch (error) {
    console.error('Error creating collaborator:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
