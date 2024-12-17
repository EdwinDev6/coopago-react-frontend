import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import About from "./components/about/About";
import Layout from "./components/shared/Layout";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import PrivateRoute from "./components/protectedRoute/PrivatedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { RegisterBeneficiary } from "./components/Views/RegisterBeneficiary";
import { ViewBeneficiary } from "./components/Views/ViewBeneficiary";
import { ViewBeneficiary2 } from "./components/Views/ViewBeneficiary2";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas accesibles solo si inicias sesión */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
              path="RegistrarBeneficiarios"
              element={<RegisterBeneficiary />}
            />
            <Route
              path="consultarBeneficiarios"
              element={<ViewBeneficiary2 />}
            />
          </Route>
        </Route>

        {/* Rutas públicas */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
