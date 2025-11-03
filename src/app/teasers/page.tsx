


// 'use client';
import React from 'react';
import Image from 'next/image';

type Teaser = {
  _id: string;
  title: string;
  videoLink: string;
};

function extractYouTubeID(url: string): string | null {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default async function TeasersPage() {
  let teasers: Teaser[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teasers`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Fetch failed');

    teasers = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-red-600 font-medium">Failed to load teasers</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-red-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Video Teasers
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Discover amazing content through our curated collection of video previews
          </p>
          <div className="mt-8 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {teasers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-full h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No teasers available</h3>
            <p className="text-gray-500">Check back later for new video content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teasers.map((teaser, index) => {
              const videoId = extractYouTubeID(teaser.videoLink);
              const thumbnail = videoId
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : '/placeholder.jpg';

              return (
                <div
                  key={teaser._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <a
                    href={teaser.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {/* Thumbnail Container */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={thumbnail}
                          alt={teaser.title || 'Video teaser'}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                          <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* YouTube Badge */}
                      {videoId && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                          <span>YouTube</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <h2 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-red-500 transition-colors duration-300 leading-tight">
                        {teaser.title || 'Untitled'}
                      </h2>

                      <div className="mt-3 flex items-center text-red-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Watch now</span>
                        <svg className="w-4 h-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Decoration */}
      <div className="bg-red-500 py-2">
        <div className="container mx-auto px-4">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>
      </div>
    </div>
  );
}
