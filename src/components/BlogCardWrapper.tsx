"use client"

import BlogCard from "@/components/BlogCard"
import { useRouter } from "next/navigation"

type Blog = {
  _id: string
  title: string
  subtitle?: string
  content: string
  tag?: string
  thumbnail?: string
  author?: string
  createdAt: string
}

export default function BlogCardWrapper({ blogs }: { blogs: Blog[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" })
      if (res.ok) {
        router.refresh()
      } else {
        console.error("Failed to delete blog")
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Blog Management</h1>
            <p className="mt-1 text-sm text-gray-600">{blogs.length} total Blogs</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No blog posts found</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} onDelete={() => handleDelete(blog._id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
