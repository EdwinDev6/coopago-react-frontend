import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config";
import toast, { Toaster } from "react-hot-toast";

const getQueryProcedureName = (procedureName) => {
  if (procedureName.includes("registrar")) {
    return procedureName.replace("registrar", "traer");
  }
  return procedureName;
};

const formatProcedureName = (procedureName) => {
  return procedureName
    .replace(/^p_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatParamName = (paramName) => {
  return paramName
    .replace(/@/, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const StoredProcedureView = () => {
  const { procedureName } = useParams();
  const [params, setParams] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  // Cargar parámetros del procedimiento "registrar"
  useEffect(() => {
    const fetchProcedureParams = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/getProcedureParams/${procedureName}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching procedure parameters: ${errorText}`);
        }

        const data = await response.json();
        setParams(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProcedureParams();
  }, [procedureName]);

  // Cargar datos de consulta del procedimiento "traer"
  useEffect(() => {
    const fetchQueryData = async () => {
      const queryProcedure = getQueryProcedureName(procedureName);
      try {
        const response = await fetch(`${apiUrl}/ejecutar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            procedureName: queryProcedure,
            params: {},
          }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error executing procedure: ${errorText}`);
        }

        const data = await response.json();
        setQueryData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (procedureName.includes("registrar")) {
      fetchQueryData();
    }
  }, [procedureName]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rawParams = Object.fromEntries(formData);

    const params = {};
    for (const [key, value] of Object.entries(rawParams)) {
      const formattedKey = key.replace(/^@/, "");
      params[formattedKey] = value;
    }

    const requestBody = {
      procedureName,
      params,
    };

    try {
      const response = await fetch(`${apiUrl}/ejecutar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error executing procedure: ${errorText}`);
      }

      if (formRef.current) {
        formRef.current.reset();
      }
      toast.success("Procedimiento ejecutado correctamente");
    } catch (error) {
      setError(error.message);
      toast.error("Error al ejecutar el procedimiento");
    }
  };

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

      {/*  sección tabla*/}
      <div className="mt-6 overflow-x-auto">
        {queryData.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(queryData[0]).map((col) => (
                  <th key={col} className="px-4 py-2 whitespace-nowrap">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {queryData.map((row, index) => (
                <tr
                  key={index}
                  className={`odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700`}
                >
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="px-4 py-2 whitespace-nowrap">
                      {value}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay resultados para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default StoredProcedureView;
