import { forwardRef, Ref } from "react";
import { FormTextInputProps } from "../../types/interfaces";

const FormTextInput = forwardRef(
  (
    {
      name,
      label,
      defaultValue,
      disabled,
      required,
      placeholder,
      onChange,
    }: FormTextInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="w-full flex flex-col">
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          name={name}
          id={name}
          className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2 disabled:bg-opacity-80 disabled:border-opacity-80"
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default FormTextInput;
