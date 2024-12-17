import React from "react";
import { Link } from "react-router-dom";
import {
  FaCreditCard,
  FaBuilding,
  FaMoneyBillWave,
  FaRegFileAlt,
  FaSyncAlt,
  FaUserPlus,
  FaSearch,
  FaUsers,
  FaHistory,
} from "react-icons/fa";

export const Home = () => {
  return (
    <div className="bg-primary text-black h-screen flex flex-col justify-start items-center px-4 py-8 sm:py-12 lg:py-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          Simplifica los pagos de nómina de tu empresa con CoopPagos
        </h1>
        <p className="mt-4 text-lg sm:text-xl">
          Una solución web diseñada para gestionar pagos masivos y garantizar la
          tranquilidad de tus empleados.
        </p>
      </div>

      {/* Sección ¿Qué quieres hacer? */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-semibold">¿Que Deseas Hacer Primero?</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Botones con íconos relacionados */}
          <Link to="/estado-cuenta">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaCreditCard /> Estado de Cuentas
            </button>
          </Link>

          <Link to="/institucion-asociada">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaBuilding /> Agregar Cuenta Institución Asociada
            </button>
          </Link>

          <Link to="/pagos">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaMoneyBillWave /> Pago o Transferencia
            </button>
          </Link>

          <Link to="/pago-lote">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaRegFileAlt /> Pago en Lote
            </button>
          </Link>

          <Link to="/pago-recurrente">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaSyncAlt /> Pago Recurrente
            </button>
          </Link>

          <Link to="/RegistrarBeneficiarios">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaUserPlus /> Registrar Beneficiarios
            </button>
          </Link>

          <Link to="/consultarBeneficiarios">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaSearch /> Consultar Beneficiarios
            </button>
          </Link>

          <Link to="/beneficiario-interno">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaUsers /> Beneficiarios Interno
            </button>
          </Link>

          <Link to="/beneficiario-institucion-asociada">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaUsers /> Beneficiario Institución Asociada
            </button>
          </Link>

          <Link to="/historico-pagos">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaHistory /> Histórico de Pagos
            </button>
          </Link>

          <Link to="/historico-pagos-lote">
            <button className="bg-buttonColor text-buttontextColor py-2 px-6 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-hoverButtonColor transition duration-300">
              <FaHistory /> Histórico Pagos en Lote
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
