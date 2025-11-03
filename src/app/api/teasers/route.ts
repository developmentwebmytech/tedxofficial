import {connectDB} from '@/lib/mongodb';
import Teaser from '@/models/teaser';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const teasers = await Teaser.find().sort({ createdAt: -1 });
  return NextResponse.json(teasers);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const teaser = await Teaser.create(body);
  return NextResponse.json(teaser);
}
