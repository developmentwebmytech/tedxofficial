// 'use client';

// import { useState, useEffect, FormEvent } from 'react';
// import Image from 'next/image';

// interface Teaser {
//   _id: string;
//   title: string;
//   videoLink: string;
//   createdAt: string;
// }

// export default function TeasersPage() {
//   const [teasers, setTeasers] = useState<Teaser[]>([]);
//   const [form, setForm] = useState({ title: '', videoLink: '' });

//   useEffect(() => {
//     fetchTeasers();
//   }, []);

//   const fetchTeasers = async () => {
//     const res = await fetch('/api/teasers');
//     const data = await res.json();
//     setTeasers(data);
//   };
//   const getYouTubeThumbnail = (url: string): string | null => {
//     const match = url.match(
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
//     );
//     return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
//   };


//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/teasers', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       setForm({ title: '', videoLink: '' });
//       fetchTeasers();
//     }
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`/api/teasers/${id}`, { method: 'DELETE' });
//     setTeasers(teasers.filter((t) => t._id !== id));
//   };

//   return (
//     <div className="  px-6 ">

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-2xl shadow-md p-6 mb-10 space-y-5 border border-gray-100"
//       >
//         <h1 className="text-3xl font-bold  text-gray-800 mb-5"> Manage Teasers</h1>
//         <div className='grid grid-cols-2 gap-3'>
//           <div>
//             <label className="block font-semibold mb-1 text-gray-700">Title</label>
//             <input
//               type="text"
//               placeholder="Enter teaser title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1 text-gray-700">YouTube Link</label>
//             <input
//               type="text"
//               placeholder="https://youtube.com/..."
//               value={form.videoLink}
//               onChange={(e) => setForm({ ...form, videoLink: e.target.value })}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
//               required
//             />
//           </div>

//         </div>
//         <button
//           type="submit"
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
//         >
//           Add Teaser
//         </button>
//       </form>

//       {/* Teasers List */}
//       <div className="space-y-4">
//         {teasers.length === 0 ? (
//           <div className="text-center text-gray-500 py-8 text-lg">
//             No teasers added yet.
//           </div>
//         ) : (
//           teasers.map((t) => (
//             <div
//               key={t._id}
//               className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex justify-between items-start hover:shadow-md transition"
//             >
//               <div className="space-y-2">
//                 <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>

//                 <a
//                   href={t.videoLink}
//                   target="_blank"
//                   className="text-black hover:underline break-all block"
//                 >
//                   {t.videoLink}
//                 </a>

//                 {getYouTubeThumbnail(t.videoLink) && (
//                   <Image
//                     src={getYouTubeThumbnail(t.videoLink)!}
//                     alt="YouTube Thumbnail"
//                     width={256} // w-64 in Tailwind = 256px
//                     height={144} // approximate 16:9 ratio for a YouTube thumbnail
//                     className="rounded-lg border w-64"
//                   />
//                 )}

//                 <p className="text-sm text-gray-400">
//                   Added on {new Date(t.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               <button
//                 onClick={() => handleDelete(t._id)}
//                 className="text-white p-3 rounded w-fit bg-black hover:text-red-700 font-medium text-sm transition"
//               >
//                 Delete
//               </button>
//             </div>

//           ))
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

interface Teaser {
  _id: string;
  title: string;
  videoLink: string;
  createdAt: string;
}

export default function TeasersPage() {
  const [teasers, setTeasers] = useState<Teaser[]>([]);
  const [form, setForm] = useState({ title: '', videoLink: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeaserId, setSelectedTeaserId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeasers();
  }, []);

  const fetchTeasers = async () => {
    const res = await fetch('/api/teasers');
    const data = await res.json();
    setTeasers(data);
  };

  const getYouTubeThumbnail = (url: string): string | null => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/teasers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: '', videoLink: '' });
      fetchTeasers();
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedTeaserId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedTeaserId) return;

    await fetch(`/api/teasers/${selectedTeaserId}`, { method: 'DELETE' });
    setTeasers(teasers.filter((t) => t._id !== selectedTeaserId));
    setShowDeleteModal(false);
    setSelectedTeaserId(null);
  };

  return (
    <div className="px-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 mb-10 space-y-5 border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Manage Teasers</h1>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter teaser title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">YouTube Link</label>
            <input
              type="text"
              placeholder="https://youtube.com/..."
              value={form.videoLink}
              onChange={(e) => setForm({ ...form, videoLink: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
        >
          Add Teaser
        </button>
      </form>

      {/* Teasers List */}
      <div className="space-y-4">
        {teasers.length === 0 ? (
          <div className="text-center text-gray-500 py-8 text-lg">
            No teasers added yet.
          </div>
        ) : (
          teasers.map((t) => (
            <div
              key={t._id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex justify-between items-start hover:shadow-md transition"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>

                <a
                  href={t.videoLink}
                  target="_blank"
                  className="text-black hover:underline break-all block"
                >
                  {t.videoLink}
                </a>

                {getYouTubeThumbnail(t.videoLink) && (
                  <Image
                    src={getYouTubeThumbnail(t.videoLink)!}
                    alt="YouTube Thumbnail"
                    width={256}
                    height={144}
                    className="rounded-lg border w-64"
                  />
                )}

                <p className="text-sm text-gray-400">
                  Added on {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => confirmDelete(t._id)}
                className="text-white p-3 rounded w-fit bg-black hover:bg-red-700 font-medium text-sm transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this teaser?</p>
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
