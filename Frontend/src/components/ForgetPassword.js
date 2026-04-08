import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const ForgetPassword = () => {

  const navigate= useNavigate()

  const [form, setForm] = useState({
    username: "",
    password: "",
    newpassword: "",
    confirmpassword:""
  })
const [showpassword,setShowPassword]=useState(false)
  const [errors, setErrors] = useState({})

  const handlechange = (field, value) => {
    setForm({ ...form, [field]: value })

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field}is  required`
      }
      ))
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: ""
      }))
    }
  }




  const HandlePassword = async () => {
    console.log("button click")
    setErrors({})

    let newErrors = ({})



    if (!form.username.trim()) {
      newErrors.username = "username is required"
    }

    if (!form.password.trim()) {
      newErrors.password = "password is required"
    }
    if (!form.newpassword.trim()) {
      newErrors.newpassword = "newpassword is required"
    } else if (form.newpassword.length < 5 || form.newpassword.length > 10) {
      newErrors.newpassword = "password must be 5-10 chracterss"
    }
     if (!form.confirmpassword.trim()) {
      newErrors.confirmpassword = "confirmpassword is required"
    } else if (form.confirmpassword.length < 5 || form.confirmpassword.length > 10) {
      newErrors.confirmpassword = "incorrect new password"
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }



    try {
      const response = await fetch("http://localhost:5000/forget-password", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(form)
      });
      console.log("api hiited")

     const data = await response.json();

if (data.success) {
  alert("Password updated successfully");

  setErrors({}); 
  return navigate("/"); 
}

if (data.message === "Incorrect password") {
  setErrors({ password: "Invalid password" });
} else if (data.message === "No user found") {
  setErrors({ username: "User not found" });
} else {
  setErrors({ general: data.message });
}
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
  <div className="h-screen overflow-hidden flex flex-col relative bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff]">


    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0
      bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.9),transparent_60%)]" />

    <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0
      bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_60%)]" />

  
    <div className="relative z-10 h-full flex items-center justify-center px-4">


      <div className="w-full max-w-md 
        bg-gradient-to-br from-blue-100 to-blue-200
        p-8 rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Forget Password
        </h1>

    
        <div className="mb-4">
          <input
            value={form.username}
            placeholder='Enter Username'
            onChange={(e) => handlechange("username", e.target.value)}
            className="w-full px-4 py-2 rounded-lg
            bg-white/80 border border-gray-200
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

    
        <div className="mb-4 relative">
          <input
            value={form.password}
            type={showpassword?"text":"password"}
            placeholder='Current Password'
            onChange={(e) => handlechange("password", e.target.value)}
            className="w-full px-4 py-2 rounded-lg
            bg-white/80 border border-gray-200
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <span
          className="absolute right-5 top-3 text-sm text-indigo-600 cursor-pointer"
          onClick={()=>setShowPassword(!showpassword)}
          >
{showpassword?"Hide":"Show"}
          </span>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

  
        <div className="mb-6 relative">
          <input
            value={form.newpassword}
            type={showpassword?"text":"password"}
            placeholder='New Password'
            onChange={(e) => handlechange("newpassword", e.target.value)}
            className="w-full px-4 py-2 rounded-lg
            bg-white/80 border border-gray-200
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <span
          className='absolute right-5 top-3 text-sm text-indigo-600 cursor-pointer'
          onClick={()=>setShowPassword(!showpassword)}
          >
{showpassword?"Hide":"Show"}
          </span>
          {errors.newpassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newpassword}</p>
          )}
        </div>
         <div className="mb-6 relative">
          <input
            value={form.confirmpassword}
            type={showpassword?"text":"password"}
            placeholder='Confirm Password'
            onChange={(e) => handlechange("confirmpassword", e.target.value)}
            className="w-full px-4 py-2 rounded-lg
            bg-white/80 border border-gray-200
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <span
          className='absolute right-5 top-3 text-sm text-indigo-600 cursor-pointer'
          onClick={()=>setShowPassword(!showpassword)}
          >
{showpassword?"Hide":"Show"}
          </span>
          {errors.confirmpassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmpassword}</p>
          )}
        </div>

  
        <button

          onClick={HandlePassword}
          className="w-full py-2 rounded-lg
          bg-indigo-600 hover:bg-indigo-700
          text-white font-semibold
          shadow-md transition duration-200"
        >
          Update Password
        </button>

      </div>
    </div>
  </div>
);
  
}

export default ForgetPassword