import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewStudent= () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen  bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff] p-6">
<div className="flex flex-row justify-between">
      {/* TITLE */}
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

        {filteredStudents.map((student) => (
          <div
            key={student.id}
            onClick={() => navigate(`/student/${student.username}`)}
            className="grid grid-cols-5 bg-white p-3 border border-gray-200 
                       hover:bg-blue-50 hover:shadow-md transition cursor-pointer"
          >
            <div className="font-medium text-gray-700 ">
              {student.username}
            </div>

            <div className="text-gray-800">
              {student.name}
            </div>

            <div className="text-gray-600">
              {student.email}
            </div>

            <div className="text-gray-600">
              {student.phone}
            </div>

            <div className="text-gray-600">
              {student.address}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ViewStudent;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ViewStudent = () => {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const res = await fetch("http://localhost:5000/all-students");
//       const data = await res.json();
//       if (data.success) {
//         setStudents(data.students);
//       }
//     };
//     fetchStudents();
//   }, []);

//   const filteredStudents = students.filter((s) =>
//     s.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-[#090a0f] text-gray-400 font-sans">
      
//       {/* SIDEBAR */}
//       <aside className="w-64 border-r border-gray-800/50 flex flex-col p-6 space-y-8 bg-[#0b0d14]">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
//             🎓
//           </div>
//           <div>
//             <h1 className="text-white font-bold text-lg leading-tight">EduCore</h1>
//             <p className="text-xs text-gray-500">School Management</p>
//           </div>
//         </div>

//         <div className="bg-[#1a1c26] p-4 rounded-2xl flex items-center gap-3 border border-gray-800">
//           <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
//             A
//           </div>
//           <div>
//             <p className="text-white text-sm font-semibold">Admin User</p>
//             <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Administrator</p>
//           </div>
//         </div>

//         <nav className="flex-1 space-y-1">
//           <p className="text-[10px] uppercase font-bold text-gray-600 mb-4 tracking-widest">Menu</p>
//           <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 hover:bg-gray-800/30 transition">
//              <span>⊞</span> Dashboard
//           </button>
//           <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
//              <span>👥</span> Students
//           </button>
//           <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 hover:bg-gray-800/30 transition">
//              <span>📖</span> Teachers
//           </button>
//           <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 hover:bg-gray-800/30 transition">
//              <span>🛡️</span> All Users
//           </button>
//         </nav>

//         <button className="flex items-center gap-3 text-red-500 p-3 hover:bg-red-500/5 rounded-xl transition mt-auto">
//           <span>Logout</span> Sign Out
//         </button>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <header className="flex justify-center mb-8">
//            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
//              ⑤ Admin Dashboard — Students Management (with crud)
//            </p>
//         </header>

//         {/* STAT CARDS */}
//         <div className="grid grid-cols-4 gap-4 mb-8">
//           {[
//             { label: "Total Users", val: "84", icon: "👥", bg: "bg-blue-600/20", txt: "text-blue-500" },
//             { label: "Students", val: students.length || "60", icon: "🎓", bg: "bg-emerald-600/20", txt: "text-emerald-500" },
//             { label: "Teachers", val: "22", icon: "📔", bg: "bg-orange-600/20", txt: "text-orange-500" },
//             { label: "Admins", val: "2", icon: "🛡️", bg: "bg-purple-600/20", txt: "text-purple-500" }
//           ].map((stat, i) => (
//             <div key={i} className="bg-[#11131c] border border-gray-800/50 p-6 rounded-[2rem] relative overflow-hidden">
//                <div className={`${stat.bg} ${stat.txt} w-10 h-10 rounded-xl flex items-center justify-center mb-6`}>{stat.icon}</div>
//                <div className="text-4xl font-bold text-white mb-1">{stat.val}</div>
//                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* STUDENT LIST SECTION */}
//         <div className="flex justify-between items-end mb-6">
//           <div>
//             <h2 className="text-3xl font-bold text-white">Students</h2>
//             <p className="text-sm text-gray-500 mt-1">{filteredStudents.length} enrolled students</p>
//           </div>
//           <button className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-gray-200 transition flex items-center gap-2">
//             <span className="text-xl">+</span> Add Student
//           </button>
//         </div>

//         {/* TABLE CONTAINER */}
//         <div className="bg-[#11131c] border border-gray-800/50 rounded-[2rem] p-4">
          
//           {/* SEARCH BAR */}
//           <div className="relative mb-4 group">
//              <div className="absolute inset-y-0 left-4 flex items-center text-gray-500">🔍</div>
//              <input 
//               type="text" 
//               placeholder="Search students..." 
//               className="w-full bg-[#1c1e29] border border-gray-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-gray-600 transition"
//               onChange={(e) => setSearch(e.target.value)}
//              />
//           </div>

//           {/* TABLE HEADER */}
//           <div className="grid grid-cols-6 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-800/50">
//             <div>Name</div>
//             <div>Student ID</div>
//             <div>Email</div>
//             <div>Grade</div>
//             <div>Guardian</div>
//             <div className="text-right">Actions</div>
//           </div>

//           {/* TABLE ROWS */}
//           <div className="divide-y divide-gray-800/30">
//             {filteredStudents.map((student) => (
//               <div 
//                 key={student.id} 
//                 onClick={() => navigate(`/student/${student.username}`)}
//                 className="grid grid-cols-6 px-4 py-5 items-center hover:bg-gray-800/20 transition cursor-pointer group"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-black">
//                     {student.name.charAt(0)}
//                   </div>
//                   <span className="text-white font-bold group-hover:text-blue-400">{student.name}</span>
//                 </div>
                
//                 <div>
//                   <span className="bg-[#0c241f] text-[#4ade80] px-3 py-1 rounded-lg text-[10px] font-bold border border-[#143d34]">
//                     {student.username || "STU000"}
//                   </span>
//                 </div>

//                 <div className="text-sm text-gray-500">{student.email}</div>
//                 <div className="text-sm text-gray-500 font-bold">10-A</div>
//                 <div className="text-sm text-gray-500 leading-tight">Mr. R. <br/>Doe</div>
                
//                 <div className="flex justify-end gap-2">
//                   <div className="w-10 h-8 rounded-lg border border-gray-800 bg-gray-900/50"></div>
//                   <div className="w-10 h-8 rounded-lg border border-gray-800 bg-gray-900/50"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ViewStudent;