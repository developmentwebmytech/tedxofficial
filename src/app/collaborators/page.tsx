"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CollaboratorsHero from "@/components/CollaboratorsHero";

interface Collaborator {
  _id: string;
  name: string;
  about: string;
  imageUrl: string;
}

export default function CollaboratorsPage() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/collaborators");
      const data = await res.json();
      setCollaborators(data);
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="w-full">
        <CollaboratorsHero />
      </div>

      <div className="relative w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-20">
          Our Collaborators
        </h2>

        {/* Vertical center line (hidden on mobile) */}
        <div className="hidden md:block absolute top-28 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gray-300"></div>

        <div className="flex flex-col gap-16 md:gap-24 relative z-10">
          {collaborators.map((collab, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={collab._id}
                className="relative flex flex-col md:flex-row items-center md:items-start gap-8"
              >
                {/* Text Section */}
                <div
                  className={`w-full md:ml-20 md:w-5/12 ${
                    isLeft ? "md:order-1 text-right" : "md:order-2 text-left"
                  } text-center md:text-inherit`}
                >
                  {/* Middle dot for desktop */}
                  {!isLeft && (
                    <div className="hidden md:block h-4 w-4 bg-red-500 rounded-full absolute left-1/2 -translate-x-1/2 top-6 border-4 border-white shadow-lg"></div>
                  )}

                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {collab.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {collab.about}
                  </p>
                </div>

                {/* Dot for left items on desktop */}
                {isLeft && (
                  <div className="hidden md:block h-4 w-4 bg-red-500 rounded-full absolute left-1/2 -translate-x-1/2 top-6 border-4 border-white shadow-lg"></div>
                )}

                {/* Logo Section */}
                <div
                  className={`w-full md:w-5/12 flex justify-center ${
                    isLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="w-40 h-40 relative border-4 border-red-500 rounded-full shadow-lg bg-white p-4 flex items-center justify-center">
                    <Image
                      src={collab.imageUrl}
                      alt={collab.name}
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
