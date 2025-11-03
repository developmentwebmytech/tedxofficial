"use client"

import type React from "react"

import { useState } from "react"

interface Props {
  onSuccess: () => void
}

export default function AddCollaboratorForm({ onSuccess }: Props) {
  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !about || !image) return alert("All fields required")

    const formData = new FormData()
    formData.append("name", name)
    formData.append("about", about)
    formData.append("image", image)

    setLoading(true)

    try {
      const res = await fetch("/api/collaborators", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to add")

      setName("")
      setAbout("")
      setImage(null)
      onSuccess()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 bg-white mx-10 my-6 p-5">
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
        className="border border-slate-300 p-2  rounded"
      />
      <button type="submit" className="px-4 py-2 w-fit bg-red-500 text-white rounded" disabled={loading}>
        {loading ? "Adding..." : "Add Collaborator"}
      </button>
    </form>
  )
}
