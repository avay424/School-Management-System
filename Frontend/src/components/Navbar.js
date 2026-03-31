import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-500 shadow-lg">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">

    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide cursor-pointer transition duration-300 hover:scale-105 hover:text-gray-200">
      Welcome
    </h1>

    {/* <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-6">

      <Link to="/student" className="relative text-white text-sm sm:text-base font-medium px-2 sm:px-3 py-1 transition duration-300 hover:text-yellow-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full">
        Student
      </Link>

      <Link to="/teacher" className="relative text-white text-sm sm:text-base font-medium px-2 sm:px-3 py-1 transition duration-300 hover:text-yellow-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full">
        Teacher
      </Link>

      <Link to="/admin" className="relative text-white text-sm sm:text-base font-medium px-2 sm:px-3 py-1 transition duration-300 hover:text-yellow-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full">
        Admin
      </Link>

     
    </div> */}
  </div>
</nav>
  );
};

export default Navbar;
// import React from 'react'

// const Navbar = () => {
//   return (
//     <div>
//         <h1>navbar</h1>
//     </div>
//   )
// }

// export default Navbar