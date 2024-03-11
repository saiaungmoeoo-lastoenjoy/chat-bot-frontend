import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const Routes = () => {
  const isUserLoggedIn = !!localStorage.getItem("token");

  return useRoutes([
    {
      path: "/",
      element: isUserLoggedIn ? <Outlet /> : <Navigate to="/login" replace />,
      children: [{ path: "/", element: <Home /> }],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
};

export default Routes;
