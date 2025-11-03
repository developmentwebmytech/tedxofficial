

"use client";

import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Speaker = {
  _id: string;
  name: string;
  about: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
};

export default function SpeakersShowcase() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch("/api/speakers");
        const data = await res.json();
        setSpeakers(data);
      } catch (err) {
        console.error("Error fetching speakers:", err);
      }
    };
    fetchSpeakers();
  }, []);

  if (speakers.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">Loading speakers...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <div
        className="relative bg-cover bg-center bg-no-repeat h-[200px] sm:h-[350px] md:h-[380px] flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/speakers.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-red-500/50" />
        <div className="relative z-10 text-white px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
            Our Inspiring Speakers
          </h1>
          <p className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto">
            Discover the brilliant minds behind the movement.
          </p>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-10">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {speakers.map((speaker) => (
            <SwiperSlide key={speaker._id}>
              <div className="bg-white rounded-md shadow-md p-4 sm:p-6 min-h-[300px] flex flex-col justify-between">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-red-700 mb-2 sm:mb-4" />
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  {speaker.about}
                </p>

                <div className="flex items-center gap-4 mt-4 sm:mt-6">
                  {speaker.image && (
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-black font-semibold text-base sm:text-lg">
                      {speaker.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Keynote Speaker
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .swiper-button-prev,
          .swiper-button-next {
            color: red !important;
            width: 24px !important;
            height: 24px !important;
            top: 50%;
            transform: translateY(-50%);
          }

          .swiper-button-prev {
            left: 0px !important; /* More to the left */
          }

          .swiper-button-next {
            right: 0px !important; /* More to the right */
          }

          .swiper-button-prev::after,
          .swiper-button-next::after {
            font-size: 20px !important;
            font-weight: bold;
          }
        `}</style>
      </div>
    </div>
  );
}
