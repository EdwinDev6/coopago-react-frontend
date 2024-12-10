import { useState } from "react";
import { executeProcedure } from "../api/index";

const Modal = ({
  row,
  columns,
  onClose,
  onUpdate,
  programa,
  tabla,
  campos,
  id,procedure,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(row);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSave = async () => {
    try {
      const procedureName = `p_registrar_${procedure}`;


      const procedureParams = Object.entries(formData).reduce(
        (params, [key, value]) => {
          if (key) {
            params[key] = value;
          }
          return params;
        },
        {}
      );

      // evitando el bug de que el renglón sea un array y el procedimiento no lo acepte
      if (Array.isArray(procedureParams.renglon)) {
        procedureParams.renglon = procedureParams.renglon[0];
      }

      await executeProcedure(procedureName, procedureParams);

      setSuccessMessage("Beneficiario guardado exitosamente.");
      setIsSuccessOpen(true);
      onUpdate();
    } catch (error) {
      console.error("Error al guardar el beneficiario:", error);
      setError(
        "Error al guardar el beneficiario. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleDelete = async () => {
    try {
      const procedureName = "p_registrar_eliminacion";
      const schema = "CoopPagos";
      const valor = row[id];

      const procedureParams = {
        programa: programa,
        json: JSON.stringify({
          tabla: tabla,
          campos: campos,
          valores: valor,
        }),
      };
      await executeProcedure(procedureName, procedureParams, schema);

      setSuccessMessage("Registro eliminado exitosamente.");
      setIsSuccessOpen(true);
    } catch (error) {
      console.error("Error ejecutando el procedimiento:", error);
      setError("Error eliminando el registro.");
    }
  };

  const getColumnHeader = (key) => {
    const column = columns.find((col) => col.accessor === key);
    return column ? column.Header : key;
  };

  const closeAllModals = () => {
    setIsConfirmationOpen(false);
    setIsSuccessOpen(false);
    setError("");
    onClose();
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <>
      {/* Modal principal */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-md w-96">
          <h2 className="text-lg font-semibold">Editar o Eliminar</h2>
          <div className="mt-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="block text-sm font-medium">
                  {getColumnHeader(key)}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsConfirmationOpen(true)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Eliminar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Guardar
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h3 className="text-lg font-semibold text-center">
              ¿Estás seguro de que quieres eliminar este registro?
            </h3>
            <p className="text-sm text-center text-gray-600 mt-2">
              Esta acción es irreversible.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setIsConfirmationOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {isSuccessOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-green-500 text-white p-6 rounded shadow-md w-80 text-center">
            <h3 className="text-lg font-semibold mb-2">¡Éxito!</h3>
            <p>{successMessage}</p>
            <button
              onClick={() => {
                setIsSuccessOpen(false);
                closeAllModals();
              }}
              className="mt-4 px-4 py-2 bg-white text-green-500 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de error */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-red-500 text-white p-6 rounded shadow-md w-80 text-center">
            <h3 className="text-lg font-semibold mb-2">¡Error!</h3>
            <p>{error}</p>
            <button
              onClick={() => setError("")}
              className="mt-4 px-4 py-2 bg-white text-red-500 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
