import { ChangeEvent } from "react";
import { FormSelectInputProps } from "../../types/interfaces";
import { useState } from "react";

const FormSelectInput = ({
  name,
  id,
  label,
  options,
  onSelect,
  disabled,
  required,
  defaultVal,
}: FormSelectInputProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultVal);

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    if (onSelect) onSelect(event.target.value);
  };

  return (
    <div className="w-full flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={id ? id : name}
        className={`h-8 p-1 bg-neutral-100 text-black border-gray-400 rounded focus:ring-blue-400 focus:ring-2 ${
          disabled && "cursor-not-allowed"
        }`}
        onChange={changeHandler}
        disabled={disabled}
        required={required}
        value={selectedValue}
      >
        {options.map((option) => {
          if (option.selected) {
            return (
              <option value={option.value} selected key={option.value}>
                {option.name}
              </option>
            );
          } else {
            return (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default FormSelectInput;
