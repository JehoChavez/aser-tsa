import { useState, useEffect, useCallback } from "react";
import Loading from "../utils/Loading";
import PolizasListHeader from "../polizas/PolizasListHeader";
import PolizasList from "../polizas/PolizasList";
import PolizasOptions from "../polizas/PolizasOptions/PolizasOptions";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import {
  PolizaInterface,
  PolizasParamsInterface,
} from "../../types/interfaces";
import { defaultPolizasContext } from "../../store/polizas-context";
import { PolizasContext } from "../../store/polizas-context";
import PageControls from "../utils/PageControls";

const ClientePolizas = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [polizas, setPolizas] = useState<PolizaInterface[]>([]);
  const [params, setParams] = useState<PolizasParamsInterface>({
    ...defaultPolizasContext.params,
    estado: ["vigentes", "canceladas", "vencidas", "reexpedidas"],
    cliente: [id],
  });

  const [count, setCount] = useState(0);

  const fetchPolizas = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/polizas", {
        params,
        withCredentials: true,
      });
      setPolizas(response.data.content);
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

  useEffect(() => {
    fetchPolizas();
  }, [fetchPolizas]);

  useEffect(() => {
    setParams((prev) => {
      return { ...prev, cliente: [id] };
    });
  }, [id]);

  const onSearch = (value: string) => {
    if (value === "") {
      setParams((prev) => {
        return {
          ...prev,
          noPoliza: null,
        };
      });
    } else {
      setParams((prev) => {
        return {
          ...prev,
          noPoliza: value,
        };
      });
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <PolizasContext.Provider
        value={{ polizas, params, setParams, fetchPolizas, onSearch }}
      >
        <div className="w-full flex flex-col h-full">
          <PolizasOptions />
          <PolizasListHeader />
          {isLoading && <Loading />}
          {!isLoading && polizas[0] && <PolizasList />}
        </div>
      </PolizasContext.Provider>
      <div className="w-full flex justify-center">
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

export default ClientePolizas;
