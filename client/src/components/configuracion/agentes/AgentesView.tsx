import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import ErrorModal from "../../utils/ErrorModal";
import { AgentesContext } from "../../../store/agentes-context";
import { AgenteInterface } from "../../../types/interfaces";
import AgentesList from "./AgentesList";
import ButtonPortal from "../ButtonPortal";
import IconTextButton from "../../utils/IconTextButton";

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
      <ButtonPortal>
        <IconTextButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
          }
          width="w-full"
          height="h-full"
        >
          Nuevo
        </IconTextButton>
      </ButtonPortal>
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
