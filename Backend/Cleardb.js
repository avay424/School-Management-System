import mongoose from "mongoose";
import dotenv from "dotenv";

import Student from "./models/Student.js";
import Teacher from "./models/Teacher.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

await Student.deleteMany({});
await Teacher.deleteMany({});

console.log("Students & Teachers deleted");

mongoose.disconnect();