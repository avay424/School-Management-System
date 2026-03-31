import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTeacher = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  
  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return `${name} is required`;
    }
    return "";
  };

  const handleChangeInput = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);

    
    const errorMsg = validateField(field, value);

    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg
    }));
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setErrors({})

    let newErrors = {};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(!form.username.trim()){
      newErrors.username="username is required"
    }
    if(!form.name.trim()){
      newErrors.name="name is required"
    }
    if(!form.email.trim()){
      newErrors.email=" email is required"
    }else if(!emailPattern.test(form.email)){
      newErrors.email="Invalid email pattern"
    }
    if(!form.phone.trim()){
      newErrors.phone="phone is required"
    }else if(!/^\d{10}$/.test(form.phone)){
      newErrors.phone="Number should be of 10 characters"
    }
    if(!form.address.trim()){
      newErrors.address="address is required"
    }
    



    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await fetch("http://localhost:5000/add-teacher", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert("teacher added");
      navigate("/admin");
    } else {
      alert(data.message);
    }
  }

  return (
  <div className="h-screen overflow-hidden flex flex-col relative bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff]">
<div className="ml-auto">
  <button
    onClick={() => navigate("/admin")}
    className="px-4 py-2 rounded-lg
    bg-white/80 backdrop-blur-md
    text-gray-800 font-semibold
    border border-white/40
    shadow-sm
    hover:bg-white transition duration-200"
  >
    ⬅ BACK
  </button>
</div>
  
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0
      bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.9),transparent_60%)]" />

    <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0
      bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_60%)]" />


    <div className="relative z-10 h-full flex items-center justify-center px-4">

    
      <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[30%]
       bg-gradient-to-br from-blue-100 to-blue-200 
        p-8 rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

        <h1 className="text-center font-bold text-2xl mb-6 text-gray-800">
          TEACHER INFORMATION
        </h1>

    
        <div className="flex flex-row gap-2 items-center mb-3">
          <h1 className="w-24 font-semibold text-gray-700">Username :</h1>

          <div className="flex-1">
            <input
              value={form.username}
              onChange={(e) => handleChangeInput("username", e.target.value)}
              placeholder="username"
              className="w-full px-3 py-2 rounded-lg
              bg-white/80 border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
        </div>

        
        <div className="flex flex-row gap-2 items-center mb-3">
          <h1 className="w-24 font-semibold text-gray-700">Name :</h1>

          <div className="flex-1">
            <input
              value={form.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
              placeholder="Name"
              className="w-full px-3 py-2 rounded-lg
              bg-white/80 border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        </div>

    
        <div className="flex flex-row gap-2 items-center mb-3">
          <h1 className="w-24 font-semibold text-gray-700">Email :</h1>

          <div className="flex-1">
            <input
              value={form.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
              placeholder="email"
              className="w-full px-3 py-2 rounded-lg
              bg-white/80 border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

      
        <div className="flex flex-row gap-2 items-center mb-3">
          <h1 className="w-24 font-semibold text-gray-700">Phone :</h1>

          <div className="flex-1">
            <input
              value={form.phone}
              onChange={(e) => handleChangeInput("phone", e.target.value)}
              placeholder="number"
              className="w-full px-3 py-2 rounded-lg
              bg-white/80 border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

      
        <div className="flex flex-row gap-2 items-center mb-4">
          <h1 className="w-24 font-semibold text-gray-700">Address :</h1>

          <div className="flex-1">
            <input
              value={form.address}
              onChange={(e) => handleChangeInput("address", e.target.value)}
              placeholder="address"
              className="w-full px-3 py-2 rounded-lg
              bg-white/80 border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </div>

  
        <div className="text-center">
          <button
            onClick={handleChange}
            className="w-full py-2 rounded-lg
            bg-indigo-600 hover:bg-indigo-700
            text-white font-semibold
            shadow-md transition"
          >
            Add teacher
          </button>
        </div>

      </div>

    </div>
  </div>
);
  
}

export default AddTeacher;