import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CleanHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = ["/hero1.jpg", "/hero2.jpg", "/collab.jpg"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative min-h-screen bg-gray-200 overflow-hidden">
      {/* Content Section */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="bg-gray-200 px-4 py-8 sm:px-6 sm:py-12 lg:px-12 lg:py-16 order-2 lg:order-1">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              {/* Breadcrumb */}
              <div className="mb-4 sm:mb-6">
                <div className="inline-flex items-center text-xs sm:text-sm text-gray-600 font-medium tracking-wider uppercase">
                  Empowering Young Visionaries
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-black mb-6 sm:mb-8 leading-tight">
                Collaborate for the Future of Education
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 leading-relaxed font-light">
                At TEDxThaltej Youth, we believe in the power of partnerships to
                ignite curiosity, drive innovation, and shape an inclusive
                future of learning. Join us in inspiring a generation of
                changemakers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[#EB012A] text-white text-sm sm:text-base font-semibold hover:bg-black transition-all duration-300 transform hover:scale-105">
                  <span className="mr-2 sm:mr-3">Start Partnership</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Image Gallery */}
          <div className="relative h-64 sm:h-96  lg:h-full order-1 lg:order-2">
            <div
              className={`transform transition-all duration-1000 delay-300 h-full ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
            >
              {/* Main Image Display */}
              <div className="relative rounded-xl h-full w-full overflow-hidden">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      index === currentImage
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`Event collaboration ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                ))}

                {/* Image Counter */}
                <div className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-black/30 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  {currentImage + 1} / {heroImages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 animate-bounce">
        <div className="w-px h-6 sm:h-8 bg-gray-400"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full mx-auto mt-1 sm:mt-2"></div>
      </div>
    </div>
  );
}
