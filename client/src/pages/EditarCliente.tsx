import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/utils/Loading";
import Modal from "../components/utils/Modal";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { ClienteInterface } from "../types/interfaces";
import ErrorModal from "../components/utils/ErrorModal";
import IconTitle from "../components/utils/IconTitle";
import ClienteForm from "../components/clientes/ClienteForm/ClienteForm";
import NotFound from "../components/utils/NotFound";

const EditarCliente = () => {
  const { id: clienteId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cliente, setCliente] = useState<ClienteInterface>();

  const fetchCliente = useCallback(async () => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${baseUrl}/clientes/${clienteId}`, {
        withCredentials: true,
      });
      setCliente(response.data.content);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [clienteId]);

  useEffect(() => {
    fetchCliente();
  }, [fetchCliente]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="w-full h-full px-5 py-4 flex flex-col">
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {isError && (
        <ErrorModal
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <IconTitle
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-person-fill-add"
            viewBox="0 0 16 16"
          >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
          </svg>
        }
      >
        Editar Cliente
      </IconTitle>
      <div className="w-full h-full py-5">
        {cliente ? (
          <ClienteForm cliente={cliente} />
        ) : (
          <NotFound type="cliente" />
        )}
      </div>
    </div>
  );
};

export default EditarCliente;
