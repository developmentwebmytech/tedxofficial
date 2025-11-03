import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PolicyDocument from "@/models/PolicyDocument"
import { unlink } from "fs/promises"
import path from "path"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  const doc = await PolicyDocument.findById(id)
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  // Optionally delete the file from disk
  const filePath = path.join(process.cwd(), "public", doc.fileUrl)
  await unlink(filePath).catch(() => {})

  await doc.deleteOne()
  return NextResponse.json({ message: "Deleted successfully" })
}

// PUT handler for updating title
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params

  try {
    const body = await req.json()
    const { title } = body

    const updatedDoc = await PolicyDocument.findByIdAndUpdate(
      id,
      { title },
      { new: true }, // return updated doc
    )

    if (!updatedDoc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    return NextResponse.json({ title: updatedDoc.title })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
