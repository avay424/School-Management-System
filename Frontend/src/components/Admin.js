import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [showStudent, setShowStudent] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("student");

  const changeRole = async () => {
    const res = await fetch("http://localhost:5000/set-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ username, role })
    });

    const data = await res.json();
    if (data.success) {
      alert("role updated")
      navigate("/")
    } else {
      alert(data.message)
    }
  };

  return (
    <div>

      <div className="flex flex-row sm:flex-row gap-6 p-4  bg-gradient-to-r from-blue-600 to-indigo-600">
        <div>
          <button
            onClick={() =>{ setShowStudent(!showStudent);
              setShowTeacher(false)
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow 
                     hover:bg-blue-600"
          >
            Student
          </button>

          {showStudent && (
            <div className="mt-2 flex flex-row bg-blue-100 border rounded-md shadow p-2">
              <button
                onClick={() => navigate("/add-student")}
                className="px-3 py-2 text-left hover:bg-gray-100 rounded"
              >
                Add Student
              </button>

              <button
                onClick={() => navigate("/update-student")}
                className="px-3 py-2 text-middle hover:bg-gray-100 rounded"
              >
                Update Student
              </button>

              <button
                onClick={() => navigate("/view-student")}
                className="px-3 py-2 text-middle hover:bg-gray-100 rounded"
              >
                View Student
              </button>
              
            </div>
          )}
        </div>

        
        <div>
          <button
            onClick={() =>{ setShowTeacher(!showTeacher) ;
              setShowStudent(false)}}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow 
                     hover:bg-green-600"
          >
            Teacher
          </button>

          {showTeacher && (
            <div className="mt-2 flex flex-row bg-blue-100 border rounded-md shadow p-2">
              <button
                onClick={() => navigate("/add-teacher")}
                className="px-3 py-2 text-middle hover:bg-gray-100 rounded"
              >
                Add Teacher
              </button>

              <button
                onClick={() => navigate("/update-teacher")}
                className="px-3 py-2 text-middle hover:bg-gray-100 rounded"
              >
                Update Teacher
              </button>

              <button
                onClick={() => navigate("/view-teacher")}
                className="px-3 py-2 text-middle hover:bg-gray-100 rounded"
              >
                View Teacher
              </button>
            </div>
          )}
        </div>

      </div>
      




      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">

        <div className="
        bg-white/90 backdrop-blur-lg
        p-4 sm:p-6 md:p-8
        rounded-2xl
        shadow-2xl
        w-[90%] sm:w-[350px]
        flex flex-col gap-3 sm:gap-4
        border border-white/30
      ">

          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
            Admin Panel
          </h2>

          <input
            className="border border-gray-300 px-2 py-2 sm:px-3 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />

          <select
            className="border border-gray-300 px-2 py-2 sm:px-3 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          <button
            className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition duration-200 shadow-md"
            onClick={changeRole}
          >
            Change Role
          </button>

        </div>
      </div>
    </div>

  );
};

export default Admin;