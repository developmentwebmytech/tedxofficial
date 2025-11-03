"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src="/tedx-hero-video.mp4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700" />
      </video>

      {/* Red Overlay */}
      <div className="absolute inset-0 bg-red-600/80" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-block bg-white rounded-full px-8 py-4 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-red-600">TEDx</span>
              <span className="text-gray-600">Thalte</span>
              <span className="text-red-600">Youth</span>
            </h1>
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">Ideas Worth Spreading</h2>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover inspiring talks, innovative ideas, and transformative stories from young minds shaping the future.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-3"
            onClick={() => document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Blogs
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-red-600 font-semibold px-8 py-3 bg-transparent"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Talks
          </Button>
        </div>
      </div>
    </section>
  )
}
