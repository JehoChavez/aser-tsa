import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import ErrorModal from "../../utils/ErrorModal";
import { AgentesContext } from "../../../store/agentes-context";
import { AgenteInterface } from "../../../types/interfaces";
import AgentesList from "./AgentesList";
import ButtonPortal from "../ButtonPortal";
import IconTextButton from "../../utils/IconTextButton";
import AgenteFormDialog from "./AgenteFormDialog";
import UploadButton from "../UploadButton";
import MassiveUploadDialog from "../MassiveUploadDialog";

const AgentesView = () => {
  const [agentes, setAgentes] = useState<AgenteInterface[]>([]);
  const [aseguradoraIds, setAseguradoraIds] = useState<number[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);

  const [showMassiveUpload, setShowMassiveUpload] = useState(false);

  const fetchAgentes = useCallback(async () => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${baseUrl}/agentes`, {
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

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleRightClick = () => {
    setShowUploadButton((prevState) => !prevState);
  };

  const handleUploadClick = () => {
    setShowMassiveUpload(true);
  };

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
        <div className="flex flex-col align-center mt-2">
          {showUploadButton ? (
            <UploadButton
              onClick={handleUploadClick}
              onRightClick={handleRightClick}
            />
          ) : (
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
              onClick={handleClick}
              onRightClick={handleRightClick}
            >
              Nuevo
            </IconTextButton>
          )}
        </div>
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
        {showDialog && (
          <AgenteFormDialog
            onCancel={() => setShowDialog(false)}
            onSuccess={() => setShowDialog(false)}
          />
        )}
        {showMassiveUpload && (
          <MassiveUploadDialog
            type="agentes"
            onClose={() => setShowMassiveUpload(false)}
          />
        )}
        <AgentesList />
      </AgentesContext.Provider>
    </>
  );
};

export default AgentesView;
