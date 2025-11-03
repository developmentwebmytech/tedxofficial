"use client"

import Image from "next/image"
import { useState } from "react"

interface BlogImageProps {
  src?: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function BlogImage({
  src,
  alt,
  className = "w-full h-64 object-cover rounded-lg",
  width = 800,
  height = 400,
}: BlogImageProps) {
  const [imageError, setImageError] = useState(false)

  const formatImageSrc = (imageSrc?: string) => {
    if (!imageSrc) return `/placeholder.svg?height=${height}&width=${width}&query=blog cover image`

    // If it's already an absolute URL or starts with /, return as is
    if (imageSrc.startsWith("http") || imageSrc.startsWith("/")) {
      return imageSrc
    }

    // Add leading slash for relative paths
    return `/${imageSrc}`
  }

  const imageSrc =
    imageError || !src ? `/placeholder.svg?height=${height}&width=${width}&query=blog cover image` : formatImageSrc(src)

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
      priority={false}
    />
  )
}
