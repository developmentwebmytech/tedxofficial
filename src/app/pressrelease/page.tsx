'use client';

import PressReleaseHero from '@/components/Pressreleasehero';
import React, { useEffect, useState } from 'react';

type PressRelease = {
  _id: string;
  title: string;
  date: string;
  pdfUrl: string;
};

const PressReleaseSection: React.FC = () => {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const res = await fetch('/api/pressrelease');
        const data = await res.json();
        setPressReleases(data);
      } catch (error) {
        console.error('Failed to fetch press releases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPressReleases();
  }, []);

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    return new Date(dateStr).toLocaleDateString('en-GB', options);
  };

  return (
    <section>
       <PressReleaseHero/>
    <div className="bg-gray-200 py-12 container mx-auto px-4 md:px-12">
    
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {pressReleases.map((item) => (
            <div
              key={item._id}
              className="bg-white border  border-gray-200 rounded-lg shadow-sm p-8  hover:shadow-lg transition"
            >
              {/* Optional Logo or Title */}
              <div className="text-sm text-gray-400 uppercase mb-2">
                TEDxThaltej
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                {item.title}
              </h3>

              {/* Date + Author */}
              <p className="text-sm text-gray-600 mb-4">
                {formatDate(item.date)} 
              </p>

              {/* Link Button */}
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto text-sm text-red-600 font-medium hover:underline"
              >
                View PDF →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
    </section>
  );
};

export default PressReleaseSection;
