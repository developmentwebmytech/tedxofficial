// 'use client';

// import React, { useState } from 'react';

// type DocumentType = {
//     docNumber: string;
//     issuedTo: string;
//     designation: string;
//     issuedBy: string;
//     issuedOn: string;
//     documentType: string;
//     status: string;
//     signedBy: string;
// };

// export default function DocumentVerifierPage() {
//     const [input, setInput] = useState('');
//     const [result, setResult] = useState<DocumentType | null>(null);
//     const [error, setError] = useState('');

//     const handleVerify = async () => {
//         setError('');
//         setResult(null);
//         try {
//             const res = await fetch('/api/verify', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json', // ✅ required
//                 },
//                 body: JSON.stringify({ docNumber: input.trim() }),
//             });


//             if (!res.ok) {
//                 setError('Document not found or error occurred.');
//                 return;
//             }

//             const data = await res.json();
//             setResult(data.document);
//         } catch {
//             setError('Something went wrong.');
//         }
//     };

//     return (
//         <div className="py-6 md:my-25 flex items-center justify-center  text-center px-4">
//             <div className="w-full max-w-xl bg-white shadow-xl p-8 rounded-lg">
//                 <h1 className="text-4xl font-bold text-red-600 mb-6">Document Verifier</h1>
//                 <h2 className="text-xl font-semibold mb-2 text-red-700">TEDxThaltej Youth</h2>
//                 <p className="text-sm mb-6">Document Verification Portal</p>

//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Enter Document Number (e.g., TEDXTY-LOA-01)"
//                     className="w-full px-4 py-2 border rounded mb-4"
//                 />
//                 <button
//                     onClick={handleVerify}
//                     className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded w-full"
//                 >
//                     Verify Document
//                 </button>

//                 {error && <p className="text-red-500 mt-4">{error}</p>}

//                 {result && (
//                     <div className="text-left mt-6 border-t pt-4">
//                         <p><strong>Document Number:</strong> {result.docNumber}</p>
//                         <p><strong>Issued To:</strong> {result.issuedTo}</p>
//                         <p><strong>Designation:</strong> {result.designation}</p>
//                         <p><strong>Issued By:</strong> {result.issuedBy}</p>
//                         <p><strong>Issued On:</strong> {result.issuedOn}</p>
//                         <p><strong>Type of Document:</strong> {result.documentType}</p>
//                         <p><strong>Status:</strong> {result.status}</p>
//                         <p><strong>Verified & Signed By:</strong> {result.signedBy}</p>
//                     </div>
//                 )}

//                 <p className="text-xs text-gray-500 mt-6">
//                     Inspired by the spirit of ideas worth spreading
//                 </p>
//             </div>
//         </div>
//     );
// }
// 'use client';

// import React, { useState } from 'react';

// type DocumentType = {
//     docNumber: string;
//     issuedTo: string;
//     designation: string;
//     issuedBy: string;
//     issuedOn: string;
//     documentType: string;
//     status: string;
//     signedBy: string;
// };

// export default function DocumentVerifierPage() {
//     const [input, setInput] = useState('');
//     const [result, setResult] = useState<DocumentType | null>(null);
//     const [error, setError] = useState('');

//     const handleVerify = async () => {
//         setError('');
//         setResult(null);
//         try {
//             const res = await fetch('/api/verify', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ docNumber: input.trim() }),
//             });

//             if (!res.ok) {
//                 setError('Document not found or error occurred.');
//                 return;
//             }

//             const data = await res.json();
//             setResult(data.document);
//         } catch {
//             setError('Something went wrong.');
//         }
//     };

//     return (
//         <div className="relative py-6 md:my-25 flex items-center justify-center text-center px-4">
//             {/* Decorative Vectors */}
//             <div className="absolute inset-0 -z-10">
//                 {/* Small circles */}
//                 <svg className="absolute top-10 left-10 w-6 h-6 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 24 24">
//                     <circle cx="12" cy="12" r="12" />
//                 </svg>
//                 <svg className="absolute bottom-16 right-12 w-8 h-8 text-red-100 opacity-40" fill="currentColor" viewBox="0 0 24 24">
//                     <circle cx="12" cy="12" r="12" />
//                 </svg>
//                 <svg className="absolute top-1/2 left-20 w-4 h-4 text-red-300 opacity-40" fill="currentColor" viewBox="0 0 24 24">
//                     <circle cx="12" cy="12" r="12" />
//                 </svg>
//                 {/* Star shape */}
//                 <svg className="absolute top-32 right-24 w-5 h-5 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 .587l3.668 7.571 8.332 1.151-6.064 5.728 1.516 8.278L12 18.896l-7.452 4.419 1.516-8.278-6.064-5.728 8.332-1.151z" />
//                 </svg>
//             </div>

//             {/* Main Form */}
//             <div className="w-full max-w-xl bg-white shadow-xl p-8 rounded-lg relative z-10">
//                 <h1 className="text-4xl font-bold text-red-600 mb-6">Document Verifier</h1>
//                 <h2 className="text-xl font-semibold mb-2 text-red-700">TEDxThaltej Youth</h2>
//                 <p className="text-sm mb-6">Document Verification Portal</p>

//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Enter Document Number (e.g., TEDXTY-LOA-01)"
//                     className="w-full px-4 py-2 border rounded mb-4"
//                 />
//                 <button
//                     onClick={handleVerify}
//                     className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded w-full"
//                 >
//                     Verify Document
//                 </button>

//                 {error && <p className="text-red-500 mt-4">{error}</p>}

//                 {result && (
//                     <div className="text-left mt-6 border-t pt-4">
//                         <p><strong>Document Number:</strong> {result.docNumber}</p>
//                         <p><strong>Issued To:</strong> {result.issuedTo}</p>
//                         <p><strong>Designation:</strong> {result.designation}</p>
//                         <p><strong>Issued By:</strong> {result.issuedBy}</p>
//                         <p><strong>Issued On:</strong> {result.issuedOn}</p>
//                         <p><strong>Type of Document:</strong> {result.documentType}</p>
//                         <p><strong>Status:</strong> {result.status}</p>
//                         <p><strong>Verified & Signed By:</strong> {result.signedBy}</p>
//                     </div>
//                 )}

//                 <p className="text-xs text-gray-500 mt-6">
//                     Inspired by the spirit of ideas worth spreading
//                 </p>
//             </div>
//         </div>
//     );
// }
// 'use client';

// import React, { useState } from 'react';

// type DocumentType = {
//     docNumber: string;
//     issuedTo: string;
//     designation: string;
//     issuedBy: string;
//     issuedOn: string;
//     documentType: string;
//     status: string;
//     signedBy: string;
// };

// export default function DocumentVerifierPage() {
//     const [input, setInput] = useState('');
//     const [result, setResult] = useState<DocumentType | null>(null);
//     const [error, setError] = useState('');

//     const handleVerify = async () => {
//         setError('');
//         setResult(null);
//         try {
//             const res = await fetch('/api/verify', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ docNumber: input.trim() }),
//             });

//             if (!res.ok) {
//                 setError('Document not found or error occurred.');
//                 return;
//             }

//             const data = await res.json();
//             setResult(data.document);
//         } catch {
//             setError('Something went wrong.');
//         }
//     };

//     return (
//         <div className="relative py-6 md:my-25 flex items-center justify-center text-center px-4">
//             {/* Decorative Little Vectors */}
//             <div className="absolute inset-0 -z-10">
//                 {[
//                     // positions: [top, left/right, size, color, opacity]
//                     ['top-10 left-10', 'w-4 h-4', 'text-red-200', 'opacity-50'],
//                     ['top-20 right-20', 'w-3 h-3', 'text-red-100', 'opacity-40'],
//                     ['top-40 left-1/3', 'w-5 h-5', 'text-red-300', 'opacity-30'],
//                     ['bottom-20 left-16', 'w-4 h-4', 'text-red-200', 'opacity-40'],
//                     ['bottom-32 right-12', 'w-3 h-3', 'text-red-100', 'opacity-50'],
//                     ['top-1/2 left-24', 'w-2 h-2', 'text-red-200', 'opacity-40'],
//                     ['top-3/4 right-1/4', 'w-4 h-4', 'text-red-300', 'opacity-30'],
//                     ['bottom-10 left-1/3', 'w-5 h-5', 'text-red-100', 'opacity-50'],
//                     ['top-1/4 right-1/3', 'w-3 h-3', 'text-red-200', 'opacity-40'],
//                     ['top-1/3 left-1/4', 'w-2 h-2', 'text-red-300', 'opacity-40'],
//                 ].map(([pos, size, color, opacity], i) => (
//                     <svg
//                         key={i}
//                         className={`absolute ${pos} ${size} ${color} ${opacity}`}
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                     >
//                         <circle cx="12" cy="12" r="12" />
//                     </svg>
//                 ))}

//                 {/* Some star shapes for variation */}
//                 {[
//                     ['top-16 right-24', 'w-4 h-4', 'text-red-200', 'opacity-50'],
//                     ['bottom-16 left-32', 'w-3 h-3', 'text-red-100', 'opacity-40'],
//                 ].map(([pos, size, color, opacity], i) => (
//                     <svg
//                         key={`star-${i}`}
//                         className={`absolute ${pos} ${size} ${color} ${opacity}`}
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                     >
//                         <path d="M12 .587l3.668 7.571 8.332 1.151-6.064 5.728 1.516 8.278L12 18.896l-7.452 4.419 1.516-8.278-6.064-5.728 8.332-1.151z" />
//                     </svg>
//                 ))}
//             </div>

//             {/* Main Form */}
//             <div className="w-full max-w-xl bg-white shadow-xl p-8 rounded-lg relative z-10">
//                 <h1 className="text-4xl font-bold text-red-600 mb-6">Document Verifier</h1>
//                 <h2 className="text-xl font-semibold mb-2 text-red-700">TEDxThaltej Youth</h2>
//                 <p className="text-sm mb-6">Document Verification Portal</p>

//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Enter Document Number (e.g., TEDXTY-LOA-01)"
//                     className="w-full px-4 py-2 border rounded mb-4"
//                 />
//                 <button
//                     onClick={handleVerify}
//                     className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded w-full"
//                 >
//                     Verify Document
//                 </button>

//                 {error && <p className="text-red-500 mt-4">{error}</p>}

//                 {result && (
//                     <div className="text-left mt-6 border-t pt-4">
//                         <p><strong>Document Number:</strong> {result.docNumber}</p>
//                         <p><strong>Issued To:</strong> {result.issuedTo}</p>
//                         <p><strong>Designation:</strong> {result.designation}</p>
//                         <p><strong>Issued By:</strong> {result.issuedBy}</p>
//                         <p><strong>Issued On:</strong> {result.issuedOn}</p>
//                         <p><strong>Type of Document:</strong> {result.documentType}</p>
//                         <p><strong>Status:</strong> {result.status}</p>
//                         <p><strong>Verified & Signed By:</strong> {result.signedBy}</p>
//                     </div>
//                 )}

//                 <p className="text-xs text-gray-500 mt-6">
//                     Inspired by the spirit of ideas worth spreading
//                 </p>
//             </div>
//         </div>
//     );
// }
'use client';

import React, { useState } from 'react';

type DocumentType = {
    docNumber: string;
    issuedTo: string;
    designation: string;
    issuedBy: string;
    issuedOn: string;
    documentType: string;
    status: string;
    signedBy: string;
};

export default function DocumentVerifierPage() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<DocumentType | null>(null);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        setError('');
        setResult(null);
        try {
            const res = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ docNumber: input.trim() }),
            });

            if (!res.ok) {
                setError('Document not found or error occurred.');
                return;
            }

            const data = await res.json();
            setResult(data.document);
        } catch {
            setError('Something went wrong.');
        }
    };

    return (
        <div className="relative py-6 md:my-25 flex items-center justify-center text-center px-4">
            {/* Decorative Big Colorful Circles */}
            <div className="absolute inset-0 -z-10">
                {[
                    ['top-10 left-10', 'w-20 h-20', 'text-red-400', 'opacity-40'],
                    ['top-2 right-20', 'w-24 h-24', 'text-red-400', 'opacity-40'],
                    ['top-1/2 left-1/4', 'w-16 h-16', 'text-red-400', 'opacity-40'],
                    ['bottom-20 right-40', 'w-28 h-28', 'text-red-400', 'opacity-30'],
                    ['top-3/4 left-20', 'w-20 h-20', 'text-red-400', 'opacity-30'],
                    ['bottom-10 left-1/3', 'w-24 h-24', 'text-red-400', 'opacity-40'],
                    ['top-1/3 right-1/3', 'w-20 h-20', 'text-red-400', 'opacity-40'],
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
            <div className="w-full max-w-xl bg-white shadow-xl p-8 rounded-lg relative z-10">
                <h1 className="text-4xl font-bold text-red-600 mb-6">Document Verifier</h1>
                <h2 className="text-xl font-semibold mb-2 text-red-700">TEDxThaltej Youth</h2>
                <p className="text-sm mb-6">Document Verification Portal</p>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter Document Number (e.g., TEDXTY-LOA-01)"
                    className="w-full px-4 py-2 border rounded mb-4"
                />
                <button
                    onClick={handleVerify}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded w-full"
                >
                    Verify Document
                </button>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {result && (
                    <div className="text-left mt-6 border-t pt-4">
                        <p><strong>Document Number:</strong> {result.docNumber}</p>
                        <p><strong>Issued To:</strong> {result.issuedTo}</p>
                        <p><strong>Designation:</strong> {result.designation}</p>
                        <p><strong>Issued By:</strong> {result.issuedBy}</p>
                        <p><strong>Issued On:</strong> {result.issuedOn}</p>
                        <p><strong>Type of Document:</strong> {result.documentType}</p>
                        <p><strong>Status:</strong> {result.status}</p>
                        <p><strong>Verified & Signed By:</strong> {result.signedBy}</p>
                    </div>
                )}

                <p className="text-xs text-gray-500 mt-6">
                    Inspired by the spirit of ideas worth spreading
                </p>
            </div>
        </div>
    );
}
