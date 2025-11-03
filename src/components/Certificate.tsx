"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const highlights = [
  {
    icon: "/certificate1.jpg",
    subtitle: "ISO 20121:2024 – Event Sustainability Management System",
    note: "Certificate No: ICI/1073892/25",
    note2: "Issued Date: 21st April 2025",
    note3: "Valid Until: 20th April 2028",
  },
  {
    icon: "/license.png",
    subtitle: "ISO 9001:2015 – Quality Management System",
    note: "Certificate No: QMS/230620/5564",
    note2: "Issued Date: 21st April 2025",
    note3: "Valid Until: 20th April 2028",
  },
];

export default function NoteworthyAwards() {
  return (
    <section className="bg-gray-100 py-16 md:p-10 p-5">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-5 text-black">
          ISO <span className="text-[#EB0129]">Certifications</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto px-6 py-12 rounded-2xl hover:bg-[#F3F4F6]   shadow-2xl overflow-hidden"
        >
         
          <div className="relative z-10">
            <h1 className="text-black ">
              TEDxThaltej Youth is officially certified under two globally
              recognized ISO standards. These certifications reflect our
              commitment to high-quality event management and sustainability in
              everything we do.
            </h1>
          </div>
        </motion.div>
      </div>
      

      <div className="max-w-6xl mx-auto grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
        {highlights.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-white hover:bg-[#F6F8F9] rounded-xl  text-black px-6 py-10 flex flex-col items-center text-center shadow-2xl hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <div className="h-full w-full flex flex-col items-center text-center">
              <Image
                src={item.icon}
                alt="award"
                height={300}
                width={300}
                className="rounded-md"
              />
            </div>


            <hr className=" border-t-1 border-gray-400 w-full" />


            <p className="text-lg font-bold font-sans mt-6 mb-4">
              {item.subtitle}
            </p>
            <p className="text-sm whitespace-pre-line text-black">
              {item.note}
            </p>
            <p className="text-sm whitespace-pre-line text-black">
              {item.note2}
            </p>
            <p className="text-sm whitespace-pre-line text-black">
              {item.note3}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

