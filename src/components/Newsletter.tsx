"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-12 px-4 rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Subscribe to our Newsletter
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Get the latest updates, offers, and tips directly in your inbox.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-3 w-full sm:w-96 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md transition disabled:opacity-60"
        >
          <Send size={18} /> Subscribe
        </button>
      </form>

      {status === "success" && (
        <p className="text-green-600 mt-3">✅ Subscription successful!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-3">❌ Something went wrong. Try again.</p>
      )}
    </div>
  );
}
