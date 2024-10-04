/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../libs/constants";
import { Link, useLocation } from "react-router-dom";
import logotipo from "../../assets/images/daite.png";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { logoutUrl } from "../../config";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar({ isOpen, closeSidebar }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef();

  const handleLogout = async () => {
    try {
      const response = await fetch(logoutUrl, { method: "POST" });

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }
      setAuth({});
      sessionStorage.removeItem("auth");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={classNames(
        "bg-neutral-900 w-60 p-3 flex flex-col absolute top-0 left-0 h-full transition-transform transform",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
        },
        "md:static md:translate-x-0"
      )}
    >
      <div className="flex items-center gap-2 px-1 py-3">
        <img src={logotipo} alt="Coopago" className="w-10 h-10" />
        <span className="text-neutral-200 text-lg">CooPagos</span>
      </div>

      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} closeSidebar={closeSidebar} />
        ))}
      </div>

      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} closeSidebar={closeSidebar} />
        ))}
        <div
          className={classNames(linkClass, "cursor-pointer text-red-500")}
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link, closeSidebar }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClass
      )}
      onClick={closeSidebar}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
