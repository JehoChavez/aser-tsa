import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import ErrorModal from "../../utils/ErrorModal";
import { AgentesContext } from "../../../store/agentes-context";
import { AgenteInterface } from "../../../types/interfaces";
import AgentesList from "./AgentesList";

const AgentesView = () => {
  const [agentes, setAgentes] = useState<AgenteInterface[]>([]);
  const [aseguradoraIds, setAseguradoraIds] = useState<number[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAgentes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/agentes", {
        withCredentials: true,
        params: { aseguradoraIds },
      });
      setAgentes(response.data.content);
    } catch (error) {
      setIsError(true);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [aseguradoraIds]);

  useEffect(() => {
    fetchAgentes();
  }, [fetchAgentes]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      {isError && (
        <ErrorModal
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <AgentesContext.Provider
        value={{
          agentes,
          fetchAgentes,
          aseguradoraIds,
          setAseguradoraIds,
          isLoading,
          setIsLoading,
        }}
      >
        <AgentesList />
      </AgentesContext.Provider>
    </>
  );
};

export default AgentesView;
