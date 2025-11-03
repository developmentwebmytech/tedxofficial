export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  coverImage?: string;
  createdAt: string;
}

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    next: { revalidate: 60 }, // ISR for better performance
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function fetchBlogBySlug(slug: string): Promise<Blog> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}
