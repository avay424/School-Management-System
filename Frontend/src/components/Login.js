import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });


  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

  
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field} is required`
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleLogin = async () => {
    setErrors({});

    let newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!data.success) {
      if (data.message === "password is wrong") {
        setErrors({ password: "Incorrect password" });
      } else if (data.message === "no users found") {
        setErrors({ username: "User not found" });
      } else {
        setErrors({ general: data.message });
      }
      return;
    }

    localStorage.setItem("token", data.token);
    const payload = JSON.parse(atob(data.token.split(".")[1]));

    if (payload.role === "student") {
  navigate(`/student/${payload.username}`);
} else if (payload.role === "teacher") {
  navigate(`/teacher/${payload.username}`); 
} else if (payload.role === "admin") {
  navigate("/admin");
}
  };


return (
 <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-[#dbeafe] to-blue-400 px-4">

  <div className="
    w-full max-w-md
    bg-gradient-to-br from-blue-100 to-blue-200
    rounded-3xl
    shadow-2xl
    p-8
    text-gray-800
  ">

    
    <div className="flex flex-col items-center mb-6">
      <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
        <span className="text-xl text-white">🎓</span>
      </div>
      <h1 className="text-3xl font-bold mt-4 text-gray-800">EduCore</h1>
      <p className="text-gray-500 text-sm">Sign in to your account</p>
    </div>

  
    <div className="bg-white/60 border border-white/50 rounded-2xl p-5 space-y-4">


      <div>
        <label className="text-xs text-gray-600 uppercase">Username</label>
        <input
          className={`mt-1 w-full px-4 py-2 rounded-lg bg-white border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          placeholder="Enter username"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>

      <div className="relative">
        <label className="text-xs text-gray-600 uppercase">Password</label>
        <input
          className={`mt-1 w-full px-4 py-2 pr-16 rounded-lg bg-white border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <span
          className="absolute right-3 top-8 text-xs text-indigo-600 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>


      {errors.general && (
        <p className="text-red-500 text-sm text-center">
          {errors.general}
        </p>
      )}

  
      <button
        onClick={handleLogin}
        className="
          w-full py-2 rounded-lg
          bg-indigo-600 hover:bg-indigo-700
          text-white
          transition duration-200
          font-semibold
          shadow-md
        "
      >
        Sign In
      </button>


      <p 
      onClick={()=>navigate("/forget-password")}
      className="text-xs text-right text-gray-600 cursor-pointer hover:underline">
        Forgot password?
      </p>

      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-indigo-600 cursor-pointer hover:underline"
        >
          Register here
        </span>
      </p>

    </div>

  
    <p className="text-center text-xs text-gray-500 mt-6">
      Each role redirects to its own dashboard after login
    </p>

  </div>
</div>
);
};
export default Login
