import { useState, useEffect, useCallback } from "react";
import ClientesOptions from "../components/clientes/ClientesOptions/ClientesOptions";
import ClientesListHeader from "../components/clientes/ClientesListHeader";
import ClientesList from "../components/clientes/ClientesList";
import Loading from "../components/utils/Loading";
import Modal from "../components/utils/Modal";
import IconTitle from "../components/utils/IconTitle";
import { ClienteInterface, ClientesParamsInterface } from "../types/interfaces";
import axios, { AxiosError } from "axios";
import {
  ClientesContext,
  defaultClientesContextValue,
} from "../store/clientes-context";
import { Navigate } from "react-router-dom";
import PageControls from "../components/utils/PageControls";

const Clientes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [clientes, setClientes] = useState<ClienteInterface[]>([]);
  const [count, setCount] = useState<number>(0);

  const [params, setParams] = useState<ClientesParamsInterface>(
    defaultClientesContextValue.params
  );

  const fetchClientes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/clientes", {
        params,
        withCredentials: true,
      });
      setClientes(response.data.content);
      setCount(response.data.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    }
  }, [params]);

  const onSearch = (value: string) => {
    if (value === "") {
      setParams((prev) => {
        return {
          ...prev,
          nombre: undefined,
        };
      });
    } else {
      setParams((prev) => {
        return {
          ...prev,
          nombre: value,
        };
      });
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <ClientesContext.Provider
        value={{
          clientes,
          params,
          fetchClientes,
          onSearch,
          setParams,
        }}
      >
        <div className="w-full h-full px-5 py-4 flex flex-col overflow-hidden">
          <IconTitle
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-people-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
              </svg>
            }
          >
            Clientes
          </IconTitle>
          <ClientesOptions />
          <div className="w-full h-full flex flex-col overflow-hidden">
            <ClientesListHeader />
            {isLoading ? (
              <Modal size="small">
                <Loading />
              </Modal>
            ) : clientes[0] ? (
              <>
                <ClientesList />
              </>
            ) : (
              <h3 className="text-center">No hay clientes</h3>
            )}
          </div>
        </div>
      </ClientesContext.Provider>
      <div className="w-full flex justify-center mb-8">
        <PageControls
          page={params.page || 1}
          count={count}
          limit={params.limit || 10}
          onPageChange={(page) => {
            setParams({ ...params, page });
          }}
          onLimitChange={(limit) => {
            setParams({ ...params, limit });
          }}
        />
      </div>
    </>
  );
};

export default Clientes;
