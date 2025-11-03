"use client"

import { useEffect, useState } from "react"
import { BlogCard } from "@/components/blog-card"
import type { Blog } from "@/lib/blog-model"

interface RelatedBlogsProps {
  currentBlogId?: string
}

export function RelatedBlogs({ currentBlogId }: RelatedBlogsProps) {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedBlogs() {
      try {
        const response = await fetch("/api/blogs")
        if (response.ok) {
          const data = await response.json()
          // Filter out current blog and limit to 3 related blogs
          const filtered = data.filter((blog: Blog) => blog._id?.toString() !== currentBlogId).slice(0, 3)
          setRelatedBlogs(filtered)
        }
      } catch (error) {
        console.error("Error fetching related blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedBlogs()
  }, [currentBlogId])

  if (loading || relatedBlogs.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Related Articles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedBlogs.map((blog) => (
            <BlogCard key={blog._id?.toString()} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  )
}
