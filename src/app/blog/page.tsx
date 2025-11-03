"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : data.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-300">
      {/* 🔥 Hero Section with Video */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[450px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center justify-center"></div>
      </div>

      {/* Blog Section */}
      <h1 className="text-center font-bold text-3xl mb-7 sm:text-4xl md:text-5xl mt-6">
        Blog
      </h1>
      <div className="max-w-6xl mx-auto  container ">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available yet.</p>
        ) : (
          <div className="container md:-mx-21 px-4 sm:px-6 lg:px-8 mb-6 bg-gray-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition bg-white flex flex-col"
                >
                  {/* ✅ Responsive Image Wrapper */}
                  {blog.coverImage && (
                    <div className="relative w-full  h-48 sm:h-56 lg:h-64">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     33vw"
                        priority={false}
                      />
                    </div>
                  )}

                  {/* ✅ Content Section */}
                  <div className="p-4 flex flex-col flex-1 ">
                    <h2 className="text-base sm:text-lg font-semibold line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Push "Read More" to bottom for consistent card height */}
                    <div className="mt-auto ">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-block mt-3 text-red-600 font-medium text-sm sm:text-base hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        )}
      </div>
    </div>
  );
}
