"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      
      quote: "TEDxThaltej Youth was nothing short of transformational. The curation, storytelling, and seamless execution reflected a deep understanding of the TEDx spirit.",
      avatar: "AP",
      author:"Ananya patel",
      position:"Speaker & Educator"
    },
    {
      id: 2,
      
      quote: "Being part of TEDxThaltej Youth reminded me how powerful youth-led initiatives can be. The attention to detail and commitment to quality were truly inspiring" ,
      author: "Rahul Mehta",
      position: "Attendee & Innovation Enthusiast",
      avatar: "RM"
    },
    {
      id: 3,
      
      quote: "From the speaker line-up to the event experience, everything was thoughtfully designed. A huge step forward for community-driven conversations in our city." ,
        author: "Simran Shah",
      position: "Volunteer Coordinator",
      avatar: "SS"
    },
    {
      id: 4,
      
      quote:"The vision behind TEDxThaltej Youth was clearly driven by passion and purpose. It was an honor to witness such a professionally executed event.",
      author: "Hetal Shah",
      position: "TEDx Mentor & Advisor",
      avatar: "HS"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: React.SetStateAction<number>) => {
    setCurrentTestimonial(index);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <div className="bg-[#F7F7F7] py-16 px-6 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-gray-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-gray-200 rounded-full opacity-20"></div>
        <div className="absolute top-60 right-10 w-12 h-12 bg-red-400 rounded-full opacity-80"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-16">
         
          <h1 className="text-3xl md:text-4xl font-bold text-black font-sans leading-tight">
            Voices That <span className='text-[#EA0027]'>Inspire</span> Us
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Description */}
          <div className="space-y-6 font-sans">
            <p className="text-gray-700 text-md leading-relaxed">
              <span className="text-black ">TEDx events are designed to serve as a platform for sharing &quot;ideas worth spreading,&quot; and this naturally includes using languages that resonate most with your audience. Organizers are encouraged to embrace linguistic diversity as it can reflect and celebrate the multicultural makeup of a community. According to discussions and guidance from TEDx events, the language spoken on stage should ideally match the language spoken during breaks or informal parts of the event, promoting inclusivity and engagement</span>     </p>
            
            <p className="text-black text-md leading-relaxed">
              TEDxThaltej Youth is designed for a diverse audience, including students, educators, professionals, and idea enthusiasts. Anyone eager to learn and engage in powerful discussions is welcome.    </p>
            
            <p className="text-black text-md leading-relaxed">
             applications for TEDxThaltej Youth 2026 in November 2025. Stay updated by subscribing to our mailing list.
            </p>
          </div>

          {/* Right Column - Testimonial Carousel */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
              {/* Quote mark background */}
              <div className="absolute left-0 top-0 w-20 h-full bg-red-500 rounded-l-2xl flex items-center justify-center">
                <div className="text-red-500 text-6xl font-serif leading-none">&quot;</div>
              </div>
              
              {/* Testimonial content with animation */}
              <div className="ml-20 relative">
                <div className="transition-all duration-500 ease-in-out">
                  <div className="mb-6">
                    {/* <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-all duration-500">
                      {currentData.company}
                    </h3> */}
                    <p className="text-gray-700 text-lg leading-relaxed mt-5 transition-all duration-500">
                      {currentData.quote}
                    </p>
                  </div>
                  
                  {/* Author info */}
                  <div className="flex items-center transition-all duration-500">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-lg font-semibold">{currentData.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{currentData.author}</p>
                      <p className="text-gray-600 text-sm">{currentData.position}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200"
                >
                  <ChevronLeft size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={nextTestimonial}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200"
                >
                  <ChevronRight size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Carousel Dots */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentTestimonial
                        ? 'bg-red-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 flex justify-center">
              <div className="text-sm text-gray-500">
                {currentTestimonial + 1} / {testimonials.length}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-5">
          <button className="bg-black text-white hover:bg-red-500 border px-8 py-3 font-sans rounded-full font-semibold  transition-colors duration-200 flex items-center">
            TALK TO AN EXPERT
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;