import React from "react";
import "./input.css";

interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  label?: string;
  err?: string;
  required?: boolean;
}

const MyInput: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  name,
  label,
  err,
  required,
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={name}> {label} </label>
      )}
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
        className={`input__ui ${err ? "input--error" : ""}`}
      />
      {err && <span className="input-error-text">{err}</span>}
    </div>
  );
};

export default MyInput;
