import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  await connectDB();

  // Check if admin already exists
  const exists = await Admin.findOne({ email: "admin@example.com" });
  if (exists) {
    return NextResponse.json({ message: "Admin already exists" });
  }

  // Create first admin
  const admin = await Admin.create({
    name: "Admin",
    email: "admin@example.com",
    password: "secret123", // initial password
  });

  return NextResponse.json({
    message: "Admin created!",
    email: admin.email,
    password: "secret123",
  });
}
