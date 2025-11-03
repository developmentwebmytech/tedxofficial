/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';

const emptyDoc = {
  docNumber: '',
  issuedTo: '',
  designation: '',
  issuedBy: '',
  issuedOn: '',
  documentType: '',
  status: '',
  signedBy: '',
};

export default function AdminPage() {
  const [form, setForm] = useState(emptyDoc);
  const [documents, setDocuments] = useState([]);

  const fetchDocs = async () => {
    const res = await fetch('/api/admin-docs');
    const data = await res.json();
    setDocuments(data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/admin-docs', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm(emptyDoc);
      fetchDocs();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin-docs/${id}`, { method: 'DELETE' });
    fetchDocs();
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="p-6 -mt-5">

       <div className='bg-white p-4 '>
       <h1 className="text-2xl font-bold text-red-600 mb-4">Admin Panel – Upload Document</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4   p-4 rounded-lg mb-10">
         
        {Object.keys(emptyDoc).map((key) => (
          <input
            key={key}
            required
            placeholder={key.replace(/([A-Z])/g, ' $1')}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value={(form as any)[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="border border-slate-300 p-2 rounded"
          />
        ))}
        <button type="submit" className="w-fit px-2 bg-red-600 text-white py-2 rounded hover:bg-black">
          Upload Document
        </button>
      </form>
      </div>

      <div className='bg-white p-4 mt-5'>

      <h2 className="text-xl  font-semibold mb-2 mt-7">Uploaded Documents</h2>
      <div className="overflow-x-auto border border-slate-300 rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Doc No</th>
              <th className="p-2">Issued To</th>
              <th className="p-2">Type</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc: any) => (
              <tr key={doc._id} className="border-t-slate-300 ">
                <td className="p-2">{doc.docNumber}</td>
                <td className="p-2">{doc.issuedTo}</td>
                <td className="p-2">{doc.documentType}</td>
                <td className="p-2">{doc.issuedOn}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">No documents uploaded</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
