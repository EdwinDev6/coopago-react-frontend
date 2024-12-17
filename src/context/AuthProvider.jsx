import { createContext, useState, useEffect } from "react";
import { checkSession } from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: "" });
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    checkSession().then((resp) => {
      setAuth({user: resp?.user})
      setLoading(false)
    }).catch((resp) => {
      navigate("/login", {replace: true})
    })
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
