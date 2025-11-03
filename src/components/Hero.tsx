'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import Link from 'next/link';

const EUDRSection = () => {
  const images = [
    '/first.jpg', // replace with actual image names in /public
    '/first2.jpg',
    '/first3.jpg',
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4  bg-black text-white px-6 md:px-16 py-12 items-center">
      {/* Left Text Content */}
      <div className='container mx-auto'>
        <h1 className="text-2xl md:text-4xl md:ml-14 font-bold leading-tight mb-6">
         From Vision to Reality: The Journey of TEDxThaltej Youth
        </h1>
        <p className="md:text-md mb-8 md:ml-14 max-w-xl">
          What began as a dream to spark meaningful conversations has grown into a powerful platform for ideas worth spreading. TEDxThaltej Youth was born out of perseverance, learning, and a deep commitment to excellence. Inspired by the transformative experience at TEDxYouth@JGIS, and guided by mentors like Hetal Ma’am, this event is a celebration of innovation, dialogue, and youth-driven impact.


        </p>

        <div className="flex flex-wrap gap-4 md:ml-14">
          <button className="bg-[#EB0028] text-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition rounded">
            Let’s Talk!
          </button>
         <Link href='/contact'> <button className="bg-white cursor-pointer text-black px-6 py-3 font-semibold flex items-center gap-2 rounded hover:bg-[#EB0028] hover:text-white transition">
            Contact Us <span>→</span>
          </button>
          </Link>
          
        </div>
      </div>

      {/* Right Image Slider */}
      <div className="rounded-xl overflow-hidden border md:mr-15 border-white">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Image
                src={src}
                alt={`Log image ${index + 1}`}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default EUDRSection;
