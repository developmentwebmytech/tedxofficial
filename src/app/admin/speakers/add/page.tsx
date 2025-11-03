'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AddSpeakerForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/speakers', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        setMessage(errData.message || 'Something went wrong');
      } else {
        setMessage('Speaker added successfully!');
        form.reset();
        setPreview(null);
      }
    } catch {
      setMessage('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input type="text" name="name" placeholder="Name" className="border p-2 w-full" required />
      <textarea name="about" placeholder="About" className="border p-2 w-full" required />

      <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />

      {preview && (
        <div className="relative w-40 h-40">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <input type="text" name="linkedin" placeholder="LinkedIn" className="border p-2 w-full" />
      <input type="text" name="twitter" placeholder="Twitter" className="border p-2 w-full" />
      <input type="text" name="instagram" placeholder="Instagram" className="border p-2 w-full" />

      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Add Speaker'}
      </button>

      {message && <p className="text-sm text-gray-800">{message}</p>}
    </form>
  );
}
