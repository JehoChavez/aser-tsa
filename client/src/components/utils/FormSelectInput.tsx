import { ChangeEvent } from "react";
import { FormSelectInputProps } from "../../types/interfaces";

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
  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onSelect) onSelect(event.target.value);
  };

  return (
    <div className="w-full flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        id={id ? id : name}
        className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2"
        onChange={changeHandler}
        disabled={disabled}
        required={required}
        defaultValue={defaultVal}
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
