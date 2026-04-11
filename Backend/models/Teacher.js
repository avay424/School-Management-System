import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  phone: String,
  address: String,
});

export default mongoose.model("Teacher", teacherSchema);