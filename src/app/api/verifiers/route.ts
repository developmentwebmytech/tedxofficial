// import { connectDB } from '@/lib/mongodb';
// import { Verifier } from '@/models/verifier';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//   await connectDB();

//   try {
//     const verifiers = await Verifier.find({});
//     return NextResponse.json(verifiers);
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to fetch verifiers', error }, { status: 500 });
//   }
// }
// export async function PUT(request: NextRequest) {
//   await connectDB();

//   try {
//     const url = new URL(request.url);
//     const id = url.pathname.split('/').pop();

//     const body = await request.json();
//     const { status } = body;

//     if (!status) {
//       return NextResponse.json({ message: 'Missing status' }, { status: 400 });
//     }

//     const updatedVerifier = await Verifier.findOneAndUpdate(
//       { ID: id },
//       { status },
//       { new: true }
//     );

//     if (!updatedVerifier) {
//       return NextResponse.json({ message: 'Verifier not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Status updated', verifier: updatedVerifier }, { status: 200 });
//   } catch (error) {
//     console.error('PUT Error:', error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }
// export async function DELETE(request: NextRequest) {
//   await connectDB();

//   try {
//     const url = new URL(request.url);
//     const id = url.pathname.split('/').pop();

//     const deletedVerifier = await Verifier.findOneAndDelete({ ID: id });

//     if (!deletedVerifier) {
//       return NextResponse.json({ message: 'Verifier not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Verifier deleted' }, { status: 200 });
//   } catch (error) {
//     console.error('DELETE Error:', error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }

import { connectDB } from '@/lib/mongodb';
import { Verifier } from '@/models/verifier';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  try {
    const verifiers = await Verifier.find({});
    return NextResponse.json(verifiers);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch verifiers', error }, { status: 500 });
  }
}
