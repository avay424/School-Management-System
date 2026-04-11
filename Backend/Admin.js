import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const username=process.env.ADMIN_USERNAME

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URL);

    const existingAdmin = await User.findOne({ username });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await User.create({
      username: username,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully");

    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}

createAdmin();