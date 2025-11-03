'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import VideoSection from "@/components/Videoyt";

const TedxHero = () => {
  return (
    <section className="relative bg-gray-50 text-black min-h-screen px-4 py-20 overflow-hidden">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Left content */}
        <motion.div
          className="flex-1 text-center lg:text-left space-y-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            <span className="text-[#EB0227]">TED</span>
            <sup className="text-[#EB0227] text-2xl font-extrabold -ml-1">x</sup>
            <span className="ml-2">Thaltej</span>{" "}
            <span className="font-extrabold text-black">Youth</span>
          </h1>

          <p className="text-lg text-black drop-shadow-sm">Presents</p>

          <h2 className="text-2xl md:text-3xl font-semibold drop-shadow-sm">
            The Future of Education: A Light Towards Wisdom
          </h2>


          <p className="text-lg font-medium text-black drop-shadow-sm">
            शिक्षा का भविष्य: सोच से सृजन की ओर
          </p>
          <p className="text-lg text-gray-700 max-w-xl drop-shadow-sm">
            Join us for an inspiring TEDxYouth event where innovative minds and
            passionate voices come together to explore how education can illuminate the
            path to a brighter tomorrow. Discover stories of creativity, resilience, and
            revolution in learning.
          </p>
        </motion.div>

        {/* Right image */}
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <Image
            src="/brain.png"
            alt="TEDx Brain Graphic"
            width={600}
            height={600}
            className="rounded-xl w-full h-auto object-contain shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Video Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <VideoSection />
      </motion.div>
    </section>
  );
};

export default TedxHero;
