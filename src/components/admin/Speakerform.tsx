'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SpeakerForm({ initialData }: { initialData?: any }) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    about: initialData?.about || '',
    image: null,
    existingImage: initialData?.image || '',
    linkedin: initialData?.social?.linkedin || '',
    twitter: initialData?.social?.twitter || '',
    instagram: initialData?.social?.instagram || '',
  });

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (e: any) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('about', form.about);
    formData.append('linkedin', form.linkedin);
    formData.append('twitter', form.twitter);
    formData.append('instagram', form.instagram);
    if (form.image) formData.append('image', form.image);
    formData.append('existingImage', form.existingImage);

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData ? `/api/speakers/${initialData._id}` : '/api/speakers';

    const res = await fetch(url, { method, body: formData });

    if (res.ok) router.push('/admin/speakers');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full border p-2" />
      <textarea name="about" value={form.about} onChange={handleChange} placeholder="About" required className="w-full border p-2" />
      <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn" className="w-full border p-2" />
      <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="Twitter" className="w-full border p-2" />
      <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="Instagram" className="w-full border p-2" />
      {form.existingImage && (
        <div className="relative w-40 h-40">
          <Image
            src={form.existingImage}
            alt="Current"
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      <input type="file" name="image" onChange={handleFileChange} className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        {initialData ? 'Update Speaker' : 'Add Speaker'}
      </button>
    </form>
  );
}
