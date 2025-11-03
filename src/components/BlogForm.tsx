"use client";

import { useState } from "react";

export default function BlogForm({
  initialData = {},
  onSubmit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  onSubmit: (data: FormData) => void;
}) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    subtitle: initialData.subtitle || "",
    content: initialData.content || "",
    tag: initialData.tag || "Blog",
    author: initialData.author || "Admin",
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("content", form.content);
    formData.append("author", form.author);
    formData.append("tag", form.tag);
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        name="subtitle"
        value={form.subtitle}
        onChange={handleChange}
        placeholder="Subtitle"
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        className="w-full border px-3 py-2 rounded"
        rows={6}
        required
      />
      <input
        name="tag"
        value={form.tag}
        onChange={handleChange}
        placeholder="Tag"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
        className="w-full"
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Submit
      </button>
    </form>
  );
}
