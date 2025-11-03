"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import Image from "next/image"

type GalleryImage = {
  _id: string
  imageUrl: string
  altText?: string
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
}

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images")
        const data = await res.json()
        setImages(data)
      } catch (error) {
        console.error("Failed to fetch images:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="bg-gray-200 min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <Image src="/herogallery.jpg" alt="Gallery Hero" fill priority className="object-cover" />
        <div className="absolute inset-0  bg-opacity-60" />
        <div className="relative z-10 text-center px-4">
          <TypeAnimation
            sequence={["Welcome to Our Photo Gallery", 1000, "", 500, "Welcome to Our Photo Gallery"]}
            wrapper="h1"
            cursor={true}
            repeat={Number.POSITIVE_INFINITY}
            className="text-black text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-md"
          />
          <p className="text-black text-lg mt-4 max-w-2xl mx-auto">
            Discover highlights from our events, moments, and memories.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-800 text-3xl font-bold mb-8 text-center"
        >
          Our Gallery
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading images...</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="relative group rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={image.imageUrl || "/placeholder.svg"}
                    alt={image.altText || "Gallery image"}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0  bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-sm font-medium">{image.altText}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default GalleryPage
