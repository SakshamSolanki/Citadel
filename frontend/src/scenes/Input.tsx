import React, { useState } from 'react';

const Input = ({ label, onChange } : any) => {
  const [value, setValue] = useState('');

  const handleChange = (event : any) => {
    setValue(event.target.value);
    onChange(event.target.value); // Call the provided onChange function
  };

  return (
    <div className="input-container">
      <label htmlFor="modal-input">{label}</label>
      <input
        id="modal-input"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;