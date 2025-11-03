"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    tag: "",
    author: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (thumbnail) formData.append("thumbnail", thumbnail);

    const res = await fetch("/api/blog", {
      method: "POST",
      body: formData,
    });

    if (res.ok) router.push("/admin/blog");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Form */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-2 mb-5">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
             <h1 className="text-2xl font-semibold text-gray-900">Create New Blog Post</h1>
            <p className="mt-1 text-sm text-gray-600">Fill in the details below to create a new blog post</p>
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter blog title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                placeholder="Enter blog subtitle (optional)"
                value={form.subtitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={8}
                placeholder="Write your blog content here..."
                value={form.content}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
            </div>

            {/* Tag and Author Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-2">
                  Tag
                </label>
                <input
                  id="tag"
                  name="tag"
                  type="text"
                  placeholder="e.g. Technology, Travel"
                  value={form.tag}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Author name"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail Image
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
              {thumbnail && (
                <p className="mt-2 text-sm text-gray-600">Selected: {thumbnail.name}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#EB0226] border border-transparent rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Create Blog Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}