/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const admin = await Admin.findById(payload.id);
    if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { currentPassword, newPassword, confirmNewPassword } = await req.json();

    if (!currentPassword || !newPassword || !confirmNewPassword)
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });

    if (newPassword !== confirmNewPassword)
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 });

    admin.password = newPassword; // Will be hashed by pre-save hook
    await admin.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

