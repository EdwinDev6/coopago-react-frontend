import React, { useState } from "react";
import { getFilters } from "../../api";
export const SelectInput = React.memo(
  ({ label, name, value, onChange, filter }) => {
    const [data, setData] = useState([]);
    React.useEffect(() => {
      getFilters(filter).then((res) => {
        console.log(res)
      }).catch((res) => {
      });
    }, []);
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <select
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        ></select>
      </div>
    );
  }
);
