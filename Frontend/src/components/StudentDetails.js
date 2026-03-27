import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
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
      } else {
        alert(result.message);
      }
    };

    fetchStudent();
  }, [username]);

  return (
    <div>
      {data ? (
        <div>
          <h1>Name: {data.name}</h1>
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

export default StudentDetails;