import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa6";

const formatColumnTitle = (title) => {
  return title
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const TableToPDF = ({ data, selectedColumns }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const columns = selectedColumns.length
      ? selectedColumns
      : Object.keys(data[0]);
    const formattedColumns = columns.map((col) => formatColumnTitle(col));

    const rows = data.map((row) =>
      columns.map((col) => (row[col] ? row[col].toString() : "N/A"))
    );

    doc.autoTable({
      head: [formattedColumns],
      body: rows,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        minCellHeight: 10,
        overflow: "linebreak",
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        fontSize: 10,
        textColor: [255, 255, 255],
      },
      margin: { top: 20, bottom: 10, left: 15, right: 15 },
      didDrawPage: (data) => {
        const pageNumber = doc.internal.getNumberOfPages();
        doc.text(
          "Página " + pageNumber,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
      showHead: "everyPage",
      pageBreak: "auto",
      tableWidth: "auto",
      startY: 30,
    });

    doc.save("table.pdf");
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="bg-white text-gray-700 px-2 py-1 border border-borderColor focus:outline-none hover:bg-hoverColor hover:text-textHoverColor rounded-r-md text-center flex justify-center items-center gap-1"
    >
      PDF <FaFilePdf />
    </button>
  );
};

export default TableToPDF;
