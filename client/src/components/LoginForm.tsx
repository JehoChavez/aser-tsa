import { FormEvent, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const password = passwordRef.current?.value;

    try {
      await axios.post(
        "http://localhost:3000/auth/login",
        {
          password,
        },
        {
          withCredentials: true,
        }
      );

      setIsError(false);
      setIsIncorrect(false);
      setIsLoggedIn(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setIsIncorrect(true);
      } else {
        console.log(error);
        setIsError(true);
      }
    }
  };

  if (isLoggedIn) return <Navigate to="/" replace={true} />;

  return (
    <div className="border border-blue-950 p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-5 border-b-2 p-1">
        Inicia Sesión
      </h2>
      <form
        onSubmit={formSubmitHandler}
        className="flex flex-col items-center justify-center text-lg w-72 px-2"
      >
        <label htmlFor="password" className="w-full text-left mb-1">
          Contraseña
        </label>
        <div className="flex items-center w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className={`w-full rounded-md p-1 ring-1 ring-inset ${
              isIncorrect ? "ring-red-500" : "ring-gray-300"
            }`}
            placeholder="password"
            required
            ref={passwordRef}
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

        <p
          className={`w-full text-sm text-red-500 ${
            isIncorrect ? "block" : "hidden"
          }`}
        >
          Contraseña incorrecta
        </p>
        <button className="my-5 w-full h-9 bg-blue-950 text-white hover:bg-indigo-950 hover:text-gray-100">
          ACCEDER
        </button>
      </form>
      {isError ? (
        <p className="text-sm text-center text-red-500">
          Hubo un error, intenta de nuevo más tarde
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginForm;
