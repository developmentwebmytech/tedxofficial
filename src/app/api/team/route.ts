import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { Team } from "@/models/teammember";
import {connectDB} from "@/lib/mongodb";

// POST - Create a new member
export async function POST(req: Request) {
  await connectDB();

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file || typeof file === "string") {
      return NextResponse.json({ success: false, message: "No image file uploaded." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const newMember = await Team.create({
      name: formData.get("name"),
      position: formData.get("position"),
      about: formData.get("about"),
      image: filename,
      socials: {
        facebook: formData.get("facebook"),
        linkedin: formData.get("linkedin"),
        twitter: formData.get("twitter"),
        youtube: formData.get("youtube"),
      },
    });

    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}

// GET - Fetch all members
export async function GET() {
  await connectDB();
  const members = await Team.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: members });
}
