// "use client";
// import { useEffect, useState } from "react";

// interface PolicyDocument {
//   _id: string;
//   title: string;
//   fileUrl: string;
//   uploadedAt: string;
// }

// export default function PolicyDocumentList() {
//   const [docs, setDocs] = useState<PolicyDocument[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDocs = async () => {
//       const res = await fetch("/api/policydocuments");
//       const data = await res.json();
//       setDocs(data);
//       setLoading(false);
//     };
//     fetchDocs();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this document?")) return;
//     const res = await fetch(`/api/policydocuments/${id}`, {
//       method: "DELETE",
//     });
//     if (res.ok) {
//       setDocs((prev) => prev.filter((doc) => doc._id !== id));
//     } else {
//       alert("Failed to delete.");
//     }
//   };

//   const handleEdit = async (doc: PolicyDocument) => {
//     const newTitle = prompt("Enter new title:", doc.title);
//     if (!newTitle || newTitle === doc.title) return;

//     const res = await fetch(`/api/policydocuments/${doc._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: newTitle }),
//     });

//     if (res.ok) {
//       const updated = await res.json();
//       setDocs((prev) =>
//         prev.map((d) => (d._id === doc._id ? { ...d, title: updated.title } : d))
//       );
//     } else {
//       alert("Failed to update title.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="font-semibold mb-2">Existing Documents</h2>
//       <table className="w-full border border-slate-200 shadow-lg mb-5">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-2">Title</th>
//             <th className="p-2">Uploaded</th>
//             <th className="p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {docs.map((doc) => (
//             <tr key={doc._id} className="border-t">
//               <td className="p-2">
//                 <a
//                   href={doc.fileUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {doc.title}
//                 </a>
//               </td>
//               <td className="p-2">
//                 {new Date(doc.uploadedAt).toLocaleDateString()}
//               </td>
//               <td className="p-2 flex gap-4">
//                 <button
//                   onClick={() => handleEdit(doc)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(doc._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {docs.length === 0 && (
//             <tr>
//               <td colSpan={3} className="p-2 text-center text-gray-500">
//                 No documents uploaded yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";

interface PolicyDocument {
  _id: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
}

export default function PolicyDocumentList() {
  const [docs, setDocs] = useState<PolicyDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await fetch("/api/policydocuments");
      const data = await res.json();
      setDocs(data);
      setLoading(false);
    };
    fetchDocs();
  }, []);

  const confirmDelete = (id: string) => {
    setSelectedDocId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedDocId) return;
    const res = await fetch(`/api/policydocuments/${selectedDocId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setDocs((prev) => prev.filter((doc) => doc._id !== selectedDocId));
    } else {
      alert("Failed to delete.");
    }
    setShowDeleteModal(false);
    setSelectedDocId(null);
  };

  const handleEdit = async (doc: PolicyDocument) => {
    const newTitle = prompt("Enter new title:", doc.title);
    if (!newTitle || newTitle === doc.title) return;

    const res = await fetch(`/api/policydocuments/${doc._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    if (res.ok) {
      const updated = await res.json();
      setDocs((prev) =>
        prev.map((d) => (d._id === doc._id ? { ...d, title: updated.title } : d))
      );
    } else {
      alert("Failed to update title.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="font-semibold mb-2">Existing Documents</h2>
      <table className="w-full border border-slate-200 shadow-lg mb-5">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Uploaded</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc._id} className="border-t">
              <td className="p-2">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {doc.title}
                </a>
              </td>
              <td className="p-2">
                {new Date(doc.uploadedAt).toLocaleDateString()}
              </td>
              <td className="p-2 flex gap-4">
                <button
                  onClick={() => handleEdit(doc)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(doc._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {docs.length === 0 && (
            <tr>
              <td colSpan={3} className="p-2 text-center text-gray-500">
                No documents uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this document?
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
