import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

// POST = Create new application
export async function POST(req: Request) {
  try {
    await connectDB();
    const { applicationId, status, message } = await req.json();

    if (!applicationId) {
      return NextResponse.json(
        { success: false, error: "Application ID is required" },
        { status: 400 }
      );
    }

    const exists = await Application.findOne({ applicationId });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "Application ID already exists" },
        { status: 400 }
      );
    }

    const newApp = await Application.create({
      applicationId,
      status,
      message,
    });

    return NextResponse.json({ success: true, application: newApp });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}

// GET = All applications
export async function GET() {
  try {
    await connectDB();
    const apps = await Application.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, applications: apps });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
