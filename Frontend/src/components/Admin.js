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

  
  const handleChange = (value) => {
    setUserName(value);

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        username: "username is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        username: "",
      }));
    }
  };

  const handleRoleChange = (value) => {
    setRole(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        role: "role is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        role: "",
      }));
    }
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
      } else {
        setErrors({ general: data.message });
      }

      return;
    }

    alert("Role updated");
    navigate("/");
  };

  return (
  <div className="h-screen overflow-hidden flex flex-col relative  bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff] ">


    {/* BACKGROUND LAYERS */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0
      bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.9),transparent_60%)]" />

    <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0
      bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_60%)]" />

    {/* NAVBAR (MAKE IT TOPMOST) */}
    <div className="relative z-20 flex gap-6 px-6 h-16 items-center 
  bg-blue-500">
      {/* STUDENT */}
      <div className="relative">
        <button
          onClick={() => {
            setShowStudent(!showStudent);
            setShowTeacher(false);
          }}
          className="bg-white/70 backdrop-blur-md text-gray-800 px-5 py-2 rounded-xl shadow-sm hover:bg-white transition duration-200 font-semibold"
        >
          🎓 Student
        </button>

        {showStudent && (
          <div className="absolute z-20 mt-3 w-48 bg-white/90 text-gray-800 rounded-xl shadow-lg border border-gray-200 p-2 flex flex-col gap-1">
            <button onClick={() => navigate("/add-student")} className="text-left px-3 py-2 hover:bg-gray-100 rounded-md">➕ Add Student</button>
            <button onClick={() => navigate("/update-student")} className="text-left px-3 py-2 hover:bg-gray-100 rounded-md">✏️ Update Student</button>
            <button onClick={() => navigate("/view-student")} className="text-left px-3 py-2 hover:bg-gray-100 rounded-md">👁️ View Student</button>
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
          className="bg-white/70 backdrop-blur-md text-gray-800 px-5 py-2 rounded-xl shadow-sm hover:bg-white transition duration-200 font-semibold"
        >
          👨‍🏫 Teacher
        </button>

        {showTeacher && (
          <div className="absolute z-20 mt-3 w-48 bg-white/90 text-gray-800 rounded-xl shadow-lg border border-gray-200 p-2 flex flex-col gap-1">
            <button onClick={() => navigate("/add-teacher")} className="text-left px-3 py-2 hover:bg-gray-100 rounded-md">➕ Add Teacher</button>
            <button onClick={() => navigate("/update-teacher")} className="text-left px-3 py-2 hover:bg-gray-100 rounded-md">✏️ Update Teacher</button>
            <button onClick={() => navigate("/view-teacher")} className="text-left px-3 py-2 hover:bg-gray-100 rounded-md">👁️ View Teacher</button>
          </div>
        )}
      </div>
      <div className="ml-auto">
  <button
    onClick={() => navigate("/")}
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
    </div>

    <div className="relative z-10 flex-1 flex items-center justify-center px-4">

      <div className="w-full max-w-md 
    bg-gradient-to-br from-blue-100 to-blue-200 
      rounded-3xl 
      shadow-[0_20px_60px_rgba(0,0,0,0.15)] 
      p-8 text-gray-800">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Panel
        </h2>

        <div className="space-y-4">

        
          <div>
            <label className="text-xs text-gray-600 uppercase">
              Select Role
            </label>

            <select
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
                errors.role ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              onChange={(e) => handleRoleChange(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            {errors.role && (
              <p className="text-red-500 text-xs mt-1">
                {formatError(errors.role)}
              </p>
            )}
          </div>

      
          <div>
            <input
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter username"
              onChange={(e) => handleChange(e.target.value)}
            />

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {formatError(errors.username)}
              </p>
            )}
          </div>

        
          {errors.general && (
            <p className="text-red-500 text-sm text-center">
              {formatError(errors.general)}
            </p>
          )}

      
          <button
            className="w-full py-2 rounded-lg  bg-indigo-600 hover:bg-indigo-700 text-white hover:opacity-90 transition duration-200 font-medium"
            onClick={changeRole}
          >
            Change Role
          </button>

        </div>

      </div>
    </div>
  </div>
);

};

export default Admin;