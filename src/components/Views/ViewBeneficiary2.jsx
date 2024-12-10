import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import TableComponent from "../table/DinamicTable";
import { executeProcedure } from "../../api/index";

export const ViewBeneficiary2 = () => {
  const { auth } = useAuth({});
  const [beneficiariesData, setBeneficiariesData] = useState([]);
  const [columns, setColumns] = useState([]);

  // Fetch de los beneficiarios
  const fetchBeneficiariesData = async () => {
    try {
      const schema = "CoopPagos";
      const data = await executeProcedure("p_traer_beneficiarios", schema);
      setBeneficiariesData(
        Array.isArray(data.data.recordsets[0]) ? data.data.recordsets[0] : []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const refreshTable = async () => {
    await fetchBeneficiariesData();
  };

  // Fetch de los encabezados de la tabla
  const fetchColumns = async () => {
    try {
      const schema = "CoopPagos";
      const dataFilter = await executeProcedure(
        "p_traer_encabezado_consultas",
        { RENGLON: "COOPPAGOS_BENEFICIARIOS" },
        schema
      );

      const columnDefs = dataFilter.data.recordsets[0]
        .filter((col) => col.visible === 1)
        .map((col) => ({
          Header: col.titulo,
          accessor: col.columna,
          align: col.alineacion || "left",
          isPrimary: col.columna_primaria === 1,
          sortable: col.ordenable === 1,
          searchable: col.buscable === 1,
          width: col.ancho || "auto",
        }));

      setColumns(columnDefs);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  useEffect(() => {
    fetchBeneficiariesData();
    fetchColumns();
  }, []);

  return (
    <div className="flex-col min-h-screen flex justify-center items-center relative">
      <div className="w-full absolute top-10">
        <h1 className="text-mainTableColor font-bold text-3xl">
          Beneficiarios
        </h1>
        <TableComponent
          data={beneficiariesData}
          columns={columns}
          search={true}
          onUpdate={refreshTable}
          programa={"beneficiarios"}
          tabla={"beneficiarios"}
          campos={"id_beneficiario"}
          id={"id_beneficiario"}
          procedure={"beneficiario"}
        />
      </div>
    </div>
  );
};
