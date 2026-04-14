import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewTeacher= () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTeachers= async () => {
      const res = await fetch("http://localhost:5000/all-teachers");
      const data = await res.json();

      if (data.success) {
        setTeachers(data.teachers);
      }
    };

    fetchTeachers();
  }, []);
const filteredTeachers = teachers.filter((s) =>
  (s?.name || "").toLowerCase().includes((search || "").toLowerCase())
);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff] p-6">
<div className="flex flex-row justify-between">
  
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        All Students
      </h1>
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
    
      
      <input
        placeholder="Search by name"
        className="border border-gray-300 px-4 py-2 mb-6 w-full md:w-1/3 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />

  
      <div className="grid grid-cols-5 bg-blue-600 text-white font-semibold p-3 rounded-t-lg">
        <div>Username</div>
        <div>Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Address</div>
      </div>

      
      <div className="space-y-2">

        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            onClick={() => navigate(`/teacher/${teacher.username}`)}
            className="grid grid-cols-5 bg-white p-3 border border-gray-200 
                       hover:bg-blue-50 hover:shadow-md transition cursor-pointer"
          >
            <div className="font-medium text-gray-700">
              {teacher.username}
            </div>

            <div className="text-gray-800">
              {teacher.name}
            </div>

            <div className="text-gray-600">
              {teacher.email}
            </div>

            <div className="text-gray-600">
              {teacher.phone}
            </div>

            <div className="text-gray-600">
              {teacher.address}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ViewTeacher;