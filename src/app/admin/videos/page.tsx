
// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// type SpeakerVideo = {
//   _id: string;
//   title: string;
//   description: string;
//   youtubeId: string;
//   createdAt?: string;
// };

// export default function AdminSpeakersPage() {
//   const [videos, setVideos] = useState<SpeakerVideo[]>([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [youtubeUrl, setYoutubeUrl] = useState('');
//   const [editId, setEditId] = useState<string | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchVideos = async () => {
//     const res = await fetch('/api/videos');
//     const data = await res.json();
//     setVideos(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const extractYouTubeID = (url: string) => {
//     const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
//     return match ? match[1] : null;
//   };

//   const handleSubmit = async () => {
//     const youtubeId = extractYouTubeID(youtubeUrl);
//     if (!title || !description || !youtubeId) return alert('All fields required');

//     const payload = JSON.stringify({ title, description, youtubeId });

//     const method = editId ? 'PUT' : 'POST';
//     const url = editId ? `/api/videos?id=${editId}` : '/api/videos';

//     const res = await fetch(url, {
//       method,
//       body: payload,
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (res.ok) {
//       alert(editId ? 'Video updated!' : 'Video added!');
//       fetchVideos();
//       setTitle('');
//       setDescription('');
//       setYoutubeUrl('');
//       setEditId(null);
//       setShowForm(false);
//     } else {
//       alert('Failed to save video');
//     }
//   };

//   const handleEdit = (video: SpeakerVideo) => {
//     setTitle(video.title);
//     setDescription(video.description);
//     setYoutubeUrl(`https://youtube.com/watch?v=${video.youtubeId}`);
//     setEditId(video._id);
//     setShowForm(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this video?')) return;
//     const res = await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
//     if (res.ok) fetchVideos();
//     else alert('Failed to delete');
//   };

//   return (
//     <div className="py-4 px-4 -mt-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-xl ml-3 font-bold text-black">All Speakers</h1>
//         <button
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditId(null);
//             setTitle('');
//             setDescription('');
//             setYoutubeUrl('');
//           }}
//           className="bg-black hover:bg-red-500 text-white px-4 py-2 mr-3 rounded"
//         >
//           {showForm ? 'Cancel' : 'Add Speaker'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-white p-4 rounded mb-6 space-y-4">
//           <h1 className='text-lg font-bold text-black'>Add speaker</h1>
//           <input
//             type="text"
//             placeholder="Speaker Name"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 rounded border border-gray-300"
//           />
//           <textarea
//             placeholder="Video Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 rounded border border-gray-300"
//           />
//           <input
//             type="url"
//             placeholder="YouTube Video Link"
//             value={youtubeUrl}
//             onChange={(e) => setYoutubeUrl(e.target.value)}
//             className="w-full p-2 rounded border border-gray-300"
//           />
//           <button
//             onClick={handleSubmit}
//             className=" text-white px-4 py-2 rounded border border-gray-300 bg-[#EC022B] hover:text-white hover:bg-black"
//           >
//             {editId ? 'Update' : 'Submit'}
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <p className="text-white">Loading...</p>
//       ) : (
//         <div className="p-2">
//           <table className="w-full text-left text-white">
//             <thead>
//               <tr className="bg-red-500 text-sm text-white">
//                 <th className="p-2">Serial no.</th>
//                 <th className="p-2">Thumbnail</th>
//                 <th className="p-2">Speaker Name</th>
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {videos.map((video, index) => (
//                 <tr key={video._id} className="border-b text-black border-gray-700">
//                   <td className="p-2">{index + 1}</td>
//                   <td className="p-2">
//                     <Image
//   src={`https://img.youtube.com/vi/${video.youtubeId}/0.jpg`}
//   alt="Thumbnail"
//   width={80} // w-20 in Tailwind = 80px
//   height={60} // maintaining 4:3 ratio for default YouTube thumbnail
//   className="w-20 rounded"
// />
//                   </td>
//                   <td className="p-2">{video.title}</td>
//                   <td className="p-2 text-sm text-gray-500">
//                     {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : '—'}
//                   </td>
//                   <td className="p-2 space-x-2">
//                     <button
//                       onClick={() => handleEdit(video)}
//                       className=" bg-black hover:bg-red-500 text-white font-bold py-2 px-4 text-sm rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(video._id)}
//                       className=" bg-black hover:bg-red-500 text-white font-bold py-2 px-4 text-sm  rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {videos.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="text-center p-4 text-gray-400">
//                     No videos uploaded yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type SpeakerVideo = {
  _id: string;
  title: string;
  description: string;
  youtubeId: string;
  createdAt?: string;
};

export default function AdminSpeakersPage() {
  const [videos, setVideos] = useState<SpeakerVideo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchVideos = async () => {
    const res = await fetch('/api/videos');
    const data = await res.json();
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const extractYouTubeID = (url: string) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleSubmit = async () => {
    const youtubeId = extractYouTubeID(youtubeUrl);
    if (!title || !description || !youtubeId) return alert('All fields required');

    const payload = JSON.stringify({ title, description, youtubeId });

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/videos?id=${editId}` : '/api/videos';

    const res = await fetch(url, {
      method,
      body: payload,
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert(editId ? 'Video updated!' : 'Video added!');
      fetchVideos();
      setTitle('');
      setDescription('');
      setYoutubeUrl('');
      setEditId(null);
      setShowForm(false);
    } else {
      alert('Failed to save video');
    }
  };

  const handleEdit = (video: SpeakerVideo) => {
    setTitle(video.title);
    setDescription(video.description);
    setYoutubeUrl(`https://youtube.com/watch?v=${video.youtubeId}`);
    setEditId(video._id);
    setShowForm(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/videos?id=${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      fetchVideos();
      setIsModalOpen(false);
      setDeleteId(null);
    } else {
      alert('Failed to delete');
    }
  };

  return (
    <div className="py-4 px-4 -mt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl ml-3 font-bold text-black">All Speakers</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setTitle('');
            setDescription('');
            setYoutubeUrl('');
          }}
          className="bg-black hover:bg-red-500 text-white px-4 py-2 mr-3 rounded"
        >
          {showForm ? 'Cancel' : 'Add Speaker'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded mb-6 space-y-4">
          <h1 className='text-lg font-bold text-black'>Add speaker</h1>
          <input
            type="text"
            placeholder="Speaker Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded border border-gray-300"
          />
          <textarea
            placeholder="Video Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded border border-gray-300"
          />
          <input
            type="url"
            placeholder="YouTube Video Link"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full p-2 rounded border border-gray-300"
          />
          <button
            onClick={handleSubmit}
            className="text-white px-4 py-2 rounded border border-gray-300 bg-[#EC022B] hover:text-white hover:bg-black"
          >
            {editId ? 'Update' : 'Submit'}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="p-2">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="bg-red-500 text-sm text-white">
                <th className="p-2">Serial no.</th>
                <th className="p-2">Thumbnail</th>
                <th className="p-2">Speaker Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video, index) => (
                <tr key={video._id} className="border-b text-black border-gray-700">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <Image
                      src={`https://img.youtube.com/vi/${video.youtubeId}/0.jpg`}
                      alt="Thumbnail"
                      width={80}
                      height={60}
                      className="w-20 rounded"
                    />
                  </td>
                  <td className="p-2">{video.title}</td>
                  <td className="p-2 text-sm text-gray-500">
                    {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(video)}
                      className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 text-sm rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(video._id)}
                      className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 text-sm rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {videos.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-400">
                    No videos uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this video?</p>
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
