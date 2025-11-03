import { connectDB } from "@/lib/mongodb"
import Teaser from "@/models/teaser"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await connectDB()

  const teaser = await Teaser.findById(id)

  if (!teaser) {
    return NextResponse.json({ error: "Teaser not found" }, { status: 404 })
  }

  return NextResponse.json(teaser)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await connectDB()

  const body = await req.json()
  const teaser = await Teaser.findByIdAndUpdate(id, body, { new: true })

  if (!teaser) {
    return NextResponse.json({ error: "Teaser not found" }, { status: 404 })
  }

  return NextResponse.json(teaser)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await connectDB()

  const deletedTeaser = await Teaser.findByIdAndDelete(id)

  if (!deletedTeaser) {
    return NextResponse.json({ error: "Teaser not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
