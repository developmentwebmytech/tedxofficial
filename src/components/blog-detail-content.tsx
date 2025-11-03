"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import type { Blog } from "@/lib/blog-model"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface BlogDetailContentProps {
  blog: Blog
}

export function BlogDetailContent({ blog }: BlogDetailContentProps) {
  const router = useRouter()

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>
      </div>

      {/* Hero Image */}
      {blog.imageUrl && (
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" fill />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-red-100 text-red-700">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">{blog.excerpt}</div>

        <div
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br />") }}
        />
      </div>

      {/* Call to Action */}
      <div className="mt-12 p-6 bg-red-50 rounded-lg text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Enjoyed this article?</h3>
        <p className="text-gray-600 mb-4">Discover more inspiring content from TEDx Thalte Youth</p>
        <Link href="/">
          <Button className="bg-red-600 hover:bg-red-700 text-white">Explore More Blogs</Button>
        </Link>
      </div>
    </article>
  )
}
