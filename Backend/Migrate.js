import mongoose from "mongoose";
import pool from "./db.js"; 

import User from "./models/User.js";
import Student from "./models/Student.js";
import Teacher from "./models/Teacher.js";

const MONGO_URL="mongodb://127.0.0.1:27017/schoolDB"

async function migrate() {
  try {
    
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");

    const users = await pool.query("SELECT * FROM users");

    for (let u of users.rows) {
      const exists = await User.findOne({ username: u.username });

      if (!exists) {
        await User.create({
          username: u.username,
          password: u.password,
          role:u.role && u.role.trim() !== "" ? u.role : "student"
        });
      }
    }

    console.log(" Users migrated");

  
    const students = await pool.query("SELECT * FROM studentss");

    for (let s of students.rows) {
      const exists = await Student.findOne({ username: s.username });

      if (!exists) {
        await Student.create({
          username: s.username,
          name: s.name,
          email: s.email,
          phone: s.phone,
          address: s.address
        });
      }
    }

    console.log("Students migrated");

    
    const teachers = await pool.query("SELECT * FROM teachers");

    for (let t of teachers.rows) {
      const exists = await Teacher.findOne({ username: t.username });

      if (!exists) {
        await Teacher.create({
          username: t.username,
          name: t.name,
          email: t.email,
          phone: t.phone,
          address: t.address
        });
      }
    }

    console.log(" Teachers migrated");

    console.log(" FULL MIGRATION DONE SUCCESSFULLY");

    process.exit();

  } catch (err) {
    console.error(" Migration Error:", err);
    process.exit(1);
  }
}

migrate();