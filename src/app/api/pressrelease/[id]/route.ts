import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { connectDB } from "@/lib/mongodb"
import PressRelease from "@/models/pressRelease"

// PUT: Update a press release
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params

  const formData = await req.formData()
  const title = formData.get("title") as string
  const date = formData.get("date") as string
  const file = formData.get("file") as File | null

  const updateData: { title: string; date: string; pdfUrl?: string } = { title, date }

  if (file) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${file.name}`
    const filePath = path.join(process.cwd(), "public", "uploads", filename)
    await writeFile(filePath, buffer)
    updateData.pdfUrl = `/uploads/${filename}`
  }

  const updated = await PressRelease.findByIdAndUpdate(id, updateData, { new: true })

  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  return NextResponse.json(updated)
}

// GET: Get a single press release by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params

  const release = await PressRelease.findById(id)
  if (!release) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  return NextResponse.json(release)
}

// DELETE: Delete a press release by ID
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params

  const deleted = await PressRelease.findByIdAndDelete(id)
  if (!deleted) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "Deleted successfully" })
}
