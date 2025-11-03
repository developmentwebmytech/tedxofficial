import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Blog from "@/models/Blog"

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    await connectDB()

    const blog = await Blog.findOne({
      $or: [{ slug }, { title: slug }], // fallback if slug not present
    })

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, blog })
  } catch (error) {
    console.error("❌ Error fetching blog:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}


