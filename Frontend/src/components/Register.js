import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  
  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);

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

  const handleRegister = async () => {
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

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!data.success) {
      setErrors({ general: data.message });
      return;
    }

    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">

      <div className="bg-white/90 p-6 rounded-2xl shadow-2xl w-[350px] flex flex-col gap-4">

        <h2 className="text-2xl font-bold text-center">
          Register
        </h2>

        {/* USERNAME */}
        <div>
          <input
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Username"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">
              {errors.username}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <input
            className="border px-3 py-2 rounded-lg w-full pr-16"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
            <p className="text-red-500 text-sm">
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
          className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          onClick={handleRegister}
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;