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
      navigate("/teacher");
    } else if (payload.role === "admin") {
      navigate("/admin");
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

        {/* USERNAME */}
        <div>
          <input
            className={`border px-3 py-2 rounded-lg w-full ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <input
            className={`border px-3 py-2 rounded-lg w-full pr-16 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <span
            className="absolute right-3 top-2.5 text-sm text-indigo-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* GENERAL ERROR */}
        {errors.general && (
          <p className="text-red-500 text-sm text-center">
            {errors.general}
          </p>
        )}

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
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;