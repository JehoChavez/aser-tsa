import { useState, useEffect, useCallback } from "react";
import Loading from "../utils/Loading";
import PolizasListHeader from "../polizas/PolizasListHeader";
import PolizasList from "../polizas/PolizasList";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import {
  PolizaInterface,
  PolizasParamsInterface,
} from "../../types/interfaces";
import { defaultPolizasContext } from "../../store/polizas-context";
import { PolizasContext } from "../../store/polizas-context";

const ClientePolizas = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [polizas, setPolizas] = useState<PolizaInterface[]>([]);
  const [params, setParams] = useState<PolizasParamsInterface>({
    ...defaultPolizasContext.params,
    cliente: [id],
  });

  const fetchPolizas = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/polizas", {
        params,
        withCredentials: true,
      });
      setPolizas(response.data.content);
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

  useEffect(() => {
    fetchPolizas();
  }, [fetchPolizas]);

  const onSearch = (value: string) => {
    setParams((prev) => {
      return {
        ...prev,
        noPoliza: value,
      };
    });
  };
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <PolizasContext.Provider
      value={{ polizas, params, fetchPolizas, onSearch }}
    >
      <div className="w-full flex flex-col h-full">
        <PolizasListHeader />
        {isLoading && <Loading />}
        {!isLoading && polizas[0] && <PolizasList />}
      </div>
    </PolizasContext.Provider>
  );
};

export default ClientePolizas;
