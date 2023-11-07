import { Navigate, Outlet, useRoutes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterLayout from "./layouts/RegisterLayout";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AppContext } from "./contexts/app.context";
import path from "./constants/path";

function ProtectedRpute() {
    const {isAuthenticated} = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="login" />;
}

function RejectedRpute() {
  const {isAuthenticated} = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="" />;
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      index:true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
    },
    {
      path: "",
      element: <ProtectedRpute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <RejectedRpute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
}
