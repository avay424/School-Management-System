import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (data.success) {
  alert("Registered");
  navigate("/"); 
} else {
  alert(data.message);
}
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">

      <div className="
        bg-white/90 backdrop-blur-lg
        p-4 sm:p-6 md:p-8
        rounded-2xl
        shadow-2xl
        w-[90%] sm:w-[350px]
        flex flex-col gap-3 sm:gap-4
        border border-white/30
      ">

        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        <input
          className="border border-gray-300 px-2 py-2 sm:px-3 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="username"
          onChange={(e)=>setForm({...form, username:e.target.value})}
        />
       

        <input
          className="border border-gray-300 px-2 py-2 sm:px-3 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          type="password"
          placeholder="password"
          onChange={(e)=>setForm({...form, password:e.target.value})}
        />

        <button
          className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition duration-200 shadow-md"
          onClick={handleRegister}
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;