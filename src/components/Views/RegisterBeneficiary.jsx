import React from "react";
import { useState, useCallback } from "react";
import { SelectInput } from "../Inputs/SelectInput";
import { TextInput } from "../Inputs/TextInput";
export const RegisterBeneficiary = () => {
  const [accountType, setAccountType] = useState("");
  const [idType, setIdType] = useState("")
  const [id, setId] = useState("");
  const [account, setAccount] = useState("");
  const [reference, setReference] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [email, setEmail] = useState("");

  const handleAccountTypeChange = useCallback((event) => {}, [accountType]);
  const handleIdTypeChange = useCallback((event) => {}, []);
  const handleIdChange = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const handleAccountChange = useCallback((event) => {}, []);

  const handleReferenceChange = useCallback((event) => {
    setReference(event.target.value);
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventByDefault();
    console.log("Form data", {
      accountType,
      id,
      account,
      reference,
      beneficiary,
      email,
    });
  });
  return (
    <form className="max-w-sm mx-auto my-auto" onSubmit={handleSubmit}>
      <SelectInput
        label="Tipo de cuenta"
        name="tipocuenta"
        value={accountType}
        selected="ELIGE EL TIPO DE CUENTA"
        onChange={handleAccountTypeChange}
      />
      <SelectInput
        label="Tipo de identificacion"
        name="tipoidentificacion"
        value={idType}
        selected="ELIGE EL TIPO DE IDENTIFICACION"
        onChange={handleIdTypeChange}
      />
      <TextInput
        label="Identificacion"
        name="identificacion"
        value={id}
        onChange={handleIdChange}
        max={14}
      />

      <SelectInput
        label="Cuenta"
        name="cuenta"
        value={account}
        selected="ELIGE LA CUENTA"
        onChange={handleAccountChange}
      />

      <TextInput
        label="Referencia *"
        name="referencia"
        value={reference}
        onChange={handleReferenceChange}
      />

      <TextInput
        label="Beneficiario"
        name="beneficiario"
        value={beneficiary}
        onChange={handleIdChange}
        disabled={true}
      />

      <TextInput
        label="Correo"
        name="correo"
        value={email}
        onChange={handleEmailChange}
      />

      <button
        className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="submit"
      >
        Guardar
      </button>
    </form>
  );
};
