'use client';

import { useEffect, useState } from 'react';

type VideoData = {
  _id: string;
  title: string;
  description: string;
  youtubeId: string;
};

const VideoSection = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setVideos(data);
        }
      } catch (err) {
        console.error('Failed to load videos:', err);
      }
    };

    fetchVideos();
  }, []);

  if (videos.length === 0) {
    return <p className="text-white mt-8 text-center">No videos found.</p>;
  }

  return (
    <div className="mt-8 grid grid-cols-1  container mx-auto md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {videos.map((video) => (
        <div
          key={video._id}
          className="aspect-video w-full rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="mt-2 text-white text-center font-medium">{video.title}</div>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
