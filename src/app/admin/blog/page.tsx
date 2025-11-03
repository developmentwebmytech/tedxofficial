/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import type React from "react"
import Image from "next/image"

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    coverImage: "",
  })
  const [editSlug, setEditSlug] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  // Fetch all blogs
  const fetchBlogs = () => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then(setBlogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Upload image file
  const uploadImage = async () => {
    if (!imageFile) return form.coverImage // keep existing if editing without new image

    const fd = new FormData()
    fd.append("file", imageFile)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    })

    if (!res.ok) {
      setStatusMessage("❌ Image upload failed")
      setTimeout(() => setStatusMessage(null), 3000)
      return ""
    }

    const data = await res.json()
    return data.url // URL returned from API
  }

  // Handle create/update blog
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const uploadedImageUrl = await uploadImage()

    const formData = new FormData()
    formData.append("title", form.title)
    formData.append("slug", form.slug)
    formData.append("excerpt", form.excerpt)
    formData.append("content", form.content)
    formData.append("author", form.author)
    formData.append("coverImage", uploadedImageUrl || form.coverImage)

    const method = editSlug ? "PUT" : "POST"

    const res = await fetch(`/api/blog/${form.slug}`, {
      method,
      body: formData,
    })

    if (res.ok) {
      fetchBlogs()
      setStatusMessage(editSlug ? "✅ Blog updated successfully." : "✅ Blog created successfully.")
      setForm({ title: "", slug: "", excerpt: "", content: "", author: "", coverImage: "" })
      setImageFile(null)
      setEditSlug(null)
    } else {
      setStatusMessage("❌ Failed to save blog.")
    }

    setTimeout(() => setStatusMessage(null), 3000)
  }

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteSlug) return
    const res = await fetch(`/api/blog/${deleteSlug}`, { method: "DELETE" })
    if (res.ok) {
      fetchBlogs()
      setStatusMessage("✅ Blog deleted successfully.")
    } else {
      setStatusMessage("❌ Failed to delete blog.")
    }
    setDeleteSlug(null)
    setTimeout(() => setStatusMessage(null), 3000)
  }

  // Edit blog
  const handleEdit = (blog: any) => {
    setForm(blog)
    setEditSlug(blog.slug)
  }

  return (
    <div className="p-4 mx-auto">
      <form onSubmit={handleSubmit} className="mb-6 space-y-3 -mt-5 bg-white p-4 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Manage Blogs</h1>

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full border border-slate-400 p-2 rounded"
          required
        />
        <input
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="Slug"
          className="w-full border border-slate-400 p-2 rounded"
          required
        />
        <input
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="Excerpt"
          className="w-full border border-slate-400 p-2 rounded"
          required
        />
        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
          className="w-full border border-slate-400 p-2 rounded"
          required
        />
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Content"
          className="w-full border border-slate-400 p-2 rounded"
          rows={4}
          required
        />

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full border border-slate-400 p-2 rounded"
        />

        <button className="bg-red-500 hover:bg-black text-white px-4 py-2 rounded">
          {editSlug ? "Update" : "Create"}
        </button>
      </form>

      {/* Blog list */}
      {blogs.map((blog) => (
        <div key={blog.slug} className="mb-4 p-4 border border-slate-400 rounded flex justify-between items-center">
          <div>
            <h2 className="font-semibold">{blog.title}</h2>
            <p>{blog.excerpt}</p>
            {blog.coverImage && <Image src={blog.coverImage} alt={blog.title} className="w-32 mt-2 rounded" fill />}
          </div>
          <div className="space-x-2">
            <button onClick={() => handleEdit(blog)} className="px-3 py-1 bg-black text-white rounded">
              Edit
            </button>
            <button onClick={() => setDeleteSlug(blog.slug)} className="px-3 py-1 bg-red-600 text-white rounded">
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      {deleteSlug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Delete Blog</h2>
            <p className="mb-6">Are you sure you want to delete this blog?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeleteSlug(null)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {statusMessage && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg">
          {statusMessage}
        </div>
      )}
    </div>
  )
}
