import React, { useState } from "react";

export const SelectInput = React.memo(
  ({
    label,
    name,
    value,
    onChange,
    data = [{ value: 0, desc: "" }],
    size = 1,
  }) => {
    let classSize = "";
    switch (size) {
      case 2:
        classSize = "p-3 text-md";
        break;
      case 3:
        classSize = "p-4 text-md";
        break;
      default:
        classSize = "p-2.5 text-sm";
    }
    return (
      <div className="mb-2">
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
        <select
          className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${classSize}`}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        >
          {data.map((item, index) => (
            <option key={index} value={item.value}>
              {item.desc}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
