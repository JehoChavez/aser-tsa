import { FormEvent, useRef } from "react";
import axios from "axios";

const LoginForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const password = passwordRef.current?.value;

    const response = await axios.post("http://localhost:3001/auth/login", {
      password,
    });

    console.log(response);
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
          className="w-full rounded-md p-1 ring-1 ring-inset ring-gray-300 mb-5"
          placeholder="password"
          required
          ref={passwordRef}
        />
        <button className="w-full h-9 bg-blue-950 text-white hover:bg-indigo-950 hover:text-gray-100">
          ACCEDER
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
