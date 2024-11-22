import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import TableComponent from "../table/Table";
import { executeProcedure } from "../../api/index";

export const RegisterBeneficiary = () => {
  const { auth } = useAuth({});
  const [beneficiariesData, setBeneficiariesData] = useState([]);

  const fetchBeneficiariesData = async () => {
    try {
      const schema = "dbo";
      const data = await executeProcedure("p_traer_beneficiarios", schema);
      setBeneficiariesData(
        Array.isArray(data.result.recordset) ? data.result.recordset : []
      );
      console.log("Beneficiaries data:", data.result.recordset);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBeneficiariesData();
  }, []);

  return (
    <div className="flex-col min-h-screen flex justify-center items-center relative">
      <div className="w-full absolute top-10">
        <h1 className="text-mainTableColor font-bold text-3xl">
          Beneficiarios
        </h1>
        <TableComponent data={beneficiariesData} search={true} />
      </div>
    </div>
  );
};
