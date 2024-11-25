import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ label, options, isActive, toggleDropdown, icon }) => {
  return (
    <div className="relative w-full md:w-auto">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 hover:text-white bg-neutral-800 text-neutral-400 focus:outline-none cursor-pointer rounded-sm font-light hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 hover:font-semibold"
      >
        <span className="text-xl">{icon}</span>
        {label}
        <FaChevronDown
          className={`ml-1 transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`${
          isActive ? "max-h-40" : "max-h-0"
        } transition-all duration-500 ease-in-out overflow-hidden bg-neutral-800 rounded-md shadow-lg`}
      >
        {options.map((option, index) => (
          <Link
            key={index}
            to={option.path}
            className="block px-4 py-2 mt-2 text-neutral-400 hover:bg-neutral-700 hover:text-textHoverColor font-light hover:font-semibold"
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
