import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../src/models/Product.js";
import User from "../src/models/User.js";
import fs from "fs";
import connectDB from "../src/config/db.js";

dotenv.config();

const run = async () => {
  await connectDB();
  const data = JSON.parse(
    fs.readFileSync(new URL("./products.json", import.meta.url))
  );
  await Product.deleteMany({});
  await User.deleteMany({});
  await Product.insertMany(data);
  // Create an admin user
  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: "admin123",
    isAdmin: true,
  });
  console.log("Seeded products and admin user");
  process.exit(0);
};

run();
