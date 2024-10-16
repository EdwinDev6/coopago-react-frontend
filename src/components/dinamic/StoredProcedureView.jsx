import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config";
import toast, {Toaster} from "react-hot-toast";

const formatProcedureName = (procedureName) => {
  return procedureName
    .replace(/^p_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatParamName = (paramName) => {
  return paramName
    .replace(/@/, "")
    .replace(/id_/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const StoredProcedureView = () => {
  const { procedureName } = useParams();
  const [params, setParams] = useState([]);
  const [error, setError] = useState(null);
  const formRef = useRef(null); 

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
     toast.success('Procedimiento ejecutado correctamente');
      response.json();
    } catch (error) {
      setError(error.message);
      toast.error('Error al ejecutar el procedimiento');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div><Toaster/></div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {formatProcedureName(procedureName)}
      </h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
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
          <p>No parameters found for this procedure.</p>
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
  );
};

export default StoredProcedureView;
