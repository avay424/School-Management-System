import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentPage = () => {
  const navigate = useNavigate();
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

        if (result.success) {
          setData(result.student); 
        } else {
          setData(null);
        }

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
    <div className="flex min-h-screen bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff] text-gray-400 font-sans p-4">

      <div className="flex w-full max-w-7xl mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-[2.5rem] border border-gray-800/40 overflow-hidden shadow-2xl">


        <aside className="w-72 border-r border-gray-800/50 flex flex-col p-8 space-y-10">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
              🎓
            </div>
            <div>
              <h1 className="text-black font-bold text-lg">EduCore</h1>
              <p className="text-[10px] text-black uppercase tracking-widest">
                School Management
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl flex items-center gap-4 border border-gray-800">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-xl">
              {data.name?.charAt(0)}
            </div>
            <div>
              <p className="text-black text-sm font-bold">{data.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-black font-bold">
                Student
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <button className="flex items-center gap-4 w-full p-4 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
              👤 My Profile
            </button>
          </nav>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-red-500/80 p-3 mt-auto font-medium"
          >
            🚪 Sign Out
          </button>
        </aside>

        
        <main className="flex-1 p-12">

          <header className="flex justify-center mb-10">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
              Student Dashboard — My Profile
            </p>
          </header>

          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">
                My Profile
              </h2>
              <p className="text-gray-500">
                View and update your personal details
              </p>
            </div>

            <button
              onClick={() => navigate("/update-student")}
              className="bg-[#11131c] text-white px-6 py-3 rounded-xl font-bold"
            >
              📝 Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-10 rounded-[2.5rem] border border-gray-800/50 text-center">

              <div className="w-32 h-32 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white text-5xl font-black mb-6 mx-auto">
                {data.name?.charAt(0)}
              </div>

              <h3 className="text-2xl font-bold text-black">
                {data.name}
              </h3>

              <p className="text-gray-500 mb-4">{data.email}</p>

              <span className="text-green-500 font-bold">
                Student
              </span>

              <div className="mt-8 text-left">
                <p className="text-black font-bold">
                  Username: {data.username}
                </p>
              </div>

            </div>

    
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-10 rounded-[2.5rem] border border-gray-800/50">

              <h3 className="text-xl font-bold text-black mb-8">
                Personal Information
              </h3>

              <div className="space-y-6">

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Full Name
                  </p>
                  <p className="text-black font-medium">{data.name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Email
                  </p>
                  <p className="text-black font-medium">{data.email}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Phone
                  </p>
                  <p className="text-black font-medium">{data.phone}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Address
                  </p>
                  <p className="text-black font-medium">{data.address}</p>
                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default StudentPage;