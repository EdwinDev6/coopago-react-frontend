export default function Login() {
  return (
    <>
      <section className="bg-blue-600 min-h-screen flex flex-col items-center justify-center bg-blue-40">
        <div className="max-w-lg p-10 bg-white border border-gray-200 rounded-lg shadow">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Daite"
              src="../../src/assets/images/logotipo.png"
              className="mx-auto h-10 w-auto sm:h-12 md:h-20 lg:h-30"
            />

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Iniciar sesion
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Correo electronico
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Correo electronico"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-3"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contraseña
                  </label>
                  <div className="text-sm mx-2">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Olvidaste tu contraseña ?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="Contraseña"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-3"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Iniciar Sesion
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              No Tienes Cuenta?{" "}
              <a
                href="/signup"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Crea Tu cuenta
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
