import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Application from "@/models/Application"

// GET = Fetch by Application ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const app = await Application.findOne({ applicationId: id })

    if (!app) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })

    return NextResponse.json({ success: true, application: app })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}

// PUT = Update status/message
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const { status, message } = await req.json()

    const updatedApp = await Application.findByIdAndUpdate(id, { status, message }, { new: true })

    if (!updatedApp) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, application: updatedApp })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}

// DELETE application
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params

    const deletedApp = await Application.findByIdAndDelete(id)
    if (!deletedApp) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Application deleted" })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}

