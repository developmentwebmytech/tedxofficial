// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// type Speaker = {
//   _id: string;
//   name: string;
//   about: string;
//   image: string;
//   social: {
//     linkedin?: string;
//     twitter?: string;
//     instagram?: string;
//   };
// };

// export default function AdminSpeakerList() {
//   const [speakers, setSpeakers] = useState<Speaker[]>([]);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [editForm, setEditForm] = useState({ name: '', about: '' });

//   useEffect(() => {
//     fetch('/api/speakers')
//       .then((res) => res.json())
//       .then(setSpeakers);
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this speaker?')) return;

//     const res = await fetch(`/api/speakers/${id}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       setSpeakers((prev) => prev.filter((s) => s._id !== id));
//     } else {
//       alert('Failed to delete speaker');
//     }
//   };

//   const handleEdit = (speaker: Speaker) => {
//     setEditId(speaker._id);
//     setEditForm({ name: speaker.name, about: speaker.about });
//   };

//   const handleSave = async (id: string) => {
//     const res = await fetch(`/api/speakers/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(editForm),
//     });

//     if (res.ok) {
//       const updated = await res.json();
//       setSpeakers((prev) =>
//         prev.map((s) => (s._id === id ? updated : s))
//       );
//       setEditId(null);
//     } else {
//       alert('Failed to update speaker');
//     }
//   };

//   const handleCancel = () => {
//     setEditId(null);
//     setEditForm({ name: '', about: '' });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Speakers</h1>
//       <table className="w-full border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Image</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">About</th>
//             <th className="p-2 border">Social</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {speakers.map((s) => (
//             <tr key={s._id}>
//               <td className="p-2 border">
//                 <Image src={s.image} alt={s.name} width={60} height={60} className="rounded-md" />
//               </td>
//               <td className="p-2 border">
//                 {editId === s._id ? (
//                   <input
//                     type="text"
//                     value={editForm.name}
//                     onChange={(e) =>
//                       setEditForm((prev) => ({ ...prev, name: e.target.value }))
//                     }
//                     className="border p-1 w-full"
//                   />
//                 ) : (
//                   s.name
//                 )}
//               </td>
//               <td className="p-2 border">
//                 {editId === s._id ? (
//                   <textarea
//                     value={editForm.about}
//                     onChange={(e) =>
//                       setEditForm((prev) => ({ ...prev, about: e.target.value }))
//                     }
//                     className="border p-1 w-full"
//                   />
//                 ) : (
//                   s.about
//                 )}
//               </td>
//               <td className="p-2 border space-x-2 text-blue-600 text-sm">
//                 {s.social?.linkedin && (
//                   <a href={s.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
//                     LinkedIn
//                   </a>
//                 )}
//                 {s.social?.twitter && (
//                   <a href={s.social.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
//                     Twitter
//                   </a>
//                 )}
//                 {s.social?.instagram && (
//                   <a href={s.social.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
//                     Instagram
//                   </a>
//                 )}
//               </td>

//               <td className="p-2 border text-sm space-x-2">
//                 {editId === s._id ? (
//                   <>
//                     <button
//                       onClick={() => handleSave(s._id)}
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => handleEdit(s)}
//                       className="bg-blue-500 text-white px-2 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(s._id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Speaker = {
  _id: string;
  name: string;
  about: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
};

export default function AdminSpeakerList() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', about: '' });

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/speakers')
      .then((res) => res.json())
      .then(setSpeakers);
  }, []);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteId) return;

    const res = await fetch(`/api/speakers/${deleteId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setSpeakers((prev) => prev.filter((s) => s._id !== deleteId));
    } else {
      alert('Failed to delete speaker');
    }

    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleEdit = (speaker: Speaker) => {
    setEditId(speaker._id);
    setEditForm({ name: speaker.name, about: speaker.about });
  };

  const handleSave = async (id: string) => {
    const res = await fetch(`/api/speakers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      const updated = await res.json();
      setSpeakers((prev) => prev.map((s) => (s._id === id ? updated : s)));
      setEditId(null);
    } else {
      alert('Failed to update speaker');
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditForm({ name: '', about: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Speakers</h1>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">About</th>
            <th className="p-2 border">Social</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {speakers.map((s) => (
            <tr key={s._id}>
              <td className="p-2 border">
                <Image
                  src={s.image}
                  alt={s.name}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
              </td>
              <td className="p-2 border">
                {editId === s._id ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  s.name
                )}
              </td>
              <td className="p-2 border">
                {editId === s._id ? (
                  <textarea
                    value={editForm.about}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, about: e.target.value }))
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  s.about
                )}
              </td>
              <td className="p-2 border space-x-2 text-blue-600 text-sm">
                {s.social?.linkedin && (
                  <a
                    href={s.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
                {s.social?.twitter && (
                  <a
                    href={s.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                )}
                {s.social?.instagram && (
                  <a
                    href={s.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                )}
              </td>

              <td className="p-2 border text-sm space-x-2">
                {editId === s._id ? (
                  <>
                    <button
                      onClick={() => handleSave(s._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(s._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-black">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this speaker?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
