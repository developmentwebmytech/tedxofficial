import { notFound } from "next/navigation";
import Image from "next/image";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const data = await res.json();
  if (!data.success || !data.blog) notFound();

  const blog = data.blog;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔴 Hero Section */}
      <div className="bg-red-600 text-white py-8 px-4 sm:py-12 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm opacity-80">TEDx Thaltej Youth</p>
          <h1 className="text-xl sm:text-3xl font-bold mt-2">{blog.title}</h1>
          <p className="text-sm sm:text-base text-white/90 mt-2">
            {blog.excerpt}
          </p>
        </div>
      </div>

      {/* 📄 Blog Content Card */}
      <div className=" px-4 sm:px-6 mt-6 md:mx-25 sm:mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
          {/* ✅ Responsive Cover Image */}
          {/* ✅ Responsive Cover Image */}
          <div className="relative w-full h-56 sm:h-80 md:h-[600px] mb-4 sm:mb-6">
            <Image
              src={blog.coverImage || "/speak.jpg"}
              alt={blog.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>


          {/* ✅ Blog Content */}
          <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed">
            <p className="whitespace-pre-line">{blog.content}</p>
          </div>
        </div>

        {/* ✍️ Author + Date */}
        <div className="bg-white rounded-xl shadow-md mt-6 sm:mt-10 mb-6 p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
            T
          </div>
          <div>
            <p className="font-medium text-sm sm:text-base">
              Written by TEDx Thaltej Youth
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
