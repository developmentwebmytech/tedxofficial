"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Calendar, User } from "lucide-react"
import Image from "next/image"

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

interface BlogCardProps {
  blog: Blog
  onDelete: () => void
}

export default function BlogCard({ blog, onDelete }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {blog.thumbnail && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <Image src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" fill />
        </div>
      )}

      <CardHeader className="flex-none">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {blog.subtitle && <p className="text-sm text-muted-foreground line-clamp-2">{blog.subtitle}</p>}
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {blog.content.replace(/<[^>]*>/g, "")} {/* Strip HTML tags for preview */}
        </p>
      </CardContent>

      <CardFooter className="flex-none pt-0">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            {blog.author && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{blog.author}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          </div>
          {blog.tag && (
            <Badge variant="secondary" className="text-xs">
              {blog.tag}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
