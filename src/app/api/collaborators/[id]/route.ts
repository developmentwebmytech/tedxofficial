import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Collaborator from "@/models/collaborator"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import { writeFile, mkdir } from "fs/promises"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params // Await params before accessing id
  const collab = await Collaborator.findById(id)
  if (!collab) return NextResponse.json({ message: "Not found" }, { status: 404 })
  return NextResponse.json(collab)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()

  const formData = await req.formData()
  const name = formData.get("name") as string
  const about = formData.get("about") as string
  const file = formData.get("image") as File | null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = { name, about }

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${uuidv4()}-${file.name}`
    const uploadDir = path.join(process.cwd(), "public/uploads")
    if (!fs.existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, fileName), buffer)
    updateData.imageUrl = `/uploads/${fileName}`
  }

  const { id } = await params // Await params before accessing id
  const updated = await Collaborator.findByIdAndUpdate(id, updateData, { new: true })
  if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 })

  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params // Await params before accessing id
  await Collaborator.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
