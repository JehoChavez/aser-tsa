import { FormTextInputProps } from "../../types/interfaces";

const FormPhoneInput = ({
  name,
  id,
  label,
  defaultValue,
  disabled,
  required,
  placeholder,
  onChange,
}: FormTextInputProps) => {
  return (
    <div className="w-full flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="tel"
        name={name}
        id={id || name}
        className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2 disabled:bg-opacity-80 disabled:border-opacity-80"
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormPhoneInput;
