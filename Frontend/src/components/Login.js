import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleLogin = async () => {
  
    const res = await fetch("https://school-management-system-3-kqih.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      alert("Login success");
    } else {
      alert(data.message);
    }
try{
     const payload = JSON.parse(atob(data.token.split(".")[1]));

     if (payload.role === "student") navigate("/student");
     if (payload.role === "teacher") navigate("/teacher");
    if (payload.role === "admin") navigate("/admin");

}catch(err){
  alert("Register first")
}
  




  };


  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">

      <div className="
      bg-white/90 backdrop-blur-lg
      p-5 sm:p-6 md:p-8
      rounded-2xl
      shadow-2xl
      w-[90%] sm:w-[350px]
      flex flex-col gap-4 sm:gap-5
      border border-white/30
    ">

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <input
          className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="Enter username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition duration-200 shadow-md"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm text-right text-indigo-600 cursor-pointer hover:underline">
          Forgot password?
        </p>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline">
            Register
          </span>
        </p>

      </div>
    </div>
  )
};

export default Login;