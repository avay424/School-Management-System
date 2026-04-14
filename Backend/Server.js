
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authMiddleware from "./middleware/Auth.js";
import User from "./models/User.js";
import Student from "./models/Student.js";
import Teacher from "./models/Teacher.js";

dotenv.config();
connectDB();

const app=express();
app.use(cors());
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;

app.post("/register",async(req,res)=>{
    const {username,password}=req.body;
    const check =await User.findOne({username})
    
    if(check){
        return res.json({success:false,message:"user already exits"})
    }

    const hashedPassword= await bcrypt.hash(password,10)

    await User.create({
        username:username,
        password:hashedPassword,
        role:"student"
    })
    return res.json({success:true,message:"Registered"})
    

})

app.post("/login",async(req,res)=>{
    const{username,password}=req.body;
    const usercheck=await User.findOne({username});
    if(!usercheck){
        return res.json({success:false,message:"no user found"});
    }
    const match=await bcrypt.compare(password,usercheck.password)
    if(!match){
        return res.json({success:false,message:"password wrong"})
    }
    const token = jwt.sign(
    { username: usercheck.username, role: usercheck.role },
    SECRET
  );

  res.json({ success: true, token });
});

app.post("/add-student", async (req, res) => {
  const { username, name, email, phone, address } = req.body;

  const user = await User.findOne({ username });

  if (!user || user.role !== "student") {
    return res.json({ success: false, message: "Not a student" });
  }

  const check = await Student.findOne({ username });

  if (check) {
    return res.json({ success: false, message: "Already added" });
  }

  await Student.create({ username, name, email, phone, address });

  res.json({ success: true,message:"Student added"});
});
app.post("/add-teacher",async(req,res)=>{
    const { username, name, email, phone, address } = req.body;

    const user=await User.findOne({username});
    if(!user){
        return res.json({success:false,message:"user not found"})
    }
    const check=await User.findOne({username})
    if(!check.role==="teacher"){
        return res.json({success:false,message:"he is not a teacher"})
    }

    await Teacher.create({
        username, name, email, phone, address
    })

    res.json({success:true,message:"Added Succesfully"})

})
app.post("/update-student",async(req,res)=>{
    const {username,name,email,phone,address}=req.body
    const user=await User.findOne({username})
    if(!user){
        return res.json({success:false,message:"no user found"})
    }

     await Student.updateOne(
    { username },
    { name, email, phone, address }
  );

  res.json({ success: true,message:"Updated succesfully" });
})
app.post("/update-teacher",async(req,res)=>{
    const {username,name,email,phone,address}=req.body
    const user=await User.findOne({username})
    if(!user){
        return res.json({success:false,message:"no user found"})
    }

     await Teacher.updateOne(
    { username },
    { name, email, phone, address }
  );

  res.json({ success: true,message:"Updated succesfully" });
})
app.get("/all-students",async(req,res)=>{
    const students=await Student.find()
    return res.json({success:true,students})
})
app.get("/all-teachers",async(req,res)=>{
    const teachers=await Teacher.find()
    return res.json({success:true,teachers})
})
app.post("/set-role", authMiddleware, async (req, res) => {

  const decoded = req.user;

  if (decoded.role !== "admin") {
    return res.json({ success: false, message: "Only admin allowed" });
  }

  const { username, role } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ success: false, message: "register first" });
  }

  user.role = role;
  await user.save();

  res.json({ success: true });
});


app.get("/student/:username", async (req, res) => {
    const { username } = req.params;

    const student = await Student.findOne({ username });

    if (!student) {
        return res.json({ success: false, message: "Student not found" });
    }

    return res.json({ success: true, student });
});
app.get("/teacher/:username",async(req,res)=>{
    const {username}=req.params;
    const teacher= await Teacher.findOne({username});
    if (!teacher) {
        return res.json({ success: false, message: "teacher not found" });
    }

    return res.json({success:true,teacher})
})

app.get("/all-students",async(req,res)=>{
    const students = await Student.find();
    return res.json({success:true,students})
})

app.get("/all-teachers",async(req,res)=>{
    const teachers=await Teacher.find();
    return res.json({success:true,teachers})
})

app.post("/forget-password", async (req, res) => {
  const { username, password, newpassword, confirmpassword } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ success: false, message: "No user found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({ success: false, message: "Wrong password" });
  }

  if (newpassword !== confirmpassword) {
    return res.json({ success: false, message: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(newpassword, 10);

  await User.updateOne(
    { username },
    { $set: { password: hashedPassword } }
  );

  return res.json({
    success: true,
    message: "Password updated successfully"
  });
});













app.listen(PORT, () => {
    console.log("server is running")
});
