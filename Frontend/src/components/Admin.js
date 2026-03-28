import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const [showStudent, setShowStudent] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);

  const [username, setUserName] = useState("");
  const [role, setRole] = useState("student");

  const [errors, setErrors] = useState({});

  const formatError = (msg) => {
    if (!msg) return "";
    return msg.charAt(0).toUpperCase() + msg.slice(1);
  };

  const changeRole = async () => {
    setErrors({});

    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = "username is required";
    }

    if (!role) {
      newErrors.role = "role is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await fetch("http://localhost:5000/set-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ username, role })
    });

    const data = await res.json();

    if (!data.success) {
      const msg = data.message?.toLowerCase();

      if (msg.includes("no user") || msg.includes("not found")) {
        setErrors({ username: "No user found" });
      } 
      else {
        setErrors({ general: data.message });
      }

      return;
    }

    
    alert("Role updated");
    navigate("/");
  };

  return (
    <div>

      {/* TOP MENU */}
      <div className="flex gap-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600">

        {/* STUDENT */}
        <div className="relative">
          <button
            onClick={() => {
              setShowStudent(!showStudent);
              setShowTeacher(false);
            }}
            className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-xl shadow-lg 
                       hover:bg-white/30 hover:scale-105 transition duration-200 font-semibold"
          >
            🎓 Student
          </button>

          {showStudent && (
            <div className="absolute mt-3 w-48 bg-white rounded-xl shadow-xl border p-2 flex flex-col gap-1">

              <button onClick={() => navigate("/add-student")} className="text-left px-3 py-2 hover:bg-blue-50">
                ➕ Add Student
              </button>

              <button onClick={() => navigate("/update-student")} className="text-left px-3 py-2 hover:bg-blue-50">
                ✏️ Update Student
              </button>

              <button onClick={() => navigate("/view-student")} className="text-left px-3 py-2 hover:bg-blue-50">
                👁️ View Student
              </button>

            </div>
          )}
        </div>

        {/* TEACHER */}
        <div className="relative">
          <button
            onClick={() => {
              setShowTeacher(!showTeacher);
              setShowStudent(false);
            }}
            className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-xl shadow-lg 
                       hover:bg-white/30 hover:scale-105 transition duration-200 font-semibold"
          >
            👨‍🏫 Teacher
          </button>

          {showTeacher && (
            <div className="absolute mt-3 w-48 bg-white rounded-xl shadow-xl border p-2 flex flex-col gap-1">

              <button onClick={() => navigate("/add-teacher")} className="text-left px-3 py-2 hover:bg-green-50">
                ➕ Add Teacher
              </button>

              <button onClick={() => navigate("/update-teacher")} className="text-left px-3 py-2 hover:bg-green-50">
                ✏️ Update Teacher
              </button>

              <button onClick={() => navigate("/view-teacher")} className="text-left px-3 py-2 hover:bg-green-50">
                👁️ View Teacher
              </button>

            </div>
          )}
        </div>

      </div>

      {/* FORM */}
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

          {/* Username */}
          <div>
            <input
              className={`border px-3 py-2 rounded-lg w-full ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />

            {errors.username && (
              <p className="text-red-600 text-sm mt-1 bg-red-50 px-2 py-1 rounded-md border border-red-200">
                {formatError(errors.username)}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <select
              className={`border px-3 py-2 rounded-lg w-full ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            {errors.role && (
              <p className="text-red-600 text-sm mt-1 bg-red-50 px-2 py-1 rounded-md border border-red-200">
                {formatError(errors.role)}
              </p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-600 text-sm text-center bg-red-50 px-3 py-2 rounded-md border border-red-200">
              {formatError(errors.general)}
            </p>
          )}

          <button
            className="bg-indigo-600 text-white py-2 rounded-lg font-semibold 
                       hover:bg-indigo-700 hover:scale-105 active:scale-95 
                       transition duration-200 shadow-md"
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