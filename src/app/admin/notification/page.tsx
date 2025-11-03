'use client';

import { useState, useEffect, FormEvent } from 'react';
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('@/components/TipTapEditor'), { ssr: false });

interface Notification {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch('/api/notification');
    const data = await res.json();
    setNotifications(data);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    const url = editingId ? `/api/notification/${editingId}` : '/api/notification';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: '', content: '' });
      setEditingId(null);
      fetchNotifications();
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedNotificationId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedNotificationId) return;

    const res = await fetch(`/api/notification/${selectedNotificationId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setNotifications((prev) => prev.filter((n) => n._id !== selectedNotificationId));
      setShowDeleteModal(false);
      setSelectedNotificationId(null);
    }
  };

  const handleEdit = (n: Notification) => {
    setForm({ title: n.title, content: n.content });
    setEditingId(n._id);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded mb-10 shadow">
        <h1 className="text-2xl font-bold mb-6">
          {editingId ? 'Edit Notification' : 'Manage Notifications'}
        </h1>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-slate-400 p-2 mb-4 rounded focus:border-red-500"
        />

        <div className="mb-4">
          <TiptapEditor
            content={form.content}
            onChange={(value) => setForm({ ...form, content: value })}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {editingId ? 'Update Notification' : 'Add Notification'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ title: '', content: '' });
              }}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white shadow rounded">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 p-6">No notifications available.</p>
        ) : (
          <ul>
            {notifications.map((n) => (
              <li key={n._id} className="border-b p-4 flex justify-between items-start gap-6">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{n.title}</h3>
                  <div
                    className="text-gray-700 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: n.content }}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(n)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(n._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this notification?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
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
