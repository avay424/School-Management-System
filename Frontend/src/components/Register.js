// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     name: "",
//     email: "",
//     phone: "",
//     address: ""
//   });

//   const handleChange = (field, value) => {
//     const updated = { ...form, [field]: value };
//     setForm(updated);

//     if (!value.trim()) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: `${field} is required`
//       }));
//     } else {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: ""
//       }));
//     }
//   };

//   const handleRegister = async () => {
//     setErrors({});
//     let newErrors = {};

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!form.username.trim()) newErrors.username = "Username is required";

//     if (!form.password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (form.password.length < 5 || form.password.length > 10) {
//       newErrors.password = "Password must be 5-10 characters";
//     }

//     if (!form.name.trim()) newErrors.name = "Name is required";

//     if (!form.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailPattern.test(form.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!form.phone.trim()) {
//       newErrors.phone = "Phone is required";
//     } else if (!/^\d{10}$/.test(form.phone)) {
//       newErrors.phone = "Phone must be 10 digits";
//     }

//     if (!form.address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const res = await fetch("http://localhost:5000/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(form)
//     });

//     const data = await res.json();

//     if (!data.success) {
//       setErrors({ general: data.message });
//       return;
//     }

//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff] px-4">

      
//       <div className="absolute top-0 left-0 w-full h-full 
//         bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.9),transparent_60%)]"></div>

//       <div className="absolute bottom-0 left-0 w-full h-full 
//         bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_60%)]"></div>


//       <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8 text-gray-800">

  
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
//             🎓
//           </div>
//           <h1 className="text-2xl font-semibold mt-4">Create Account</h1>
//           <p className="text-gray-500 text-sm">Join EduCore today</p>
//         </div>
//         <div className="bg-white/70 border border-gray-200 rounded-2xl p-5 space-y-4">

        
//           <div>
//             <label className="text-xs text-gray-600 uppercase">Username</label>
//             <input
//               className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
//                 errors.username ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               placeholder="Enter username"
//               value={form.username}
//               onChange={(e) => handleChange("username", e.target.value)}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-xs mt-1">{errors.username}</p>
//             )}
//           </div>

        
//           <div className="relative">
//             <label className="text-xs text-gray-600 uppercase">Password</label>
//             <input
//               className={`mt-1 w-full px-4 py-2 pr-16 rounded-lg bg-gray-100 border ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               type={showPassword ? "text" : "password"}
//               placeholder="Min. 5 characters"
//               value={form.password}
//               onChange={(e) => handleChange("password", e.target.value)}
//             />

//             <span
//               className="absolute right-3 top-8 text-xs text-gray-500 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>

//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//             )}
//           </div>

      
//           <div>
//             <label className="text-xs text-gray-600 uppercase">Name</label>
//             <input
//               className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               placeholder="Enter name"
//               value={form.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//             )}
//           </div>

      
//           <div>
//             <label className="text-xs text-gray-600 uppercase">Email</label>
//             <input
//               className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               placeholder="Enter email"
//               value={form.email}
//               onChange={(e) => handleChange("email", e.target.value)}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//             )}
//           </div>

      
//           <div>
//             <label className="text-xs text-gray-600 uppercase">Phone</label>
//             <input
//               className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
//                 errors.phone ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               placeholder="Enter phone"
//               value={form.phone}
//               onChange={(e) => handleChange("phone", e.target.value)}
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
//             )}
//           </div>

    
//           <div>
//             <label className="text-xs text-gray-600 uppercase">Address</label>
//             <input
//               className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
//                 errors.address ? "border-red-500" : "border-gray-300"
//               } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               placeholder="Enter address"
//               value={form.address}
//               onChange={(e) => handleChange("address", e.target.value)}
//             />
//             {errors.address && (
//               <p className="text-red-500 text-xs mt-1">{errors.address}</p>
//             )}
//           </div>

      
//           {errors.general && (
//             <p className="text-red-500 text-sm text-center">
//               {errors.general}
//             </p>
//           )}

      
//           <button
//             className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
//             onClick={handleRegister}
//           >
//             Create Account
//           </button>

          
//           <p className="text-sm text-center text-gray-500">
//             Already have an account?{" "}
//             <span
//               className="text-indigo-600 cursor-pointer hover:underline"
//               onClick={() => navigate("/")}
//             >
//               Sign in
//             </span>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    // name: "",
    // email: "",
    // phone: "",
    // address: ""
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
    setErrors({});
    let newErrors = {};

    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.username.trim()) newErrors.username = "Username is required";

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 5 || form.password.length > 10) {
      newErrors.password = "Password must be 5-10 characters";
    }

    // if (!form.name.trim()) newErrors.name = "Name is required";

    // if (!form.email.trim()) {
    //   newErrors.email = "Email is required";
    // } else if (!emailPattern.test(form.email)) {
    //   newErrors.email = "Invalid email format";
    // }

    // if (!form.phone.trim()) {
    //   newErrors.phone = "Phone is required";
    // } else if (!/^\d{10}$/.test(form.phone)) {
    //   newErrors.phone = "Phone must be 10 digits";
    // }

    // if (!form.address.trim()) {
    //   newErrors.address = "Address is required";
    // }

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
   
    if (data.success) {
  alert("Registered successfully");
  navigate("/");
} else {
  alert(data.message);
}


    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#cfe9f6] via-[#e6f4fb] to-[#f8fcff] px-4">

  
      <div className="absolute top-0 left-0 w-full h-full 
        bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.9),transparent_60%)]"></div>

      <div className="absolute bottom-0 left-0 w-full h-full 
        bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_60%)]"></div>

  
      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8 text-gray-800">

      
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
            🎓
          </div>
          <h1 className="text-2xl font-semibold mt-4">Create Account</h1>
          <p className="text-gray-500 text-sm">Join EduCore today</p>
        </div>

  
        <div className="bg-white/70 border border-gray-200 rounded-2xl p-5 space-y-4">

    
          <div>
            <label className="text-xs text-gray-600 uppercase">Username</label>
            <input
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
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
              className={`mt-1 w-full px-4 py-2 pr-16 rounded-lg bg-gray-100 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              type={showPassword ? "text" : "password"}
              placeholder="Min. 5 characters"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />

            <span
              className="absolute right-3 top-8 text-xs text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

    
          {/* <div>
            <label className="text-xs text-gray-600 uppercase">Name</label>
            <input
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

      
          <div>
            <label className="text-xs text-gray-600 uppercase">Email</label>
            <input
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

        
          <div>
            <label className="text-xs text-gray-600 uppercase">Phone</label>
            <input
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

    
          <div>
            <label className="text-xs text-gray-600 uppercase">Address</label>
            <input
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

      
          {errors.general && (
            <p className="text-red-500 text-sm text-center">
              {errors.general}
            </p>
          )} */}

          
          <button
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleRegister}
          >
            Create Account
          </button>

      
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;