import { useState } from "react";
import { executeProcedure } from "../api/index";

const Modal = ({ row, columns, onClose, onUpdate }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    // Lógica para guardar cambios
    onClose();
  };

  const handleDelete = async () => {
    try {
      const procedureName = "p_registrar_eliminacion";
      const schema = "CoopPagos";
      const idBeneficiario = row.id_beneficiario;

      const procedureParams = {
        programa: "beneficiarios",
        json: JSON.stringify({
          tabla: "beneficiarios",
          campos: "id_beneficiario",
          valores: idBeneficiario,
        }),
      };

      await executeProcedure(procedureName, procedureParams, schema);

      setSuccessMessage("Registro eliminado exitosamente.");
      setIsSuccessOpen(true);
    } catch (error) {
      console.error("Error executing procedure:", error);
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
  };

  return (
    <>
      {/* Modal principal */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-md w-96">
          <h2 className="text-lg font-semibold">Editar o Eliminar</h2>
          <div className="mt-4">
            {Object.entries(row).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="block text-sm font-medium">
                  {getColumnHeader(key)}
                </label>
                <input
                  type="text"
                  defaultValue={value}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsConfirmationOpen(true)} // Abre el modal de confirmación
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
              onClick={closeAllModals} // Cierra todos los modales
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
              onClick={() => setError("")} // Cierra el modal de error
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
