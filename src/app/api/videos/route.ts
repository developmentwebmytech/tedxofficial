
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Video from '@/models/video';

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json(videos);
  } catch (err) {
  console.error('Error fetching videos:', err);
  return NextResponse.json({ message: 'Error fetching videos' }, { status: 500 });
}

}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, description, youtubeId } = await req.json();

    if (!title || !description || !youtubeId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const video = await Video.create({ title, description, youtubeId });
    return NextResponse.json(video, { status: 201 });
  }catch (err) {
  console.error('Error fetching videos:', err);
  return NextResponse.json({ message: 'Error fetching videos' }, { status: 500 });
}

}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { title, description, youtubeId } = await req.json();

    if (!id || !title || !description || !youtubeId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const updated = await Video.findByIdAndUpdate(
      id,
      { title, description, youtubeId },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
  console.error('Error fetching videos:', err);
  return NextResponse.json({ message: 'Error fetching videos' }, { status: 500 });
}

}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
    }

    const deleted = await Video.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (err) {
  console.error('Error fetching videos:', err);
  return NextResponse.json({ message: 'Error fetching videos' }, { status: 500 });
}

}
