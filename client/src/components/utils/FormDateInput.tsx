import { FormDateInputProps } from "../../types/interfaces";

const FormDateInput = ({
  name,
  label,
  disabled,
  required,
  value,
  onChange,
}: FormDateInputProps) => {
  let date: string | undefined = undefined;

  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, "0");
  const day = value.getDate();

  date = `${year}-${month}-${day}`;

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2"
        type="date"
        disabled={disabled}
        required={required}
        value={date}
        onChange={(e) => {
          if (onChange) {
            const date = new Date(e.target.value);
            onChange(date);
          }
        }}
      />
    </div>
  );
};

export default FormDateInput;
