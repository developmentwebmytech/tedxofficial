
'use client';

import { useEffect, useState } from 'react';

type Verifier = {
  _id: string;
  ID: string;
  name: string;
  email: string;
  contact: string;
  status: 'Verified' | 'Not Verified' | 'Rejected';
};

type VerifierForm = Omit<Verifier, '_id'>;

export default function VerifierPage() {
  const [verifiers, setVerifiers] = useState<Verifier[]>([]);
  const [form, setForm] = useState<VerifierForm>({
    ID: '',
    name: '',
    email: '',
    contact: '',
    status: 'Not Verified',
  });
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedID, setSelectedID] = useState<string | null>(null);

  useEffect(() => {
    fetchVerifiers();
  }, []);

  const fetchVerifiers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/verifiers');
      const data = await res.json();
      setVerifiers(data);
    } catch (err) {
      console.error('Failed to fetch verifiers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/verifiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create verifier');
      }
      await fetchVerifiers();
      setForm({ ID: '', name: '', email: '', contact: '', status: 'Not Verified' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Create Error:', err.message);
      alert(`Error: ${err.message}`);
    }
  }

  const confirmDelete = (ID: string) => {
    setSelectedID(ID);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedID) return;
    try {
      const res = await fetch(`/api/verifiers/${selectedID}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setVerifiers((prev) => prev.filter((v) => v.ID !== selectedID));
      setShowModal(false);
      setSelectedID(null);
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  return (
    <div className="px-10 py-7 mx-7 bg-white">
      <h2 className="text-2xl mt-5 font-bold mb-4">Add speaker for verification</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input type="text" name="ID" placeholder="Verifier ID" value={form.ID} onChange={handleChange} className="border border-slate-300 p-2 rounded" required />
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border border-slate-300 p-2 rounded" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border border-slate-300 p-2 rounded" required />
        <input type="text" name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} className="border border-slate-300 p-2 rounded" required />
        <select name="status" value={form.status} onChange={handleChange} className="border border-slate-300 p-2 rounded" required>
          <option value="Verified">Verified</option>
          <option value="Not Verified">Not Verified</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit" className="bg-red-600 w-fit text-white rounded px-4 py-2 col-span-full">Add Verifier</button>
      </form>

      <h2 className="text-xl font-bold mt-10">All Verifiers</h2>

      {loading ? (
        <p>Loading verifiers...</p>
      ) : verifiers.length === 0 ? (
        <p className="text-gray-600">No verifiers found.</p>
      ) : (
        <ul className="space-y-4">
          {verifiers.map((v) => (
            <li key={v._id} className="border border-slate-300 p-4 rounded flex mb-10 mt-5 justify-between items-start flex-col md:flex-row gap-4">
              <div>
                <p><strong>ID:</strong> {v.ID}</p>
                <p><strong>Name:</strong> {v.name}</p>
                <p><strong>Email:</strong> {v.email}</p>
                <p><strong>Contact:</strong> {v.contact}</p>
                <p><strong>Status:</strong> {v.status}</p>
              </div>
              <button onClick={() => confirmDelete(v.ID)} className="text-sm bg-red-500 text-white px-3 py-1 rounded self-start md:self-center">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this verifier?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
