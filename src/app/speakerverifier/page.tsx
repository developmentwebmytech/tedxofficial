// "use client";

// import { useState } from "react";

// export default function SpeakerVerifier() {
//   const [formData, setFormData] = useState({
//     ID: "",
//     name: "",
//     email: "",
//     contact: "",
//   });

//   const [status, setStatus] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleVerify = async () => {
//     setError(null);
//     setStatus(null);

//     if (!formData.ID) {
//       setError("Verifier ID is required.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`/api/verifiers/${formData.ID}`); // GET request

//       const result = await res.json();

//       if (res.ok) {
//         setStatus(result.status || "No status found.");
//         setFormData({
//           ID: formData.ID,
//           name: result.name || "",
//           email: result.email || "",
//           contact: result.contact || "",
//         });
//       }

//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Network error. Please try again.");
//     }

//     setLoading(false);
//   };


//   return (
//     <div className="py-5 md:my-20 flex items-center justify-center  p-4">
//       <div className="bg-white p-8 rounded shadow-xl w-full max-w-lg text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-2">Speaker Verifier</h1>
//         <p className="text-gray-700 mb-4">TEDxThaltej Youth</p>
//         <p className="text-gray-500 mb-6">Enter verifier details</p>

//         {/* Input Fields */}
//         <div className="grid gap-3 mb-4 text-left">
//           <input
//             type="text"
//             name="ID"
//             placeholder="Verifier ID"
//             value={formData.ID}
//             onChange={handleChange}
//             className="w-full border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500
//  rounded p-3"
//           />
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-3"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-3"
//           />
//           <input
//             type="text"
//             name="contact"
//             placeholder="Contact"
//             value={formData.contact}
//             onChange={handleChange}
//             className="w-full border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-3"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleVerify}
//           disabled={loading}
//           className={`w-full bg-red-600 text-white font-semibold py-3 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500 transition"
//             }`}
//         >
//           {loading ? "Submitting..." : "Verify Speaker"}
//         </button>

//         {/* Status/Error */}
//         {error && <p className="text-red-600 mt-4">{error}</p>}
//         {status && (
//           <p className="mt-4 text-lg font-semibold text-green-600">
//             Status: {status}
//           </p>
//         )}

//         <p className="text-xs text-gray-400 mt-6">
//           Inspired by the spirit of ideas worth spreading
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function SpeakerVerifier() {
  const [formData, setFormData] = useState({
    ID: "",
    name: "",
    email: "",
    contact: "",
  });

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async () => {
    setError(null);
    setStatus(null);

    if (!formData.ID) {
      setError("Verifier ID is required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/verifiers/${formData.ID}`);
      const result = await res.json();

      if (res.ok) {
        setStatus(result.status || "No status found.");
        setFormData({
          ID: formData.ID,
          name: result.name || "",
          email: result.email || "",
          contact: result.contact || "",
        });
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative py-5 md:my-20 flex items-center justify-center p-4">
      {/* Vector Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[
          ["top-10 left-10", "w-25 h-25", "text-red-300", "opacity-5"],
          ["top-1/4 right-20", "w-25 h-25", "text-red-300", "opacity-5"],
          ["top-1/2 left-1/4", "w-25 h-25", "text-red-300", "opacity-5"],
          ["bottom-8 right-16", "w-25 h-25", "text-red-300", "opacity-5"],
          ["top-3/4 left-20", "w-25 h-25", "text-red-300", "opacity-5"],
          ["bottom-10 left-1/3", "w-25 h-25", "text-red-300", "opacity-5"],
        ].map(([pos, size, color, opacity], i) => (
          <svg
            key={i}
            className={`absolute ${pos} ${size} ${color} ${opacity}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="12" />
          </svg>
        ))}
      </div>

      {/* Main Form */}
      <div className="bg-white p-8 rounded shadow-xl w-full max-w-lg text-center relative z-10">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Speaker Verifier</h1>
        <p className="text-gray-700 mb-4">TEDxThaltej Youth</p>
        <p className="text-gray-500 mb-6">Enter verifier details</p>

        {/* Input Fields */}
        <div className="grid gap-3 mb-4 text-left">
          <input
            type="text"
            name="ID"
            placeholder="Verifier ID"
            value={formData.ID}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-3"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-3"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-3"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full bg-red-600 text-white font-semibold py-3 rounded ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-500 transition"
          }`}
        >
          {loading ? "Submitting..." : "Verify Speaker"}
        </button>

        {/* Status/Error */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
        {status && (
          <p className="mt-4 text-lg font-semibold text-green-600">
            Status: {status}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-6">
          Inspired by the spirit of ideas worth spreading
        </p>
      </div>
    </div>
  );
}
