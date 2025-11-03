'use client';

import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

type PolicyDocument = {
  _id: string;
  title: string;
  fileUrl: string;
};

export default function PolicyDocumentsPage() {
  const [documents, setDocuments] = useState<PolicyDocument[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch('/api/policydocuments');
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] w-full bg-contain bg-center flex bg-no-repeat items-center justify-center"
        style={{ backgroundImage: 'url(/book.jpg)' }}
      >
        <div className="absolute inset-0 bg-red-500/50" />
        <div className="relative z-10 max-w-4xl px-4 sm:px-6 text-center">
          <TypeAnimation
            sequence={[
              'Policy Documents',
              1000,
              '',
              500,
              'Policy Documents',
            ]}
            wrapper="h1"
            cursor={true}
            repeat={Infinity}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 font-sans"
          />
        </div>
      </div>

      {/* Documents Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-20 py-10 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-gray-800">
          Available Documents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-red-600 flex-shrink-0" size={22} />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                  {doc.title}
                </h3>
              </div>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs sm:text-sm mt-2 text-white bg-red-600 px-4 py-2 rounded hover:bg-black transition"
              >
                View PDF
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
