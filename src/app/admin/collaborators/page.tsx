"use client"

import { useEffect, useState } from "react"
import EditCollaboratorForm from "../../../components/edit-collaborator-form"
import AddCollaboratorForm from "../../../components/add-collaborator-form"
import Image from "next/image"

interface Collaborator {
  _id: string
  name: string
  about: string
  imageUrl: string
}

export default function CollaboratorsPage() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchCollaborators = async () => {
    const res = await fetch("/api/collaborators")
    const data = await res.json()
    setCollaborators(data)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    const res = await fetch(`/api/collaborators/${deleteId}`, {
      method: "DELETE",
    })

    if (res.ok) {
      fetchCollaborators()
    } else {
      alert("Failed to delete")
    }

    setShowDeleteModal(false)
    setDeleteId(null)
  }

  useEffect(() => {
    fetchCollaborators()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Collaborators</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-red-500 hover:bg-black text-white px-4 py-2 rounded"
        >
          {showAddForm ? "Cancel" : "+ Add Collaborator"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <AddCollaboratorForm
            onSuccess={() => {
              setShowAddForm(false)
              fetchCollaborators()
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborators.map((collab) => (
          <div key={collab._id} className="bg-white p-4 rounded shadow">
            <Image
              src={collab.imageUrl || "/placeholder.svg"}
              alt={collab.name}
              width={500}
              height={192}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{collab.name}</h3>
            <p className="text-sm text-gray-600">{collab.about}</p>

            {editingId === collab._id ? (
              <EditCollaboratorForm
                collaborator={collab}
                onCancel={() => setEditingId(null)}
                onUpdated={() => {
                  setEditingId(null)
                  fetchCollaborators()
                }}
              />
            ) : (
              <div className="flex justify-between mt-3">
                <button onClick={() => setEditingId(collab._id)} className="text-red-600 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteId(collab._id)
                    setShowDeleteModal(true)
                  }}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold text-black mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this collaborator?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
