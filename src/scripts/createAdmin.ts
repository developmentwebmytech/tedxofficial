import { connectDB } from "../lib/mongodb";
import Admin from "../models/Admin";
import dotenv from "dotenv";
dotenv.config();


async function createAdmin() {
  await connectDB();

  const exists = await Admin.findOne({ email: "admin@example.com" });
  if (exists) {
    console.log("Admin already exists!");
    process.exit(0);
  }

  await Admin.create({
    name: "Admin",
    email: "admin@tedxofficial.com",
    password: "secret123", // will be hashed automatically
  });

  console.log("Admin created! Use email: admin@tedxofficial.com and password: secret123 to login.");
  process.exit(0);
}

createAdmin();
