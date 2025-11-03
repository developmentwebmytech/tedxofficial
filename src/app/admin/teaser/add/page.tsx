'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTeaser() {
  const [title, setTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !videoLink) return;

    await fetch('/api/teasers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, videoLink }),
    });

    router.push('/admin/teasers');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Teaser</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Teaser Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter teaser title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">YouTube Video Link</label>
            <input
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Paste full YouTube link"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
