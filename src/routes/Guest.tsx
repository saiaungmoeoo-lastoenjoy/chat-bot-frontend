import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const Guest = () => {
  const isUserLoggedIn = !!localStorage.getItem("token");

  return useRoutes([
    {
      path: "/",
      element: isUserLoggedIn ? <Home /> : <Navigate to="login" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);
};

export default Guest;
