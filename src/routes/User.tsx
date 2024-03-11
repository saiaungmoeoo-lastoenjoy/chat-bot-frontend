import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home";

const User = () => {
  return useRoutes([
    {
      path: "/",
      children: [{ path: "", element: <Home /> }],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
};

export default User;
