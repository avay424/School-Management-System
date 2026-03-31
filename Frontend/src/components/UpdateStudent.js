import React, { useState, } from 'react'
import { useNavigate } from 'react-router';

const UpdateStudent = () => {

const navigate=useNavigate()

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field} is required`
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const updateStudent = async () => {
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

    const res = await fetch("http://localhost:5000/update-student", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert("updated successfully");
    } else {
      alert(data.message);
    }
  };

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
          UPDATE STUDENT
        </h1>

      
        <div className="flex flex-row gap-2 items-center mb-3">
          <h1 className="w-24 font-semibold text-gray-700">Username :</h1>
          <div className="flex-1">
            <input
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
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
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="name"
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
              onChange={(e) => handleChange("email", e.target.value)}
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
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="phone"
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
              onChange={(e) => handleChange("address", e.target.value)}
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

    
        <button
          onClick={updateStudent}
          className="w-full py-2 rounded-lg
          bg-indigo-600 hover:bg-indigo-700
          text-white font-semibold
          shadow-md transition"
        >
          UPDATE STUDENT
        </button>

      </div>
    </div>
  </div>
);

};

export default UpdateStudent;