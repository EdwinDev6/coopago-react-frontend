import { FaCheck, FaFilter } from "react-icons/fa";
import { useRef, useState } from "react";

const TableFilter = ({ columns, selectedColumns, onToggleColumn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleColumnToggle = (column) => {
    onToggleColumn(column);
  };

  const handleSelectAllToggle = () => {
    setSelectAll((prev) => !prev);
    if (!selectAll) {
      columns.forEach((column) => {
        if (!selectedColumns.includes(column)) {
          onToggleColumn(column);
        }
      });
    } else {
      selectedColumns.forEach((column) => {
        onToggleColumn(column);
      });
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleToggleDropdown}
        onBlur={(e) => {
          if (!dropdownRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
          }
        }}
        className="bg-white text-gray-700 px-2 py-1 focus:outline-none hover:bg-hoverColor flex justify-center items-center border border-borderColor hover:text-textHoverColor rounded-l-md"
      >
        <FaFilter /> Filtrar
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          tabIndex={-1}
          onMouseDown={(e) => e.preventDefault()}
          className="absolute bottom-12 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-2"
        >
          {/* Checkbox para seleccionar/deseleccionar todos */}
          <div className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-100 px-2 rounded">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllToggle}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <span className="text-sm">Todos</span>
          </div>

          <div className="max-h-40 overflow-y-auto">
            {columns.map((column) => (
              <div
                key={column}
                onClick={() => handleColumnToggle(column)}
                className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-100 px-2 rounded"
              >
                {selectedColumns.includes(column) ? (
                  <FaCheck className="text-blue-500" />
                ) : (
                  <span className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center">
                    <FaCheck className="text-gray-300" />
                  </span>
                )}
                <span>
                  {column
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFilter;
