import mongoose, { Schema, type Document } from "mongoose"
import { connectDB } from "./mongodb"

export interface Blog extends Document {
  title: string
  content: string
  excerpt: string
  author: string
  publishedAt: Date
  published: boolean
  tags: string[]
  imageUrl?: string
  slug: string
}

const blogSchema = new Schema<Blog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  tags: [{ type: String }],
  imageUrl: { type: String },
  slug: { type: String, required: true, unique: true },
})

const BlogModel = mongoose.models.Blog || mongoose.model<Blog>("Blog", blogSchema)

export class BlogService {
  static countBySlug() {
    throw new Error("Method not implemented.")
  }
  static async getAll(published?: boolean) {
    await connectDB()
    const filter = published !== undefined ? { published } : {}
    return await BlogModel.find(filter).sort({ publishedAt: -1 })
  }

  static async getById(id: string) {
    await connectDB()
    return await BlogModel.findById(id)
  }

  static async getBySlug(slug: string) {
    await connectDB()
    return await BlogModel.findOne({ slug, published: true })
  }

  static async create(blog: Omit<Blog, "_id" | "publishedAt">) {
    await connectDB()
    const newBlog = new BlogModel({
      ...blog,
      publishedAt: new Date(),
    })
    return await newBlog.save()
  }

  static async update(id: string, blog: Partial<Blog>) {
    await connectDB()
    return await BlogModel.findByIdAndUpdate(id, blog, { new: true })
  }

  static async delete(id: string) {
    await connectDB()
    return await BlogModel.findByIdAndDelete(id)
  }
}

export { BlogModel }
