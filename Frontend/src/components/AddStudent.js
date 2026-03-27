import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
  const navigate=useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleChange = async (e) => {
    
    e.preventDefault();
    if (!form.username || !form.name || !form.email || !form.phone || !form.address) {
      alert("All Fields Are Required")
        return 
    }
  
    const res = await fetch("http://localhost:5000/add-student", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(form)
    }
    )

    const data = await res.json();
    if (data.success) {
      alert("student added")
      navigate("/admin")
    }else {
      alert(data.message)
    }

  }









  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 px-4'>

      <div className='border bg-white p-6 rounded-xl shadow-lg w-full sm:w-[80%] md:w-[50%] lg:w-[30%]'>

        <h1 className='text-center font-bold text-xl mb-5 text-gray-700'>
          STUDENT INFORMATION
        </h1>

        <div className='flex flex-row gap-2 items-center mb-3'>
          <h1
            className='w-24 font-bold text-gray-600'>Username :</h1>
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder='username'
            className='flex-1 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <div className='flex flex-row gap-2 items-center mb-3'>
          <h1 className='w-24 font-bold text-gray-600'>Name :</h1>
          <input
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder='Name'
            className='flex-1 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <div className='flex flex-row gap-2 items-center mb-3'>
          <h1 className='w-24 font-bold text-gray-600'>Email :</h1>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder='email'
            className='flex-1 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <div className='flex flex-row gap-2 items-center mb-3'>
          <h1 className='w-24 font-bold text-gray-600'>Phone :</h1>
          <input
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder='number'
            className='flex-1 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <div className='flex flex-row gap-2 items-center mb-4'>
          <h1 className='w-24 font-bold text-gray-600'>Address :</h1>
          <input
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder='address'
            className='flex-1 border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <div className='text-center'>
          <button
            onClick={handleChange}
            className='bg-blue-500 text-white px-6 py-2 rounded-md shadow 
                   hover:bg-blue-600 w-full sm:w-auto'
          >
            Add Student
          </button>
        </div>

      </div>

    </div>
  )
}

export default AddStudent;