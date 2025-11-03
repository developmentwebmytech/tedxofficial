import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongodb';
import Notification from '@/models/Notification';

export async function GET() {
  await connectDB();
  const notifications = await Notification.find().sort({ createdAt: -1 });
  return NextResponse.json(notifications);
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
    }

    const newNotification = await Notification.create({ title, content });
    return NextResponse.json(newNotification, { status: 201 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('POST /api/notifications error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


