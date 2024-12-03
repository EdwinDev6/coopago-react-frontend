const Modal = ({ row, columns, onClose }) => {
  const handleSave = () => {
    // Lógica para guardar cambios
    onClose();
  };

  const handleDelete = () => {
    // Lógica para eliminar
    onClose();
  };

  const getColumnHeader = (key) => {
    const column = columns.find((col) => col.accessor === key);
    return column ? column.Header : key;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold ">Editar o Eliminar</h2>
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
            onClick={handleDelete}
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
  );
};

export default Modal;
