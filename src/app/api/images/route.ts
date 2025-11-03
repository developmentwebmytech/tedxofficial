import { NextResponse } from "next/server";
import { Image } from "../../../models/Image";
import { connectDB } from "../../../lib/mongodb";

import path from "path";
import { writeFile } from "fs/promises";

export async function GET() {
  await connectDB();
  const images = await Image.find().sort({ createdAt: -1 });
  return NextResponse.json(images);
}

export async function POST(req: Request) {
  await connectDB();

  const data = await req.formData();
  const file = data.get("image") as File;
  const title = data.get("title") as string;
  const description = data.get("description") as string;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(filePath, buffer);

  const newImage = await Image.create({
    title,
    description,
    imageUrl: `/uploads/${filename}`,
  });

  return NextResponse.json(newImage);
}
