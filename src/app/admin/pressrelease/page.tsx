// 'use client';

// import { useEffect, useState } from 'react';

// type PressRelease = {
//   _id: string;
//   title: string;
//   pdfUrl: string;
//   date: string;
//   createdAt: string;
//   updatedAt?: string;
// };

// export default function PressReleaseAdminPage() {
//   const [releases, setReleases] = useState<PressRelease[]>([]);
//   const [title, setTitle] = useState('');
//   const [date, setDate] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Editing
//   const [editId, setEditId] = useState<string | null>(null);
//   const [editTitle, setEditTitle] = useState('');
//   const [editDate, setEditDate] = useState('');
//   const [editFile, setEditFile] = useState<File | null>(null);

//   const fetchReleases = async () => {
//     const res = await fetch('/api/pressrelease');
//     const data = await res.json();
//     setReleases(data);
//   };

//   useEffect(() => {
//     fetchReleases();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !file || !date) return alert('All fields are required');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('file', file);
//     formData.append('date', date);

//     setIsLoading(true);
//     const res = await fetch('/api/pressrelease', {
//       method: 'POST',
//       body: formData,
//     });

//     if (res.ok) {
//       setTitle('');
//       setDate('');
//       setFile(null);
//       fetchReleases();
//     } else {
//       alert('Error uploading press release');
//     }
//     setIsLoading(false);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this press release?')) return;

//     const res = await fetch(`/api/pressrelease/${id}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       fetchReleases();
//     } else {
//       alert('Error deleting press release');
//     }
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editTitle || !editDate) return alert('Title and Date are required');

//     const formData = new FormData();
//     formData.append('title', editTitle);
//     formData.append('date', editDate);
//     if (editFile) formData.append('file', editFile);

//     const res = await fetch(`/api/pressrelease/${editId}`, {
//       method: 'PUT',
//       body: formData,
//     });

//     if (res.ok) {
//       setEditId(null);
//       setEditTitle('');
//       setEditDate('');
//       setEditFile(null);
//       fetchReleases();
//     } else {
//       alert('Failed to update press release');
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="bg-white p-5 rounded-md mb-6">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">
//           TEDxThaltej Youth Reporters
//         </h1>
//         <h2 className="text-xl font-semibold text-red-500 mb-6 underline">
//           PRESS RELEASE SECTION
//         </h2>

//         {/* Add New Press Release */}
//         <form onSubmit={handleSubmit} className="gap-5 grid grid-cols-2">
//           <input
//             type="text"
//             placeholder="Enter Press Release Title"
//             className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 shadow-sm"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <input
//             type="file"
//             accept="application/pdf"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="py-3 px-2 block w-full text-sm text-slate-700 border border-gray-300 rounded-lg cursor-pointer bg-white"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Enter Date (e.g., 11 June 2025)"
//             className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 shadow-sm"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-fit"
//           >
//             {isLoading ? 'Uploading...' : 'Add Press Release'}
//           </button>
//         </form>
//       </div>

//       {/* Edit Press Release */}
//       {editId && (
//         <form onSubmit={handleUpdate} className="mb-6 bg-yellow-50 p-4 space-y-4">
//           <h3 className="text-lg font-semibold text-yellow-800">Update Press Release</h3>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             placeholder="New Title"
//             required
//           />
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={editDate}
//             onChange={(e) => setEditDate(e.target.value)}
//             placeholder="New Date (e.g., 11 June 2025)"
//             required
//           />
//           <input
//             type="file"
//             accept="application/pdf"
//             onChange={(e) => setEditFile(e.target.files?.[0] || null)}
//             className="w-full border p-2 rounded"
//           />
//           <div className="flex gap-2">
//             <button
//               type="submit"
//               className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
//             >
//               Update
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setEditId(null);
//                 setEditTitle('');
//                 setEditDate('');
//                 setEditFile(null);
//               }}
//               className="text-gray-600 underline"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Table */}
//       <div className="overflow-hidden bg-white p-5">
//         <h3 className="text-xl font-bold mb-3 text-gray-700">All Youth Reports</h3>
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-red-600 font-bold">TITLE</th>
//               <th className="p-3 text-gray-600">Date</th>
//               <th className="p-3 text-gray-600">PDF</th>
//               <th className="p-3 text-gray-600">ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {releases.map((release) => (
//               <tr key={release._id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">{release.title}</td>
//                 <td className="p-3">{release.date || '—'}</td>
//                 <td className="p-3">
//                   <a
//                     href={release.pdfUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View PDF
//                   </a>
//                 </td>
//                 <td className="p-3 space-x-2">
//                   <button
//                     onClick={() => {
//                       setEditId(release._id);
//                       setEditTitle(release.title);
//                       setEditDate(release.date || '');
//                       setEditFile(null);
//                     }}
//                     className="text-white bg-red-500 px-3 py-1 rounded hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(release._id)}
//                     className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';

type PressRelease = {
  _id: string;
  title: string;
  pdfUrl: string;
  date: string;
  createdAt: string;
  updatedAt?: string;
};

export default function PressReleaseAdminPage() {
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Editing
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);

  // Deletion Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchReleases = async () => {
    const res = await fetch('/api/pressrelease');
    const data = await res.json();
    setReleases(data);
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file || !date) return alert('All fields are required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('date', date);

    setIsLoading(true);
    const res = await fetch('/api/pressrelease', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setTitle('');
      setDate('');
      setFile(null);
      fetchReleases();
    } else {
      alert('Error uploading press release');
    }
    setIsLoading(false);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteId) return;

    const res = await fetch(`/api/pressrelease/${deleteId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchReleases();
    } else {
      alert('Error deleting press release');
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle || !editDate) return alert('Title and Date are required');

    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('date', editDate);
    if (editFile) formData.append('file', editFile);

    const res = await fetch(`/api/pressrelease/${editId}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      setEditId(null);
      setEditTitle('');
      setEditDate('');
      setEditFile(null);
      fetchReleases();
    } else {
      alert('Failed to update press release');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-5 rounded-md mb-6">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          TEDxThaltej Youth Reporters
        </h1>
        <h2 className="text-xl font-semibold text-red-500 mb-6 underline">
          PRESS RELEASE SECTION
        </h2>

        {/* Add New Press Release */}
        <form onSubmit={handleSubmit} className="gap-5 grid grid-cols-2">
          <input
            type="text"
            placeholder="Enter Press Release Title"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="py-3 px-2 block w-full text-sm text-slate-700 border border-gray-300 rounded-lg cursor-pointer bg-white"
            required
          />
          <input
            type="text"
            placeholder="Enter Date (e.g., 11 June 2025)"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 shadow-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-fit"
          >
            {isLoading ? 'Uploading...' : 'Add Press Release'}
          </button>
        </form>
      </div>

      {/* Edit Press Release */}
      {editId && (
        <form onSubmit={handleUpdate} className="mb-6  p-4 space-y-4">
          <h3 className="text-lg font-semibold text-yellow-800">Update Press Release</h3>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="New Title"
            required
          />
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            placeholder="New Date (e.g., 11 June 2025)"
            required
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setEditFile(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-black"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setEditTitle('');
                setEditDate('');
                setEditFile(null);
              }}
              className="text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="overflow-hidden bg-white p-5">
        <h3 className="text-xl font-bold mb-3 text-gray-700">All Youth Reports</h3>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-red-600 font-bold">TITLE</th>
              <th className="p-3 text-gray-600">Date</th>
              <th className="p-3 text-gray-600">PDF</th>
              <th className="p-3 text-gray-600">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {releases.map((release) => (
              <tr key={release._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{release.title}</td>
                <td className="p-3">{release.date || '—'}</td>
                <td className="p-3">
                  <a
                    href={release.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View PDF
                  </a>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditId(release._id);
                      setEditTitle(release.title);
                      setEditDate(release.date || '');
                      setEditFile(null);
                    }}
                    className="text-white bg-black px-3 py-1 rounded hover:bg-red-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(release._id)}
                    className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this press release?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDeleteConfirmed}
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
