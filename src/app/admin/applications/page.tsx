"use client";
import { useEffect, useState } from "react";

export default function AdminApplicationsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [apps, setApps] = useState<any[]>([]);
  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState("In Review");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch all applications
  const fetchApps = async () => {
    const res = await fetch("/api/applications");
    const data = await res.json();
    if (data.success) setApps(data.applications);
  };

  // Create new application
  const createApp = async () => {
    if (!applicationId) {
      alert("Application ID is required");
      return;
    }

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId, status, message }),
    });
    const data = await res.json();

    if (!data.success) {
      alert(data.error || "Failed to create application");
      return;
    }

    setApplicationId("");
    setMessage("");
    setStatus("In Review");
    fetchApps();
  };

  // Update application
  const updateApp = async (id: string) => {
    const res = await fetch(`/api/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, message }),
    });
    const data = await res.json();

    if (!data.success) {
      alert("Update failed");
      return;
    }

    setEditingId(null);
    fetchApps();
  };

  // Confirm delete
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Delete application
  const deleteApp = async () => {
    if (!deleteId) return;

    const res = await fetch(`/api/applications/${deleteId}`, { method: "DELETE" });
    const data = await res.json();

    if (!data.success) {
      alert("Delete failed");
      return;
    }

    setShowDeleteModal(false);
    setDeleteId(null);
    fetchApps();
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div className="px-6 mx-5 py-4 bg-white">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Manage Applications</h2>

      {/* Form to create new application */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Application ID"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          className="border border-slate-400 outline-none p-2 rounded w-1/4"
        />

        <select
          className="border border-slate-400 p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>In Review</option>
          <option>In Progress</option>
          <option>Interview Round</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-slate-400 p-2 rounded w-1/3"
        />

        <button
          onClick={createApp}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Create Application
        </button>
      </div>

      {/* Applications Table */}
      <table className="w-full  border border-slate-400 text-left">
        <thead>
          <tr className="bg-gray-100 border border-slate-400">
            <th className="p-2 border border-slate-400">Application ID</th>
            <th className="p-2 border border-slate-400">Status</th>
            <th className="p-2 border border-slate-400">Message</th>
            <th className="p-2 border border-slate-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app._id}>
              <td className="p-2 border border-slate-400">{app.applicationId}</td>
              <td className="p-2 border border-slate-400">
                {editingId === app._id ? (
                  <select
                    className="border border-slate-400 p-2 rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>In Review</option>
                    <option>In Progress</option>
                    <option>Interview Round</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                ) : (
                  app.status
                )}
              </td>
              <td className="p-2 border border-slate-400">
                {editingId === app._id ? (
                  <input
                    type="text"
                    className="border border-slate-400 p-2 rounded w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                ) : (
                  app.message
                )}
              </td>
              <td className="p-2 border border-slate-400 flex gap-2">
                {editingId === app._id ? (
                  <>
                    <button
                      onClick={() => updateApp(app._id)}
                      className="text-red-600 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(app._id);
                        setStatus(app.status);
                        setMessage(app.message);
                      }}
                      className="text-white px-3 rounded  bg-red-500 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(app._id)}
                      className="text-white px-3 rounded  bg-black"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this application? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={deleteApp}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

