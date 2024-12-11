import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export const Loading = () => {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds > 10) {
      navigate("/login");
    }
  }, [seconds]);

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen min-w-full container flex items-center justify-center text-gray-800 dark:text-white">
      <div className=" items-center text-center justify-center align-middle px-6 py-12">
        <div className="place-self-center">
          <AiOutlineLoading3Quarters className="animate-spin text-7xl" />
        </div>
        <h1 className="mt-4 text-xl">Cargando</h1>
        {seconds > 4 ? (
          <span>
            Si estás atascado haz clic
            <Link className="text-blue-600" to="/login">
              aquí
            </Link>
          </span>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};
