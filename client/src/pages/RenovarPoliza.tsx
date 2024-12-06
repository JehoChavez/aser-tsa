import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PolizaInterface, ClienteInterface } from "../types/interfaces";
import axios, { AxiosError } from "axios";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";
import IconTitle from "../components/utils/IconTitle";
import NPClienteInfo from "../components/nuevaPoliza/NPClienteInfo";
import PolizaForm from "../components/PolizaForm/PolizaForm";
import ActionButton from "../components/utils/ActionButton";
import NotFound from "../components/utils/NotFound";

const RenovarPoliza = () => {
  const { id: polizaId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [poliza, setPoliza] = useState<PolizaInterface>();
  const [cliente, setCliente] = useState<ClienteInterface>();

  const [navigate, setNavigate] = useState(false);

  const fetchPoliza = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/polizas/${polizaId}`,
        { withCredentials: true }
      );
      setPoliza(response.data.content);
      setCliente(response.data.content.cliente);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    }
  }, [polizaId]);

  useEffect(() => {
    fetchPoliza();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (navigate) return <Navigate to={`/clientes/${cliente?.id}`} />;

  return (
    <div className="w-full h-full px-5 py-4 flex flex-col">
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      <IconTitle
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-repeat"
            viewBox="0 0 16 16"
          >
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
            <path
              fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
            />
          </svg>
        }
      >
        Renovar Póliza
      </IconTitle>
      <div className="w-full h-full py-5">
        {poliza ? (
          <>
            {cliente ? (
              <NPClienteInfo cliente={cliente} />
            ) : (
              <NotFound type="cliente" />
            )}
            {poliza.renovacionId ? (
              <Modal size="small">
                <div className="w-full h-full flex flex-col justify-between py-2">
                  <h3 className="text-3xl font-semibold text-center text-gray-800 mt-4">
                    POLIZA YA RENOVADA
                  </h3>
                  <ActionButton
                    color="blue"
                    onClick={() => {
                      setNavigate(true);
                    }}
                  >
                    OK
                  </ActionButton>
                </div>
              </Modal>
            ) : (
              <PolizaForm poliza={poliza} renovacion />
            )}
          </>
        ) : (
          <NotFound type="poliza" />
        )}
      </div>
    </div>
  );
};

export default RenovarPoliza;
