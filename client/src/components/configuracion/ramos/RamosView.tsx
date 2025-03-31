import { useState, useEffect, useCallback } from "react";
import { RamoInterface } from "../../../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";
import { RamosContext } from "../../../store/ramos-context";
import RamosList from "./RamosList";
import ButtonPortal from "../ButtonPortal";
import IconTextButton from "../../utils/IconTextButton";
import RamoFormDialog from "./RamoFormDialog";
import UploadButton from "../UploadButton";
import MassiveUploadDialog from "../MassiveUploadDialog";

const RamosView = () => {
  const [ramos, setRamos] = useState<RamoInterface[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);

  const [showMassiveUpload, setShowMassiveUpload] = useState(false);

  const fetchRamos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/ramos", {
        withCredentials: true,
      });
      setRamos(response.data.content);
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
  }, []);

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
    fetchRamos();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      {isLoading && <Loading />}
      {isError && (
        <ErrorModal
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <ButtonPortal>
        <div className="flex flex-col align-center mt-2">
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
          {showUploadButton && <UploadButton onClick={handleUploadClick} />}
        </div>
      </ButtonPortal>
      <RamosContext.Provider value={{ ramos, fetchRamos }}>
        {showDialog && (
          <RamoFormDialog
            onCancel={() => setShowDialog(false)}
            onSuccess={() => setShowDialog(false)}
          />
        )}
        {showMassiveUpload && (
          <MassiveUploadDialog
            type="ramos"
            onClose={() => setShowMassiveUpload(false)}
          />
        )}
        <RamosList />
      </RamosContext.Provider>
    </>
  );
};

export default RamosView;
