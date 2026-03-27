import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ViewStudents = () => {
  const navigate=useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch("http://localhost:5000/all-students");
      const data = await res.json();

      if (data.success) {
        setStudents(data.students);
      }
    };

    fetchStudents();
  }, []);


  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">All Students</h1>


      <input
        placeholder="Search by name"
        className="border px-3 py-2 mb-4 w-full md:w-1/3"
        onChange={(e) => setSearch(e.target.value)}
      />


      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            onClick={() => navigate(`/students/${student.username}`)}
            className="border p-4 rounded shadow bg-white"
          >
            <h2 className="font-bold">{student.name}</h2>
            <p>Email: {student.email}</p>
            <p>Phone: {student.phone}</p>
            <p>Address: {student.address}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ViewStudents;