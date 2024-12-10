import { useEffect, useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { checkSession } from "../../api";

const PrivateRoute = () => {
  const { auth, loading } = useAuth();
  if(loading){
    return <div>Loading</div>;
  }

  return auth?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
