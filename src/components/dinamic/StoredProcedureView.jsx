import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config";
import toast, { Toaster } from "react-hot-toast";

const StoredProcedureView = () => {
  const { procedureName } = useParams();
  const [params, setParams] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  // Cargar parámetros del procedimiento "registrar"
  useEffect(() => {
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 text-center">
        {formatProcedureName(procedureName)}
      </h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* sección formulario */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Formulario de registro</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          ref={formRef}
        >
          {params.length > 0 ? (
            params.map((param) => (
              <div key={param.PARAMETER_NAME} className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  {formatParamName(param.PARAMETER_NAME)}:
                  <input
                    type="text"
                    name={param.PARAMETER_NAME}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </label>
              </div>
            ))
          ) : (
            <p>No se encontraron parámetros para este procedimiento.</p>
          )}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoredProcedureView;
