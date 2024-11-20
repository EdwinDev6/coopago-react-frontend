import React, { useState } from "react";
import { getFilters } from "../../api";
export const SelectInput = React.memo(
  ({ label, name, value, selected, onChange, filter }) => {
    const [data, setData] = useState([]);
    React.useEffect(() => {
      getFilters(filter).then((res) => {
        console.log(res)
      }).catch((res) => {
      });
    }, []);
    return (
      <div>
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option selected>{selected}</option>
        </select>
      </div>
    );
  }
);
