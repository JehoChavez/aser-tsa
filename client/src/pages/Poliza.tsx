import { useState, useCallback, useEffect } from "react";
import IconTitle from "../components/utils/IconTitle";
import { useParams } from "react-router-dom";
import { ClienteInterface, PolizaInterface } from "../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";

const Poliza = () => {
  const { id: polizaId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [poliza, setPoliza] = useState<PolizaInterface>();
  const [cliente, setCliente] = useState<ClienteInterface>();

  const fetchPoliza = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/polizas/${polizaId}`,
        { withCredentials: true }
      );
      setPoliza(response.data.content);
      setCliente(response.data.content.cliente);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [polizaId]);

  useEffect(() => {
    fetchPoliza();
  }, [fetchPoliza]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="w-full h-full px-5 py-4 flex flex-col overflow-hidden">
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
            className="bi bi-file-earmark-medical-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-3 2v.634l.549-.317a.5.5 0 1 1 .5.866L7 7l.549.317a.5.5 0 1 1-.5.866L6.5 7.866V8.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L5 7l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V5.5a.5.5 0 1 1 1 0m-2 4.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1m0 2h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
          </svg>
        }
      >
        Póliza {poliza?.noPoliza}
      </IconTitle>
    </div>
  );
};

export default Poliza;
