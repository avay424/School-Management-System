import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentPage = () => {
  const navigate=useNavigate()
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
  <div className="flex min-h-screen  bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff] text-gray-400 font-sans p-4">

    <div className="flex w-full max-w-7xl mx-auto  bg-gradient-to-br from-blue-100 to-blue-200 rounded-[2.5rem] border border-gray-800/40 overflow-hidden shadow-2xl">
      
  
      <aside className="w-72 border-r border-gray-800/50 flex flex-col p-8 space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
            🎓
          </div>
          <div>
            <h1 className="text-black font-bold text-lg leading-tight">EduCore</h1>
            <p className="text-[10px] text-black uppercase tracking-widest">School Management</p>
          </div>
        </div>

        
        <div className=" bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl flex items-center gap-4 border border-gray-800">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-xl">
            {data.name?.charAt(0)}
          </div>
          <div>
            <p className="text-black text-sm font-bold">{data.name}</p>
            <p className="text-[10px] uppercase tracking-wider text-black font-bold">Student</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="text-[10px] uppercase font-bold text-gray-600 mb-4 tracking-[0.2em]">Menu</p>
          <button className="flex items-center gap-4 w-full p-4 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
             <span className="text-lg text-black">👤</span> My Profile
          </button>
        </nav>

        <button
        onClick={()=>navigate("/")}
         className="flex items-center gap-3 text-red-500/80 p-3 hover:text-red-500 transition mt-auto font-medium">
          <span>🚪</span> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-center mb-10">
           <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] flex items-center gap-2">
             <span className="opacity-50">③</span> Student Dashboard — My Profile
           </p>
        </header>

        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-bold text-black mb-2">My Profile</h2>
            <p className="text-gray-500">View and update your personal details</p>
          </div>
          <button  onClick={()=>navigate("/update-student")}          className="bg-[#11131c] text-white border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-800 transition font-bold flex items-center gap-2">
            📝 Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
      
          <div className=" bg-gradient-to-br from-blue-100 to-blue-200 border border-gray-800/50 rounded-[2.5rem] p-10 flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white text-5xl font-black mb-6 shadow-lg shadow-emerald-500/10">
              {data.name?.charAt(0)}
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">{data.name}</h3>
            <p className="text-gray-500 mb-4">{data.email}</p>
            <span className="bg-[#0c241f] text-[#4ade80] px-6 py-2 rounded-full text-xs font-bold border border-[#143d34] mb-10">
              Student
            </span>

            <div className="w-full space-y-6 text-left border-t border-gray-800 pt-8">
              <div className="flex items-center gap-4">
                <span className="text-emerald-500 text-xl font-bold">#</span>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Student ID</p>
                  <p className="text-black font-bold">{data.username || "STU847291"}</p>
                </div>
              </div>
              
            </div>
          </div>

          
          <div className=" bg-gradient-to-br from-blue-100 to-blue-200 border border-gray-800/50 rounded-[2.5rem] p-10">
            <h3 className="text-xl font-bold text-black mb-8">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Full Name</p>
                <div className="flex flex-row gap-3">
                <p className="text-black font-medium">{data.name}</p>
                <button 
                onClick={()=>navigate("/update-student")}
                className="font-bold text-grey">Edit</button>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Email</p>
                <div className="flex flex-row gap-3">
                <p className="text-black font-medium truncate">{data.email}</p>
                <button 
                onClick={()=>navigate("/update-student")}
                className="font-bold">Edit</button>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Phone</p>
                <div className="flex flex-row gap-3">
                <p className="text-black font-medium">{data.phone}</p>
                 <button 
                onClick={()=>navigate("/update-student")}
                className="font-bold">Edit</button>
                </div>
              </div>
              
              <div className="col-span-2">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Address</p>
                <div className="flex flex-row gap-3">
                <p className="text-black font-medium leading-relaxed">{data.address}</p>
                 <button 
                onClick={()=>navigate("/update-student")}
                className="font-bold">Edit</button>
                </div>
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