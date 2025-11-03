/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    // Include _id in JWT
    const token = jwt.sign(
      { id: admin._id.toString(), email: admin.email, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
