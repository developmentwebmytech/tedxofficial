import { NextResponse } from "next/server"
import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"
import { Team } from "@/models/teammember"
import { connectDB } from "@/lib/mongodb"

// PUT - Update a member
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params

  try {
    const formData = await req.formData()
    let filename = formData.get("existingImage") as string
    const file = formData.get("image") as File | null

    if (file && typeof file !== "string") {
      const buffer = Buffer.from(await file.arrayBuffer())
      filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`
      const uploadDir = path.join(process.cwd(), "public", "uploads")
      await mkdir(uploadDir, { recursive: true })
      await writeFile(`${uploadDir}/${filename}`, buffer)
    }

    const updated = await Team.findByIdAndUpdate(
      id,
      {
        name: formData.get("name"),
        position: formData.get("position"),
        about: formData.get("about"),
        image: filename,
        socials: {
          facebook: formData.get("facebook"),
          linkedin: formData.get("linkedin"),
          twitter: formData.get("twitter"),
          youtube: formData.get("youtube"),
        },
      },
      { new: true },
    )

    return NextResponse.json({ success: true, data: updated })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 })
  }
}

// DELETE - Remove a member
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params

  try {
    const member = await Team.findByIdAndDelete(id)
    if (member?.image) {
      const filePath = path.join(process.cwd(), "public", "uploads", member.image)
      await unlink(filePath).catch(() => {})
    }
    return NextResponse.json({ success: true })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ success: false, message: "Deletion failed" }, { status: 500 })
  }
}

