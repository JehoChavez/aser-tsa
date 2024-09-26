import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PolizaInterface, ClienteInterface } from "../types/interfaces";
import axios, { AxiosError } from "axios";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";

const RenovarPoliza = () => {
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

  return (
    <div className="w-full h-full px-5 py-4 flex flex-col">
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      Renovar Poliza
    </div>
  );
};

export default RenovarPoliza;
