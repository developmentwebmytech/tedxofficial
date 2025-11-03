// "use client";

// import { useEffect, useState } from "react";

// type AuditReport = {
//   _id: string;
//   title: string;
//   filename: string;
//   uploader: string;
//   createdAt: string;
// };

// export default function AdminAuditReports() {
//   const [reports, setReports] = useState<AuditReport[]>([]);
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [uploader, setUploader] = useState("");

//   const fetchReports = async () => {
//     const res = await fetch("/api/audit-reports");
//     const data = await res.json();
//     setReports(data);
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file || !title || !uploader) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("uploader", uploader);

//     await fetch("/api/audit-reports", { method: "POST", body: formData });
//     setTitle("");
//     setFile(null);
//     setUploader("");
//     fetchReports();
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`/api/audit-reports/${id}`, { method: "DELETE" });
//     fetchReports();
//   };

//   return (
//     <div className="px-5 mx-auto py-0">
//       {/* <h1 className="text-2xl font-bold mb-4">Upload Audit Report</h1> */}
      
//       <form onSubmit={handleUpload} className="space-y-4 shadow-xl p-4 rounded">
//          <h1 className="text-2xl font-bold mb-4">Upload Audit Report</h1>
//         <input
//           type="text"
//           placeholder="Report Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border border-slate-300 px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Uploader Name"
//           value={uploader}
//           onChange={(e) => setUploader(e.target.value)}
//           className="w-full border border-slate-300 px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="w-full"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Upload
//         </button>
//       </form>

//       <h2 className="text-xl font-semibold mt-8 mb-2">Existing Reports</h2>
//       <table className="w-full border border-slate-300 shadow-md">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="text-left p-2">Title</th>
//             <th className="text-left p-2">Uploader</th>
//             <th className="text-left p-2">Date</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((r) => (
//             <tr key={r._id} className="border-t">
//               <td className="p-2">{r.title}</td>
//               <td className="p-2">{r.uploader}</td>
//               <td className="p-2">{new Date(r.createdAt).toLocaleDateString()}</td>
//               <td className="p-2">
//                 <button
//                   onClick={() => handleDelete(r._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

type AuditReport = {
  _id: string;
  title: string;
  filename: string;
  uploader: string;
  createdAt: string;
};

export default function AdminAuditReports() {
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploader, setUploader] = useState("");

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const fetchReports = async () => {
    const res = await fetch("/api/audit-reports");
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !uploader) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("uploader", uploader);

    await fetch("/api/audit-reports", { method: "POST", body: formData });
    setTitle("");
    setFile(null);
    setUploader("");
    fetchReports();
  };

  const confirmDelete = (id: string) => {
    setSelectedReportId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedReportId) return;
    await fetch(`/api/audit-reports/${selectedReportId}`, { method: "DELETE" });
    fetchReports();
    setShowDeleteModal(false);
    setSelectedReportId(null);
  };

  return (
    <div className="px-5 mx-auto py-0">
      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-4 shadow-xl p-4 rounded">
        <h1 className="text-2xl font-bold mb-4">Upload Audit Report</h1>
        <input
          type="text"
          placeholder="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-slate-300 px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Uploader Name"
          value={uploader}
          onChange={(e) => setUploader(e.target.value)}
          className="w-full border border-slate-300 px-3 py-2 rounded"
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Upload
        </button>
      </form>

      {/* Existing Reports Table */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Existing Reports</h2>
      <table className="w-full border border-slate-300 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Title</th>
            <th className="text-left p-2">Uploader</th>
            <th className="text-left p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-2">{r.title}</td>
              <td className="p-2">{r.uploader}</td>
              <td className="p-2">{new Date(r.createdAt).toLocaleDateString()}</td>
              <td className="p-2">
                <button
                  onClick={() => confirmDelete(r._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this audit report?
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
