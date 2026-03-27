import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentPage = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch("http://localhost:5000/view-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      });

      const result = await res.json();

      if (result.success) {
        setData(result.student);
      }
    };

    fetchStudent();
  }, [username]);

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600">

      {data ? (
        <div className="bg-white p-6 shadow rounded w-[300px]">

          <h1 className="font-bold mb-2">
            Name: {data.name}
          </h1>

          <h1>Email: {data.email}</h1>
          <h1>Phone: {data.phone}</h1>
          <h1>Address: {data.address}</h1>

        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default StudentPage;