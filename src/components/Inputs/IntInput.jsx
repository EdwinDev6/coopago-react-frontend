import React from "react";

export const TextInput = React.memo(({ label, name, value, onChange }) => {
  return (
    <div className="mb-2">
      <label className="block mb-1 text-sm font-medium text-gray-900 " htmlFor={name}>{label}</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});
