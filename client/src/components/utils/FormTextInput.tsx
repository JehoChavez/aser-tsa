import { FormTextInputProps } from "../../types/interfaces";

const FormTextInput = ({ name, label, defaultValue }: FormTextInputProps) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormTextInput;
