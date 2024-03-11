import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

const User = () => {
  return useRoutes([
    {
      path: "/",
      children: [
        { path: "", element: <Home /> },
        {
          path: "/menu/:id",
          element: <ProductDetail />,
        },
        { path: "/cart", element: <Cart /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
};

export default User;
