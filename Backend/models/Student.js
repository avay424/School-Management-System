import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  phone: String,
  address: String,
});

export default mongoose.model("Student", studentSchema);