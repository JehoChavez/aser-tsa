import { FormSelectInputProps } from "../../types/interfaces";

const FormSelectInput = ({ name, label, options }: FormSelectInputProps) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2"
      >
        {options.map((option) => {
          if (option.selected) {
            return (
              <option value={option.value} selected>
                {option.name}
              </option>
            );
          } else {
            return <option value={option.value}>{option.name}</option>;
          }
        })}
      </select>
    </div>
  );
};

export default FormSelectInput;
