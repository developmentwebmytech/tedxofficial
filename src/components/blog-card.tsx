import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import type { Blog } from "@/lib/blog-model"
import Link from "next/link"
import Image from "next/image"

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      {blog.imageUrl && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={blog.imageUrl || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            fill
          />
        </div>
      )}

      <CardHeader className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">{blog.title}</h3>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">{blog.excerpt}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/blog/${blog.slug}`} className="w-full">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">Learn More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
