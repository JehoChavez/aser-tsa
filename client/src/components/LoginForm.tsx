import { FormEvent, useRef, useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isError, setIsError] = useState(false);

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
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setIsIncorrect(true);
      } else {
        console.log(error);
        setIsError(true);
      }
    }
  };

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
        <input
          type="password"
          name="password"
          id="password"
          className={`w-full rounded-md p-1 ring-1 ring-inset ${
            isIncorrect ? "ring-red-500" : "ring-gray-300"
          }`}
          placeholder="password"
          required
          ref={passwordRef}
        />
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
