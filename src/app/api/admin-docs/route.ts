import { NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongodb';
import Document from '@/models/document';

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  try {
    const created = await Document.create(data);
    return NextResponse.json(created);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const docs = await Document.find().sort({ createdAt: -1 });
  return NextResponse.json(docs);
}
