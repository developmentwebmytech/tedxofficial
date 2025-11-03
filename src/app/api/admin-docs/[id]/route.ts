/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Document from '@/models/document';

export async function DELETE(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any   // ✅ use any to avoid Next.js type bug
) {
  await connectDB();

  try {
    const { id } = context.params as { id: string }; // ✅ safely extract id

    await Document.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
