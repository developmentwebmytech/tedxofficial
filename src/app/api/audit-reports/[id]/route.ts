import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import AuditReport from "@/models/AuditReport"
import path from "path"
import fs from "fs"

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()

  const { id } = await params
  const report = await AuditReport.findById(id)
  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const filepath = path.join(
    process.cwd(),
    "public",
    "uploads",

    report.filename,
  )
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath)
  }

  await report.deleteOne()
  return NextResponse.json({ success: true })
}