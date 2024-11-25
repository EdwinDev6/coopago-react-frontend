import React, { useState } from 'react';

export const DynamicForm = ({ formSchema }) => {
  const [formData, setFormData] = useState(
    formSchema.reduce((acc, field) => {
      acc[field.name] = ''; // initialize empty values
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const renderInput = (field) => {
    const InputComponent = field.component;
    return (
      <InputComponent
        key={field.name}
        label={field.label}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {formSchema.map((field) => renderInput(field))}
      <button type="submit">Submit</button>
    </form>
  );
};
