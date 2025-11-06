/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Admin from "@/models/Admin"

export async function GET(req: NextRequest) {
  await connectDB()

  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 })
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      email: string
      role: string
    }

    // 3️⃣ Find user in DB using decoded id
    const admin = await Admin.findById(decoded.id).select("name email")
    if (!admin) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // 4️⃣ Return user data
    return NextResponse.json({
      user: {
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (err: any) {
    console.error("Error in /api/user/me:", err)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
