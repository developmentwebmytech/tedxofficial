import { connectDB } from "@/lib/mongodb"
import { Image } from "@/models/Image"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const body = await req.json()
  const { id } = await params // await params before accessing id
  const updated = await Image.findByIdAndUpdate(id, body, { new: true })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params // await params before accessing id
  const image = await Image.findByIdAndDelete(id)
  if (image?.imageUrl) {
    const filePath = path.join(process.cwd(), "public", image.imageUrl)
    fs.unlink(filePath, () => {})
  }
  return NextResponse.json({ success: true })
}
