import { connectDB } from "@/lib/mongodb"
import { Verifier } from "@/models/verifier"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  try {
    const verifier = await Verifier.findOne({ ID: id })
    if (!verifier) return NextResponse.json({ message: "Verifier not found" }, { status: 404 })
    return NextResponse.json(verifier)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  try {
    const { status } = await request.json()
    if (!status) return NextResponse.json({ message: "Missing status" }, { status: 400 })

    const updatedVerifier = await Verifier.findOneAndUpdate({ ID: id }, { status }, { new: true })
    if (!updatedVerifier) return NextResponse.json({ message: "Verifier not found" }, { status: 404 })

    return NextResponse.json({ message: "Status updated", verifier: updatedVerifier })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  try {
    const deletedVerifier = await Verifier.findOneAndDelete({ ID: id })
    if (!deletedVerifier) return NextResponse.json({ message: "Verifier not found" }, { status: 404 })
    return NextResponse.json({ message: "Verifier deleted" })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
