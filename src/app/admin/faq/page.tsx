// 'use client';
// import { useEffect, useState } from 'react';

// type Faq = {
//   _id: string;
//   question: string;
//   answer: string;
// };

// export default function AdminFAQPage() {
//   const [faqs, setFaqs] = useState<Faq[]>([]);
//   const [editing, setEditing] = useState<string | null>(null);
//   const [form, setForm] = useState({ question: '', answer: '' });

//   const fetchFaqs = async () => {
//     const res = await fetch('/api/faq');
//     const data = await res.json();
//     setFaqs(data);
//   };

//   useEffect(() => {
//     fetchFaqs();
//   }, []);

//   const handleSubmit = async () => {
//     if (!form.question || !form.answer) return;

//     const method = editing ? 'PUT' : 'POST';
//     const url = editing ? `/api/faq/${editing}` : '/api/faq';

//     await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     setForm({ question: '', answer: '' });
//     setEditing(null);
//     fetchFaqs();
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`/api/faq/${id}`, { method: 'DELETE' });
//     fetchFaqs();
//   };

//   const startEdit = (faq: Faq) => {
//     setEditing(faq._id);
//     setForm({ question: faq.question, answer: faq.answer });
//   };

//   return (
//     <div className="p-4">
      

//       <div className="mb-6 bg-white p-4 shadow rounded">
//         <h1 className="text-xl font-bold text-black mb-6">Manage FAQs</h1>
//         <input
//           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//           placeholder="Question"
//           value={form.question}
//           onChange={(e) => setForm({ ...form, question: e.target.value })}
//         />
//         <textarea
//           className="mt-4 w-full border border-slate-200 focus:outline-none focus:border-slate-200 rounded-md p-3 text-sm text-slate-700"
//           placeholder="Answer"
//           rows={3}
//           value={form.answer}
//           onChange={(e) => setForm({ ...form, answer: e.target.value })}
//         />
//         <button
//           onClick={handleSubmit}
//           className="bg-black hover:bg-red-500 text-white text-sm font-bold py-2 px-4 mt-2  rounded"
//         >
//           {editing ? 'Update FAQ' : 'Add FAQ'}
//         </button>
//         {editing && (
//           <button
//             onClick={() => {
//               setEditing(null);
//               setForm({ question: '', answer: '' });
//             }}
//             className="ml-4 text-gray-600 underline"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       <div className="space-y-4">
//         {faqs.map((faq) => (
//           <div key={faq._id} className="p-4 bg-white shadow rounded">
//             <h3 className="font-semibold">{faq.question}</h3>
//             <p className="text-gray-700">{faq.answer}</p>
//             <div className="mt-2 text-sm text-right space-x-2">
//               <button onClick={() => startEdit(faq)} className="bg-red-500 hover:bg-black text-white font-bold py-2 px-4 border-b-4  rounded">Edit</button>
//               <button onClick={() => handleDelete(faq._id)} className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4  rounded">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';
import { useEffect, useState } from 'react';

type Faq = {
  _id: string;
  question: string;
  answer: string;
};

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ question: '', answer: '' });

  // Modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFaqs = async () => {
    const res = await fetch('/api/faq');
    const data = await res.json();
    setFaqs(data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async () => {
    if (!form.question || !form.answer) return;

    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/faq/${editing}` : '/api/faq';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({ question: '', answer: '' });
    setEditing(null);
    fetchFaqs();
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/faq/${deleteId}`, { method: 'DELETE' });
    setIsModalOpen(false);
    setDeleteId(null);
    fetchFaqs();
  };

  const startEdit = (faq: Faq) => {
    setEditing(faq._id);
    setForm({ question: faq.question, answer: faq.answer });
  };

  return (
    <div className="p-4">
      {/* Form */}
      <div className="mb-6 bg-white p-4 shadow rounded">
        <h1 className="text-xl font-bold text-black mb-6">Manage FAQs</h1>
        <input
          className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700"
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
        />
        <textarea
          className="mt-4 w-full border border-slate-200 rounded-md p-3 text-sm text-slate-700"
          placeholder="Answer"
          rows={3}
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-black hover:bg-red-500 text-white text-sm font-bold py-2 px-4 mt-2 rounded"
        >
          {editing ? 'Update FAQ' : 'Add FAQ'}
        </button>
        {editing && (
          <button
            onClick={() => {
              setEditing(null);
              setForm({ question: '', answer: '' });
            }}
            className="ml-4 text-gray-600 underline"
          >
            Cancel
          </button>
        )}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
            <div className="mt-2 text-sm text-right space-x-2">
              <button
                onClick={() => startEdit(faq)}
                className="bg-red-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(faq._id)}
                className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this FAQ?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
