// scripts/fixBlogs.ts
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// Same slug generator you use in your API
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

async function fixBlogs() {
  await connectDB();

  const blogs = await Blog.find();
  console.log(`Found ${blogs.length} blogs`);

  // 1. Remove duplicates based on title
  const seenTitles = new Set<string>();
  for (const blog of blogs) {
    if (seenTitles.has(blog.title)) {
      console.log(`Deleting duplicate: ${blog.title}`);
      await Blog.deleteOne({ _id: blog._id });
    } else {
      seenTitles.add(blog.title);
    }
  }

  // 2. Backfill slugs for blogs without one
  const blogsWithoutSlug = await Blog.find({ slug: { $exists: false } });
  for (const blog of blogsWithoutSlug) {
    const slug = generateSlug(blog.title);
    console.log(`Adding slug "${slug}" to blog: ${blog.title}`);
    blog.slug = slug;
    await blog.save();
  }

  // 3. Add default cover image if missing
  const blogsWithoutImage = await Blog.find({ coverImage: { $in: [null, ""] } });
  for (const blog of blogsWithoutImage) {
    blog.coverImage = "default.jpg"; // Put a real default image in /public/uploads
    console.log(`Adding default cover image to: ${blog.title}`);
    await blog.save();
  }

  console.log("✅ Blog cleanup complete!");
  mongoose.connection.close();
}

fixBlogs().catch((err) => {
  console.error("❌ Error fixing blogs:", err);
  mongoose.connection.close();
});
