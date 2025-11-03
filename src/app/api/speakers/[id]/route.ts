import { connectDB } from "@/lib/mongodb"
import Speaker from "@/models/speaker"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params // Await params to resolve Promise

  const speaker = await Speaker.findById(id)
  if (!speaker) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(speaker)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params // Await params to resolve Promise
  const body = await req.json()

  const updated = await Speaker.findByIdAndUpdate(id, body, { new: true })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params // Await params to resolve Promise

  await Speaker.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
