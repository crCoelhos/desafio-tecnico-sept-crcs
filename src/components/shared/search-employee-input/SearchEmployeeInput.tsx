import React from "react";
import "./SearchEmployeeInput.scss";

interface SearchEmployeeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchEmployeeInput: React.FC<SearchEmployeeInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="search-input"
        placeholder={placeholder || "Buscar..."}
      />
    </div>
  );
};

export default SearchEmployeeInput;
