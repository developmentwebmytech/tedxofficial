/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id.toString(), email: admin.email, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ message: "Login successful" });

    // Set cookie
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  await connectDB();
  try {
    // Read token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT
    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Read body safely
    let body: any;
    try {
      body = await req.json(); // must await
    } catch {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const admin = await Admin.findById(payload.id);
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    admin.name = name;
    admin.email = email;
    await admin.save();

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    // Get JWT token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch admin from DB by id
    const admin = await Admin.findById(payload.id).select("-password");
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      name: admin.name,
      email: admin.email,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
