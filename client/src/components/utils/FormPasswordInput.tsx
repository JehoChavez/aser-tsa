import { forwardRef, Ref } from "react";
import { useState } from "react";
import { FormPasswordProps } from "../../types/interfaces";

const FormPasswordInput = forwardRef(
  (
    { name, id, label, errorMessage, autoComplete }: FormPasswordProps,
    ref?: Ref<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="w-full flex flex-col items-center">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="flex items-center justify-center w-full">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            autoComplete={autoComplete}
            id={id ? id : name}
            ref={ref}
            required
            className="h-8 p-1 bg-neutral-100 border-gray-400 rounded focus:ring-blue-400 focus:ring-2 disabled:bg-opacity-80 disabled:border-opacity-80"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye ml-2 cursor-pointer"
            viewBox="0 0 16 16"
            onClick={togglePasswordVisibility}
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
        </div>
        {errorMessage && (
          <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
        )}
      </div>
    );
  }
);
export default FormPasswordInput;
