'use client';
import { useState } from 'react';

type Props = {
  onUpload: () => void;
};

export default function UploadForm({ onUpload }: Props) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('image', file);

    try {
      await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });

      setTitle('');
      setDesc('');
      setFile(null);
      onUpload(); // Refresh image list in parent
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto grid grid-cols-2 gap-5">
      <input
        type="text"
        placeholder="Image Title"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
     
      <input
        type="file"
        accept="image/*"
        className="col-span-2 py-3 px-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />
     
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 w-fit"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
    </form>
  );
}
