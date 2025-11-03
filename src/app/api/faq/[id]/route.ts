import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Faq from "@/models/faq"

// DELETE: /api/faq/:id
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const deleted = await Faq.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "FAQ deleted successfully" })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}

// PUT: /api/faq/:id
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json()
    const { question, answer } = body

    if (!question || !answer) {
      return NextResponse.json({ error: "Both question and answer are required" }, { status: 400 })
    }

    await connectDB()
    const { id } = await params
    const updatedFaq = await Faq.findByIdAndUpdate(id, { question, answer }, { new: true })

    if (!updatedFaq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    return NextResponse.json(updatedFaq)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
