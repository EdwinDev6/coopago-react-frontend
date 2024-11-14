import { useState } from "react";

export const EmailInput = ({ label, name, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleInputChange = (e) => {
    setLocalValue(e.target.value);
    onChange(e); // update parent state
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="email"
        name={name}
        value={localValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
