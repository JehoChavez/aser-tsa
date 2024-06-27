import { useState, useEffect } from "react";
import Loading from "../utils/Loading";
import PolizasListHeader from "../polizas/PolizasListHeader";
import PolizasList from "../polizas/PolizasList";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { PolizaInterface } from "../../types/interfaces";

const ClientePolizas = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [polizas, setPolizas] = useState<PolizaInterface[]>([]);

  const fetchPolizas = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/polizas", {
        params: {
          cliente: [id],
        },
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
  };

  useEffect(() => {
    fetchPolizas();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="w-full flex flex-col h-full">
      <PolizasListHeader />
      {isLoading && <Loading />}
      {!isLoading && polizas[0] && <PolizasList polizas={polizas} />}
    </div>
  );
};

export default ClientePolizas;
