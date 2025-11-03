
// 'use client';

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import UploadForm from "@/components/UploadForm";

// type ImageItem = {
//   _id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
// };

// export default function AdminGalleryPage() {
//   const [images, setImages] = useState<ImageItem[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

//   const fetchImages = async () => {
//     const res = await fetch("/api/images");
//     const data = await res.json();
//     setImages(data);
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const confirmDelete = (id: string) => {
//     setSelectedImageId(id);
//     setShowModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     if (selectedImageId) {
//       await fetch(`/api/images/${selectedImageId}`, { method: "DELETE" });
//       fetchImages();
//       setShowModal(false);
//       setSelectedImageId(null);
//     }
//   };

//   return (
//     <div className="px-6">

//       <div className="bg-white p-5 rounded-md">
//         <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>

//         <div>
//           <UploadForm onUpload={fetchImages} />
//         </div>
//       </div>

//       <div className="bg-white p-5 mt-3">
//         <h2 className="text-2xl font-bold mb-4">Uploded Gallery</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//           {images.map((img) => (
//             <div key={img._id} className="border p-2 rounded shadow border-gray-200">
//               <Image
//                 src={img.imageUrl}
//                 alt={img.title}
//                 width={200}
//                 height={150}
//                 className="object-cover w-full h-40 rounded-sm"
//               />
//               <div className="p-2 mt-2">
//                 <h3 className="font-semibold">{img.title}</h3>
//                 <p className="text-sm mt-1">{img.description}</p>
//                  <button
//                 className="mt-2 text-red-500 text-sm cursor-pointer"
//                 onClick={() => confirmDelete(img._id)} // ✅ correct function
//               >
//                 Delete
//               </button>
//               </div>

             
//             </div>
//           ))}
//         </div>
//       </div>


//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
//             <p className="mb-6">Are you sure you want to delete this image?</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 onClick={handleDeleteConfirmed}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import UploadForm from "@/components/UploadForm";

type ImageItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 images per page

  const fetchImages = async () => {
    const res = await fetch("/api/images");
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const confirmDelete = (id: string) => {
    setSelectedImageId(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (selectedImageId) {
      await fetch(`/api/images/${selectedImageId}`, { method: "DELETE" });
      fetchImages();
      setShowModal(false);
      setSelectedImageId(null);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = images.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="px-6">
      <div className="bg-white p-5 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
        <UploadForm onUpload={fetchImages} />
      </div>

      <div className="bg-white p-5 mt-3">
        <h2 className="text-2xl font-bold mb-4">Uploaded Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {paginatedImages.map((img) => (
            <div
              key={img._id}
              className="border p-2 rounded shadow border-gray-200"
            >
              <Image
                src={img.imageUrl}
                alt={img.title}
                width={200}
                height={150}
                className="object-cover w-full h-40 rounded-sm"
              />
              <div className="p-2 mt-2">
                <h3 className="font-semibold">{img.title}</h3>
                <p className="text-sm mt-1">{img.description}</p>
                <button
                  className="mt-2 text-red-500 text-sm cursor-pointer"
                  onClick={() => confirmDelete(img._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this image?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
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
