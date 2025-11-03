'use client';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useEffect, useState } from 'react';

type Speaker = {
  _id: string;
  name: string;
  about: string;
};

export default function SpeakersShowcase() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch('/api/speakers');
        const data = await res.json();
        setSpeakers(data);
      } catch (err) {
        console.error('Error fetching speakers:', err);
      }
    };
    fetchSpeakers();
  }, []);

  if (speakers.length === 0) {
    return <div className="text-center py-20 text-gray-600">Loading speakers...</div>;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black">
          What Our <span className="text-green-600">Speakers</span> Say
        </h2>
      </div>

      
    </section>
  );
}
