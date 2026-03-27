import React, { useState } from 'react'

const UpdateStudent = () => {

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    address: ""

  })

  const updateStudent = async () => {
    if (!form.username || !form.name || !form.email || !form.phone || !form.address) {
      alert("all fields are required")
      return
    }

    const res = await fetch("http://localhost:5000/update-student", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json();
    if (data.success) {
      alert("updated")
    } else {
      alert(data.message)
    }

  }
  return (
    <div>
      <h1>UPDATING STUDENT</h1>
      <div>
        <input
          placeholder='username'
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder='name'
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder='email'
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder='phone'
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder='address'
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>
      <div>
        <button
          onClick={updateStudent}
        >
          UPDATE STUDENT
        </button>
      </div>



    </div>
  )
}

export default UpdateStudent