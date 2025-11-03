import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const newBlog = await Blog.create(data);
  return NextResponse.json(newBlog, { status: 201 });
}
