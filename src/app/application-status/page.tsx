// "use client"
// import { useState } from "react"

// export default function ApplicationStatusPage() {
//   const [appId, setAppId] = useState("")
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [details, setDetails] = useState<any>(null) // you can replace `any` with your type
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false) // ✅ added loading state

//   const checkStatus = async () => {
//     if (!appId.trim()) {
//       setError("Please enter an Application ID")
//       return
//     }

//     setError("")
//     setDetails(null)
//     setLoading(true)

//     try {
//       const res = await fetch(`/api/applications/${appId}`)
//       const data = await res.json()

//       if (data.success) {
//         setDetails(data.application)
//       } else {
//         setError("Application not found")
//       }
//     } catch {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex justify-center items-center py-6 md:py-10 bg-gray-50  px-4">
//       <div className="bg-white p-6 md:p-15 rounded-2xl space-y-4 md:space-y-3 shadow-lg w-full max-w-2xl">
//         <h2 className="text-xl md:text-2xl font-bold text-red-600 text-center mb-2">Application Status Page</h2>
//         <p className="text-gray-600 text-center mb-4 md:mb-6 text-sm md:text-base">Enter your Application ID</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 md:mb-6">
//           <input
//             type="text"
//             placeholder="Application ID"
//             value={appId}
//             onChange={(e) => setAppId(e.target.value)}
//             className="w-full px-4 py-3 md:py-2 border border-slate-300 rounded-lg outline-none text-base"
//           />
//           <button
//             onClick={checkStatus}
//             disabled={loading}
//             className="bg-red-600 text-white px-5 py-3 md:py-2 font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-base"
//           >
//             {loading ? "Checking..." : "Check Status"}
//           </button>
//         </div>

//         {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

//         {details && (
//           <div className="mt-4 md:mt-6 p-4 border border-slate-300 rounded-lg bg-gray-50">
//             <p className="mb-2">
//               <strong>ID:</strong> {details.applicationId}
//             </p>
//             <p className="mb-2">
//               <strong>Status:</strong> {details.status}
//             </p>
//             <p>
//               <strong>Message:</strong> {details.message || "—"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"
import { useState } from "react"

export default function ApplicationStatusPage() {
  const [appId, setAppId] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [details, setDetails] = useState<any>(null) // you can replace `any` with your type
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false) // ✅ added loading state

  const checkStatus = async () => {
    if (!appId.trim()) {
      setError("Please enter an Application ID")
      return
    }

    setError("")
    setDetails(null)
    setLoading(true)

    try {
      const res = await fetch(`/api/applications/${appId}`)
      const data = await res.json()

      if (data.success) {
        setDetails(data.application)
      } else {
        setError("Application not found")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
   <div className="flex justify-center items-center py-6 md:py-8 bg-gray-50 min-h-screen px-4">
  <div className="bg-white p-6 md:p-15 rounded-2xl -mt-25 shadow-lg w-full max-w-2xl min-h-[50vh] flex flex-col justify-center">
    <h2 className="text-xl md:text-2xl font-bold text-red-600 text-center mb-2">
      Application Status Page
    </h2>
    <p className="text-gray-600 text-center mb-4 md:mb-6 text-sm md:text-base">
      Enter your Application ID
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 md:mb-6">
      <input
        type="text"
        placeholder="Application ID"
        value={appId}
        onChange={(e) => setAppId(e.target.value)}
        className="w-full px-4 py-3 md:py-2 border border-slate-300 rounded-lg outline-none text-base"
      />
      <button
        onClick={checkStatus}
        disabled={loading}
        className="bg-red-600 text-white px-5 py-3 md:py-2 font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-base"
      >
        {loading ? "Checking..." : "Check Status"}
      </button>
    </div>

    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

    {details && (
      <div className="mt-4 md:mt-6 p-4 border border-slate-300 rounded-lg bg-gray-50">
        <p className="mb-2">
          <strong>ID:</strong> {details.applicationId}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {details.status}
        </p>
        <p>
          <strong>Message:</strong> {details.message || "—"}
        </p>
      </div>
    )}
  </div>
</div>

  )
}
