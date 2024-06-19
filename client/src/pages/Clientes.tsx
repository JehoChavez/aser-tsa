import { useState, useEffect, useCallback } from "react";
import ClientesListHeader from "../components/clientes/ClientesListHeader";
import ClientesList from "../components/clientes/ClientesList";
import { ClienteInterface } from "../types/interfaces";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState<ClienteInterface[]>([]);

  const fetchClientes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/clientes", {
        withCredentials: true,
      });
      setClientes(response.data.content);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  return (
    <div className="mt-16 w-full h-full px-5 py-4 flex flex-col">
      <span className="flex items-center text-blue-950 text-opacity-95">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-people-fill mr-2"
          viewBox="0 0 16 16"
        >
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
        </svg>
        <h1 className="text-3xl">Clientes</h1>
      </span>
      <div id="actions" className="w-full h-1/6"></div>
      <div className="w-full h-full flex flex-col">
        <ClientesListHeader />
        <ClientesList clientes={clientes} />
      </div>
    </div>
  );
};

export default Clientes;
