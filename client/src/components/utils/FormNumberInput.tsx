import { FormNumberInputProps } from "../../types/interfaces";

const FormNumberInput = ({
  name,
  label,
  value,
  disabled,
  required,
  placeholder,
  onChange,
}: FormNumberInputProps) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        name={name}
        id={name}
        className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2 disabled:bg-opacity-80 disabled:border-opacity-80"
        value={value}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormNumberInput;