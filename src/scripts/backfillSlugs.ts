import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/\s+/g, "-")     // replace spaces with hyphens
    .replace(/--+/g, "-");    // collapse multiple hyphens
}

async function run() {
  try {
    await connectDB();

    const blogsWithoutSlug = await Blog.find({ slug: { $exists: false } });
    console.log(`Found ${blogsWithoutSlug.length} blogs without slug.`);

    for (const blog of blogsWithoutSlug) {
      blog.slug = generateSlug(blog.title);
      await blog.save();
      console.log(`✅ Added slug to: ${blog.title}`);
    }

    console.log("🎉 Slug backfill complete!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error backfilling slugs:", err);
    mongoose.connection.close();
  }
}

run();
