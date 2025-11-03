import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ContactQuery from '@/models/contactQuery';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('RAW request body:', body); // 🔍 Log incoming data

    const { name, email, phone, message } = body;

    // Log each value individually for debugging
    console.log('Parsed values:', { name, email, phone, message });

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await connectDB();
    await ContactQuery.create({ name, email, phone, message });

    return NextResponse.json({ message: 'Query received' }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/contact:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const queries = await ContactQuery.find().sort({ createdAt: -1 });
    return NextResponse.json(queries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}