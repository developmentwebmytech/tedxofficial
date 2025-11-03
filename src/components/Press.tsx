'use client';

import { useEffect, useState } from 'react';

type PressRelease = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
};

export default function PressRelease() {
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [title, setTitle] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch('/api/pressrelease');
      const data = await res.json();
      setReleases(data);
    } catch (error) {
      console.error("Failed to fetch press releases", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const res = await fetch('/api/pressrelease', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      setTitle('');
      fetchData(); // Refresh list
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-2">TEDxThaltej Youth Reporters</h1>
      <h2 className="text-xl font-bold underline text-red-600 mb-6">PRESS RELEASE SECTION</h2>

      {/* Add Press Release Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Enter press release title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-1/2"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Press Release
        </button>
      </form>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-red-600 font-bold">TITLE</th>
              <th className="p-3 text-gray-600">LAST MODIFIED</th>
            </tr>
          </thead>
          <tbody>
            {releases.map((release) => (
              <tr key={release._id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <span>📍</span>
                  {release.title}
                </td>
                <td className="p-3 text-gray-700">
                  {new Date(release.updatedAt || release.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })}{' '}
                  TEDxThaltej Youth
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
