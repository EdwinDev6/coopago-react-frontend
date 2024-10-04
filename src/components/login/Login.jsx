import { useState } from "react";
import { loginUrl } from "../../config";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: user,
          contrasena: password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || "Usuario o Contraseña incorrectos");
        setSuccessMessage("");
        return;
      }

      const userData = result.data;

      // Actualizamos el estado de autenticación con los datos relevantes
      setAuth({
        id: userData.id_usuario,
        user: userData.usuario,
        lastSession: userData.ultima_sesion,
        db: result.database,
      });

      // Guardamos los datos en sessionStorage
      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          id: userData.id_usuario,
          user: userData.usuario,
          lastSession: userData.ultima_sesion,
          db: result.database,
        })
      );

      setSuccessMessage("Inicio de sesión exitoso");
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage("Error del servidor: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <section className="bg-blue-800 bg-opacity-100 min-h-screen flex flex-col items-center justify-center bg-blue-40">
      <article className="max-w-lg p-10 bg-white border border-gray-200 rounded-lg shadow lg:w-[500px]">
        <header className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Daite"
            src="../../src/assets/images/logotipo.png"
            className="mx-auto h-10 w-auto sm:h-12 md:h-20 lg:h-30"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-800">
            Iniciar sesión
          </h2>
        </header>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="user"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="user"
                  name="user"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-3"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-3"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Iniciar Sesión
              </button>
            </div>

            {errorMessage && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium"> {errorMessage} </span>
              </div>
            )}
            {successMessage && (
              <p className="mt-4 text-center text-sm text-green-500">
                {successMessage}
              </p>
            )}
          </form>

          <footer className="mt-10 flex justify-between text-sm text-blue-800">
            <p className="font-bold">2024 ©Daite</p>
            <p className="mx-2">
              Desarrollado Por{" "}
              <a
                href="https://www.daite.com.do/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-blue-600 hover:text-blue-500"
              >
                Daite SRL
              </a>
            </p>
          </footer>
        </div>
      </article>
    </section>
  );
}
