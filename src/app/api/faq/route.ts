import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Faq from '@/models/faq';

export async function GET() {
  await connectDB();
  const faqs = await Faq.find().sort({ createdAt: -1 });
  return NextResponse.json(faqs);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { question, answer } = body;

  if (!question || !answer) {
    return NextResponse.json({ error: 'Question and Answer required' }, { status: 400 });
  }

  await connectDB();
  const newFaq = await Faq.create({ question, answer });
  return NextResponse.json(newFaq, { status: 201 });
}
