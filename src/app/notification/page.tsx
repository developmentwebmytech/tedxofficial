'use client';

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero2";

interface Notification {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch("/api/notification");
    const data = await res.json();
    setNotifications(data);
  };

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <div className="px-4 sm:px-6 md:px-16 lg:px-24 pb-16 space-y-4 mt-7 max-w-6xl mx-auto">
        {notifications.map((n) => (
          <div
            key={n._id}
            className="border border-gray-200 rounded shadow-sm"
          >
            <button
              onClick={() => toggleOpen(n._id)}
              className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition"
            >
              <span className="text-red-700 font-medium text-base sm:text-lg break-words pr-4">
                {n.title}
              </span>
              {openId === n._id ? (
                <ChevronUp className="w-5 h-5 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 flex-shrink-0" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {openId === n._id && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t text-gray-800 space-y-2">
                    <div
                      className="prose prose-sm sm:prose max-w-full"
                      dangerouslySetInnerHTML={{ __html: n.content }}
                    />
                    <p className="text-sm text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-sm sm:text-base">
            No notifications available.
          </p>
        )}
      </div>
    </div>
  );
}
