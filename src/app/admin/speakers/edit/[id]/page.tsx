// app/admin/speakers/add/page.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AddSpeakerPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    about: '',
    image: null as File | null,
    linkedin: '',
    twitter: '',
    instagram: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.about || !form.image) {
      setError('Name, About, and Image are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('about', form.about);
    formData.append('linkedin', form.linkedin);
    formData.append('twitter', form.twitter);
    formData.append('instagram', form.instagram);
    formData.append('image', form.image);

    try {
      const res = await fetch('/api/speakers', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        router.push('/admin/speakers'); // Redirect after success
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit form.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Add New Speaker</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <textarea
          name="about"
          placeholder="About"
          value={form.about}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn"
            value={form.linkedin}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="url"
            name="twitter"
            placeholder="Twitter"
            value={form.twitter}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="url"
            name="instagram"
            placeholder="Instagram"
            value={form.instagram}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          ref={fileInputRef}
          className="block w-full text-sm border border-gray-300 p-2 rounded"
        />

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/speakers')}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
