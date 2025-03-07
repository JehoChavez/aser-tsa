import { useState, useCallback, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import IconTitle from "../components/utils/IconTitle";
import axios, { AxiosError } from "axios";
import { ClienteInterface } from "../types/interfaces";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";
import NPClienteInfo from "../components/nuevaPoliza/NPClienteInfo";
import NuevaPolizaForm from "../components/nuevaPoliza/NuevaPolizaForm";
import NotFound from "../components/utils/NotFound";

const NuevaPoliza = () => {
  const { id: clienteId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cliente, setCliente] = useState<ClienteInterface | null>(null);

  const fetchCliente = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/clientes/${clienteId}`,
        { withCredentials: true }
      );
      setCliente(response.data.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    }
  }, [clienteId]);

  useEffect(() => {
    fetchCliente();
  }, [clienteId]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

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
            className="bi bi-file-earmark-medical-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-3 2v.634l.549-.317a.5.5 0 1 1 .5.866L7 7l.549.317a.5.5 0 1 1-.5.866L6.5 7.866V8.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L5 7l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V5.5a.5.5 0 1 1 1 0m-2 4.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1m0 2h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
          </svg>
        }
      >
        Nueva Póliza
      </IconTitle>
      <div className="w-full h-full py-5">
        {cliente ? (
          <>
            <NPClienteInfo cliente={cliente} editable />
            <NuevaPolizaForm />
          </>
        ) : (
          <NotFound type="cliente" />
        )}
      </div>
    </div>
  );
};

export default NuevaPoliza;
