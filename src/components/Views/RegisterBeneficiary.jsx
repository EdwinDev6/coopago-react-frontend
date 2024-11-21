import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import TableComponent from "../table/Table";
import { executeProcedure } from "../../api/index";

export const RegisterBeneficiary = () => {
  const { auth } = useAuth({});
  const [beneficiariesData, setBeneficiariesData] = useState([]);

  const fetchBeneficiariesData = async () => {
    try {
      const schema = "AppCooperativa"; 
      const data = await executeProcedure("p_traer_menu", schema);
      setBeneficiariesData(Array.isArray(data.result.recordset) ? data.result.recordset : []);
      console.log("Beneficiaries data:", data.result.recordset);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBeneficiariesData();
  }, []);

  return (
    <div className="flex-col min-h-screen p-4 bg-neutral-100 flex justify-center items-center">
      <div className="w-full sm:w-2/3 md:max-w-3xl ">
        <TableComponent data={beneficiariesData} search={true} />
      </div>
    </div>
  );
};
