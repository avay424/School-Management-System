import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
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

    let newErrors = {};

    Object.keys(form).forEach((key) => {
      if (!form[key] || form[key].trim() === "") {
        newErrors[key] = `${key} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await fetch("http://localhost:5000/add-student", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert("student added");
      navigate("/admin");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gray-100 px-4'>

      <div className='border bg-white p-6 rounded-xl shadow-xl w-full sm:w-[80%] md:w-[50%] lg:w-[30%]'>

        <h1 className='text-center font-bold text-2xl mb-6 text-gray-800'>
          STUDENT INFORMATION
        </h1>

        {/* USERNAME */}
        <div className='flex flex-row gap-2 items-center mb-3'>
          <h1 className='w-24 font-semibold text-gray-700'>Username :</h1>

          <div className='flex-1'>
            <input
              value={form.username}
              onChange={(e) => handleChangeInput("username", e.target.value)}
              placeholder='username'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
        </div>

        {/* NAME */}
        <div className='flex flex-row gap-2 items-center mb-3'>
          <h1 className='w-24 font-semibold text-gray-700'>Name :</h1>

          <div className='flex-1'>
            <input
              value={form.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
              placeholder='Name'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div className='flex flex-row gap-2 items-center mb-3'>
          <h1 className='w-24 font-semibold text-gray-700'>Email :</h1>

          <div className='flex-1'>
            <input
              value={form.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
              placeholder='email'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* PHONE */}
        <div className='flex flex-row gap-2 items-center mb-3'>
          <h1 className='w-24 font-semibold text-gray-700'>Phone :</h1>

          <div className='flex-1'>
            <input
              value={form.phone}
              onChange={(e) => handleChangeInput("phone", e.target.value)}
              placeholder='number'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* ADDRESS */}
        <div className='flex flex-row gap-2 items-center mb-4'>
          <h1 className='w-24 font-semibold text-gray-700'>Address :</h1>

          <div className='flex-1'>
            <input
              value={form.address}
              onChange={(e) => handleChangeInput("address", e.target.value)}
              placeholder='address'
              className='w-full border border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </div>

        {/* BUTTON */}
        <div className='text-center'>
          <button
            onClick={handleChange}
            className='bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg 
                       shadow-md hover:bg-blue-700 transition w-full sm:w-auto'
          >
            Add Student
          </button>
        </div>

      </div>

    </div>
  )
}

export default AddStudent;