'use client';

import { useEffect, useState } from 'react';

interface Video {
  _id: string;
  title: string;
  youtubeId: string;
}

const VideoSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p className="text-center">Loading videos...</p>;
  if (!videos.length) return <p className="text-center">No videos found.</p>;

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Talks</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video._id} className="rounded-xl overflow-hidden shadow-lg bg-white">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
