/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongodb';
import Document from '@/models/document';

export async function POST(req: Request) {
  await connectDB();
  const { docNumber } = await req.json();


  try {
    const document = await Document.findOne({ docNumber:docNumber });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({
        "message" : "Success",
        document
    })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
