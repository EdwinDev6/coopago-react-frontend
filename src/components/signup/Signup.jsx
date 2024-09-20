import backgroundImage from "../../assets/images/backgroundImage.jpg";

function Signup() {
  return (
    <section
      className="bg-no-repeat bg-cover bg-center min-h-screen flex flex-col items-center justify-center bg-green-40"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow">
        <img
          alt="Daite"
          src="../../src/assets/images/logotipo.png"
          className="mx-auto h-10 w-auto sm:h-12 md:h-20 lg:h-30"
        />
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white pb-4 top-0">
          Registrate con nosotros
        </h1>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tu Correo
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tu contraseña
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Repite la contraseña
            </label>
            <input
              type="password"
              id="repeat-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="flex items-start mb-5"></div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Registrar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;
