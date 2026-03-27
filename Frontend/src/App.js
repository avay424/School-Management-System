import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import Admin from "./components/Admin";
import Error from "./components/Error";
import ProtectedRoute from "./components/ProtectedRoute";

import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import ViewStudent from "./components/ViewStudent";
import AddTeacher from "./components/AddTeacher";
import UpdateTeacher from "./components/UpdateTeacher";
import ViewTeacher from "./components/ViewTeacher";
import StudentPage from "./components/StudentPage";
import StudentDetails from "./components/StudentDetails";


function App() {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
    ]},
      {
        path: "/student",
        element: <ProtectedRoute role="student">
          <Student />
          </ProtectedRoute>
      },
      {
        path: "/teacher",
        element: <ProtectedRoute role="teacher">
          <Teacher />
          </ProtectedRoute>
      },
      {
        path: "/admin",
        element: <ProtectedRoute role="admin">
          <Admin/>
          </ProtectedRoute>
      },
      
      {
        path:"/add-student",
        element:<AddStudent/>
      },
      {
        path:"/view-student",
        element:<ViewStudent/>
      },
      {
        path:"/update-student",
        element:<UpdateStudent/>
      },
      {
        path:"/add-teacher",
        element:<AddTeacher/>
      },
      {
        path:"/update-teacher",
        element:<UpdateTeacher/>
      },
      {
        path:"/view-teacher",
        element:<ViewTeacher/>
      },
    {
      path:"/student/:username",
      element:<StudentPage/>
    },
    {
      path:"/students/:username",
      element:<StudentDetails/>
    },

    
  
]);


// render app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
);