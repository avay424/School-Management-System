import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TeacherPage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/teacher/${username}` 
        );

        const result = await res.json();

        console.log("TEACHER DATA:", result);

        setData(result);
      } catch (err) {
        console.log(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchTeacher();
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
        No Teacher Found
      </div>
    );
  }

  return (
    <div className="flex min-h-screen  bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff] text-gray-400 font-sans p-4">
      
      <div className="flex w-full max-w-7xl mx-auto bg-gradient-to-br from-blue-100 to-blue-200 border border-gray-800/40 overflow-hidden shadow-2xl">
        
    
        <aside className="w-72 border-r border-gray-800/50 flex flex-col p-8 space-y-10">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
              👨‍🏫
            </div>
            <div>
              <h1 className="text-black font-bold text-lg">EduCore</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                School Management
              </p>
            </div>
          </div>

          
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl flex items-center gap-4 border border-gray-800">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-black font-black text-xl">
              {data.name?.charAt(0)}
            </div>
            <div>
              <p className="text-black text-sm font-bold">{data.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-black font-bold">
                Teacher
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <p className="text-[10px] uppercase font-bold text-gray-600 mb-4 tracking-[0.2em]">
              Menu
            </p>

            <button className="flex items-center gap-4 w-full p-4 rounded-2xl bg-purple-600/10 text-purple-400 border border-purple-500/20">
              👤 My Profile
            </button>
          </nav>

          <button className="flex items-center gap-3 text-red-500/80 p-3 hover:text-red-500 transition mt-auto font-medium">
            🚪 Sign Out
          </button>
        </aside>

    
        <main className="flex-1 p-12 overflow-y-auto">
          
          <header className="flex justify-center mb-10">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
              Teacher Dashboard — My Profile
            </p>
          </header>

          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">
                My Profile
              </h2>
              <p className="text-gray-500">
                View and update your details
              </p>
            </div>

            <button
              onClick={() => navigate("/update-teacher")} 
              className="bg-[#11131c] text-white border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-800 transition font-bold"
            >
              📝 Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


            <div className="bg-gradient-to-br from-blue-100 to-blue-200 border border-gray-800/50 rounded-[2.5rem] p-10 flex flex-col items-center text-center">
              
              <div className="w-32 h-32 bg-purple-500 rounded-[2rem] flex items-center justify-center text-white text-5xl font-black mb-6">
                {data.name?.charAt(0)}
              </div>

              <h3 className="text-2xl font-bold text-black mb-1">
                {data.name}
              </h3>

              <p className="text-gray-500 mb-4">
                {data.email}
              </p>

              <span className="bg-[#1a1330] text-purple-400 px-6 py-2 rounded-full text-xs font-bold border border-purple-700 mb-10">
                Teacher
              </span>

              <div className="w-full space-y-6 text-left border-t border-gray-800 pt-8">
                <div className="flex items-center gap-4">
                  <span className="text-purple-500 text-xl font-bold">#</span>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Teacher ID
                    </p>
                    <p className="text-black font-bold">
                      {data.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className=" bg-gradient-to-br from-blue-100 to-blue-200 border border-gray-800/50 rounded-[2.5rem] p-10">
              
              <h3 className="text-xl font-bold text-black mb-8">
                Personal Information
              </h3>

              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1">
                    Full Name
                  </p>
                  <p className="text-black">{data.name}</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1">
                    Email
                  </p>
                  <p className="text-black">{data.email}</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1">
                    Phone
                  </p>
                  <p className="text-black">{data.phone}</p>
                </div>

                <div className="col-span-2">
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1">
                    Address
                  </p>
                  <p className="text-black">{data.address}</p>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherPage;
