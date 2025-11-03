import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Notification from "@/models/Notification"

// ✅ Update notification
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Made params async for Next.js 15
) {
  await connectDB()
  const { id } = await params // Added await to destructure params
  const data = await req.json()

  const updatedNotification = await Notification.findByIdAndUpdate(id, data, {
    new: true,
  })

  if (!updatedNotification) {
    return NextResponse.json({ message: "Notification not found" }, { status: 404 })
  }

  return NextResponse.json(updatedNotification)
}

// ✅ Delete notification
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Made params async for Next.js 15
) {
  await connectDB()
  const { id } = await params // Added await to destructure params

  await Notification.findByIdAndDelete(id)
  return NextResponse.json({ message: "Deleted successfully" })
}
