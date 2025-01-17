import { FormNumberInputProps } from "../../types/interfaces";

const FormNumberInput = ({
  name,
  id,
  label,
  value,
  defaultVal,
  disabled,
  required,
  placeholder,
  center,
  onChange,
}: FormNumberInputProps) => {
  return (
    <div className="w-full flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="number"
        step="0.01"
        name={name}
        id={id ? id : name}
        className={`h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2 disabled:bg-opacity-80 disabled:border-opacity-80 ${
          center ? "text-center" : null
        }`}
        value={value}
        defaultValue={defaultVal}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormNumberInput;
