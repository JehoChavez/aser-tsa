import Modal from "../utils/Modal";
import ActionButton from "../utils/ActionButton";
import EndososList from "./EndososList";
import { EndososContext } from "../../store/endosos-context";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Loading from "../utils/Loading";
import { Navigate } from "react-router-dom";
import EndosoForm from "./EndosoForm";
import { AseguradoraInterface } from "../../types/interfaces";

const EndososDialog = ({
  polizaId,
  noPoliza,
  onClose,
  aseguradora,
  formaPago,
  polizaInicioVigencia,
  polizaFinVigencia,
}: {
  polizaId: number;
  noPoliza: string;
  onClose: () => void;
  aseguradora: AseguradoraInterface;
  formaPago: number;
  polizaInicioVigencia: string;
  polizaFinVigencia: string;
}) => {
  const [endosos, setEndosos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [endosoType, setEndosoType] = useState<"A" | "B" | "D">("A");

  const fetchEndosos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/polizas/${polizaId}/endosos`,
        {
          withCredentials: true,
        }
      );
      setEndosos(response.data.content);
    } catch (error) {
      setHasError(true);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEndosos();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <Modal size="large" closeBtn onClose={onClose}>
      <h2 className="w-full text-center text-2xl bg-blue-950 text-gray-100 font-bold p-1">
        ENDOSOS {noPoliza}
      </h2>
      <EndososContext.Provider value={{ endosos, fetchEndosos }}>
        {showForm ? (
          <EndosoForm
            polizaId={polizaId}
            type={endosoType}
            onCancel={() => {
              setShowForm(false);
            }}
            aseguradora={aseguradora}
            formaPago={formaPago}
            polizaInicioVigencia={polizaInicioVigencia}
            polizaFinVigencia={polizaFinVigencia}
            onSuccess={() => {
              setShowForm(false);
            }}
            onError={() => {
              setShowForm(false);
            }}
          />
        ) : (
          <>
            <div className="p-2">
              <h3 className="mb-2 text-neutral-900">Crear</h3>
              <div className="flex flex-col md:flex-row">
                <ActionButton
                  color="blue"
                  onClick={() => {
                    setShowForm(true);
                    setEndosoType("A");
                  }}
                >
                  Endoso A
                </ActionButton>
                <ActionButton
                  color="blue"
                  onClick={() => {
                    setShowForm(true);
                    setEndosoType("B");
                  }}
                >
                  Endoso B
                </ActionButton>
                <ActionButton
                  color="blue"
                  onClick={() => {
                    setShowForm(true);
                    setEndosoType("D");
                  }}
                >
                  Endoso D
                </ActionButton>
              </div>
            </div>
            {isLoading ? (
              <Loading />
            ) : hasError ? (
              <div className="w-full h-full flex justify-center">
                <div className="text-center flex align-middle justify-center flex-col">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      fill="currentColor"
                      className="bi bi-x-circle text-red-700"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Algo Salió Mal</h3>
                  <h4>Intenta de Nuevo Más Tarde</h4>
                </div>
              </div>
            ) : (
              <EndososList />
            )}
          </>
        )}
      </EndososContext.Provider>
    </Modal>
  );
};

export default EndososDialog;
