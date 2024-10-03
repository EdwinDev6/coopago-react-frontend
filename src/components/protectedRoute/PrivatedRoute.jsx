import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { auth } = useAuth();

  const isAuthenticated =
    auth?.user || JSON.parse(sessionStorage.getItem("auth"))?.user;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
