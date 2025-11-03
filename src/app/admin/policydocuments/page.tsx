// /app/admin/policydocuments/page.tsx
"use client";
import React from "react";
import PolicyDocumentList from "./PolicyDocumentList";

export default function PolicyDocumentsPage() {
  return (
    <main className="px-6 py-2  mx-auto">
      
      <UploadForm />
      <PolicyDocumentList />
    </main>
  );
}

// UploadForm is a Client Component
import { useState } from "react";

function UploadForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      alert("Please provide a title and a file.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const res = await fetch("/api/policydocuments", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setTitle("");
      setFile(null);
      window.location.reload(); // refresh list
    } else {
      alert("Failed to upload");
    }
    setUploading(false);
  };

  return (
    
    <form
      onSubmit={handleSubmit}
      className="mb-8  p-4 rounded shadow-lg space-y-3"
    >
      <h1 className="text-2xl font-bold mb-4">Manage Policy Documents</h1>
      <h2 className="font-semibold">Upload New Document</h2>
      <input
        type="text"
        placeholder="Document Title"
        className="border border-slate-300 p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept=".pdf"
        
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        type="submit"
        disabled={uploading}
        className="bg-red-600 text-white px-4 py-2 -ml-20 rounded hover:bg-black"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
