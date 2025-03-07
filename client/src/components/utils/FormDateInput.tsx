import { FormDateInputProps } from "../../types/interfaces";

const FormDateInput = ({
  name,
  id,
  label,
  disabled,
  required,
  value,
  onChange,
}: FormDateInputProps) => {
  let date: string | undefined = undefined;

  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, "0");
  const day = value.getDate().toString().padStart(2, "0");

  date = `${year}-${month}-${day}`;

  return (
    <div className="w-full flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={id ? id : name}
        className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2"
        type="date"
        disabled={disabled}
        required={required}
        value={date}
        onChange={(e) => {
          const [year, month, day] = e.target.value.split("-").map(Number);
          if (onChange) {
            const date = new Date(year, month - 1, day);
            onChange(date, e.target.name);
          }
        }}
      />
    </div>
  );
};

export default FormDateInput;
