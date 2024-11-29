import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import TableToExcel from "./Excel";
import TableToPDF from "./Pdf";
import ColumnFilter from "./DinamicFilter";

const TableComponent = ({ data, columns, search }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const rowsPerPage = 50;

  useEffect(() => {
    if (data.length > 0) {
      const initialColumns = columns.map((col) => col.accessor);
      setSelectedColumns(initialColumns);
    } else {
      setSelectedColumns([]);
    }
  }, [data, columns]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      const direction =
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc";
      return { key, direction };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortConfig.direction === "asc"
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString());
  });

  const filteredData = sortedData.filter((row) =>
    selectedColumns.some((col) =>
      row[col]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleColumnToggle = (column) => {
    setSelectedColumns((prevColumns) => {
      const updatedColumns = prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column];

      return updatedColumns;
    });
  };

  const next = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <div className="p-1 flex flex-col items-center text-xs">
      {search && (
        <form
          className="max-w-full mx-auto mb-2 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </form>
      )}

      <div className="overflow-y-auto max-h-[410px] w-full custom-scrollbar relative">
        <table className="w-full text-xs text-left text-gray-700 border border-gray-300">
          <thead className="bg-mainTableColor text-white sticky top-0 z-10">
            <tr>
              {columns.map(
                (col, index) =>
                  selectedColumns.includes(col.accessor) && (
                    <th
                      key={index}
                      className="px-8 py-2 cursor-pointer"
                      onClick={() => handleSort(col.accessor)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="whitespace-nowrap">{col.Header}</span>
                        {sortConfig.key === col.accessor && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? (
                              <FaSortAlphaUp />
                            ) : (
                              <FaSortAlphaDownAlt />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  )
              )}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-zebraPrimary even:bg-zebraColor"
                >
                  {columns.map(
                    (col, colIndex) =>
                      selectedColumns.includes(col.accessor) && (
                        <td
                          key={colIndex}
                          className={`px-8 py-1 border-t`}
                          style={{
                            fontWeight: col.isPrimary ? "bold" : "normal",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="whitespace-nowrap">
                              {row[col.accessor] || "N/A"}
                            </span>
                          </div>
                        </td>
                      )
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-2 py-1 text-center">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="sticky bottom-0 bg-gray-200">
              <td
                colSpan={columns.length}
                className="px-8 py-1 border-t text-left font-semibold text-white bg-mainTableColor"
              >
                Total: {filteredData.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {data.length > 0 && (
        <div className="flex justify-between items-center w-full mt-2">
          <div className="flex items-center gap-0">
            <ColumnFilter
              columns={columns}
              selectedColumns={selectedColumns}
              onColumnToggle={handleColumnToggle}
            />
            <TableToExcel
              data={filteredData}
              selectedColumns={selectedColumns}
            />
            <TableToPDF data={filteredData} selectedColumns={selectedColumns} />
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={prev}
              className="px-3 py-1 text-xs font-semibold text-white bg-gray-600 rounded-md"
            >
              <HiChevronLeft />
            </button>
            <span className="text-xs font-semibold">{`Página ${currentPage} de ${totalPages}`}</span>
            <button
              onClick={next}
              className="px-3 py-1 text-xs font-semibold text-white bg-gray-600 rounded-md"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  search: PropTypes.bool,
};

export default TableComponent;
