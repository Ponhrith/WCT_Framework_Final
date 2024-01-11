import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from"./view/Pages/Homepage.js";
import AboutPage from "./view/Pages/AboutPage.js";
import LoginPage from "./view/Pages/LoginPage.js";
import RegisterPage from "./view/Pages/Register.js";
import ReportPage from "./view/Pages/ReportPage.js";
import AdminPage from "./view/Pages/AdminPage.js";
import UserPage from "./view/Pages/UserPage.js";
import AdminPageApprove from "./view/Pages/ReportPageApproval.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    }, 
    {
      path: "/about",
      element: <AboutPage />
    },
    {
      path: "/login", 
      element: <LoginPage />,
    },
     {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/reporting",
      element: <ReportPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
    {
      path: "/user",
      element: <UserPage />,
    },
    {
      path: "/adminApprove",
      element: <AdminPageApprove />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
