import { createContext, useState, useEffect } from "react";
import { checkSession } from "../api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: "" });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession().then((resp) => {
      setAuth({user: resp?.user})
      setLoading(false)
    }).catch((resp) => {

    })
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
