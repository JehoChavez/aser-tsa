import { useState, useEffect, useCallback } from "react";
import ClientesOptions from "../components/clientes/ClientesOptions";
import ClientesListHeader from "../components/clientes/ClientesListHeader";
import ClientesList from "../components/clientes/ClientesList";
import Loading from "../components/utils/Loading";
import Modal from "../components/utils/Modal";
import { ClienteInterface, ClientesSearchParams } from "../types/interfaces";
import axios from "axios";
import { ClientesContext } from "../store/clientes-context";

const Clientes = () => {
  const [clientes, setClientes] = useState<ClienteInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState<string>();

  const fetchClientes = useCallback(async () => {
    setIsLoading(true);
    const params: ClientesSearchParams = {};
    if (nombre) {
      params.nombre = nombre;
    }
    try {
      const response = await axios.get("http://localhost:3000/api/clientes", {
        params,
        withCredentials: true,
      });
      setClientes(response.data.content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [nombre]);

  const onSearch = (value: string) => {
    setNombre(value);
  };

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        fetchClientes,
        onSearch,
      }}
    >
      <div className="mt-16 w-full h-full px-5 py-4 flex flex-col overflow-hidden">
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
        <ClientesOptions />
        <div className="w-full h-full flex flex-col overflow-hidden">
          {isLoading ? (
            <Modal size="small">
              <Loading />
            </Modal>
          ) : clientes[0] ? (
            <>
              <ClientesListHeader />
              <ClientesList />
            </>
          ) : (
            <h3 className="text-center">No hay clientes</h3>
          )}
        </div>
      </div>
    </ClientesContext.Provider>
  );
};

export default Clientes;
