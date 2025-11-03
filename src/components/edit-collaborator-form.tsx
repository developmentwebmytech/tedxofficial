"use client"

import type React from "react"

import { useState } from "react"

interface Collaborator {
  _id: string
  name: string
  about: string
  imageUrl: string
}

interface Props {
  collaborator: Collaborator
  onCancel: () => void
  onUpdated: () => void
}

export default function EditCollaboratorForm({ collaborator, onCancel, onUpdated }: Props) {
  const [name, setName] = useState(collaborator.name)
  const [about, setAbout] = useState(collaborator.about)
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !about) return alert("Name and about are required")

    const formData = new FormData()
    formData.append("name", name)
    formData.append("about", about)
    if (image) {
      formData.append("image", image)
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/collaborators/${collaborator._id}`, {
        method: "PUT",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to update")

      onUpdated()
    } catch (err) {
      console.error(err)
      alert("Failed to update collaborator")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-50 p-4 rounded mt-3">
      <input
        type="text"
        placeholder="Name"
        className="border border-slate-300 p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="About"
        className="border border-slate-300 p-2 rounded"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="border border-slate-300 p-2 rounded"
      />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </form>
  )
}
