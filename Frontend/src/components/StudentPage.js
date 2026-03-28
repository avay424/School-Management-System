import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentPage = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/student/${username}`
        );

        const result = await res.json();

        console.log("DATA FROM API:", result);

        setData(result);
      } catch (err) {
        console.log(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchStudent();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center">
        No Student Found
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="bg-white p-6 shadow rounded w-[300px]">
        <h1 className="font-bold mb-2">Name: {data.name}</h1>
        <h1>Email: {data.email}</h1>
        <h1>Phone: {data.phone}</h1>
        <h1>Address: {data.address}</h1>
      </div>
    </div>
  );
};

export default StudentPage;