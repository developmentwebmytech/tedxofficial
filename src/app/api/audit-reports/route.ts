import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/mongodb";
import AuditReport from "@/models/AuditReport";

export async function GET() {
  await connectDB();
  const reports = await AuditReport.find().sort({ createdAt: -1 });
  return NextResponse.json(reports);
}

export async function POST(req: NextRequest) {
  await connectDB();

  const data = await req.formData();
  const file = data.get("file") as File;
  const title = data.get("title") as string;
  const uploader = data.get("uploader") as string;

  if (!file || !title || !uploader) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(filepath, buffer);

  const newReport = await AuditReport.create({
    title,
    filename,
    uploader,
  });

  return NextResponse.json(newReport);
}
