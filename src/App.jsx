import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import About from "./components/about/About";
import Layout from "./components/shared/Layout";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import PrivateRoute from "./components/protectedRoute/PrivatedRoute";
import StoredProcedureView from "./components/dinamic/StoredProcedureView";
import { AuthProvider } from "./context/AuthProvider";
import StoredProceduresList from "./components/dinamic/StoredProceduresList";

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas accesibles solo si inicias sesión */}
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="procedure/:procedureName" element={<StoredProcedureView />} />
          <Route path="procedures" element={<StoredProceduresList />} />
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
