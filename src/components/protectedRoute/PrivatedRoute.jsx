import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loading } from "../Loading/Loading";
const PrivateRoute = () => {
  const { auth, loading } = useAuth();
  if(loading){
    return <Loading />
  }

  return auth?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
