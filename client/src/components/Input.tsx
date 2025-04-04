import React from 'react';

interface InputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
}

function Input({ type, placeholder, value, onChange, className, name }: InputProps) {
  return (
    <div className={`mb-3`}>
      {/* <label className="form-label">{label}</label> */}
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
}

export default Input;
