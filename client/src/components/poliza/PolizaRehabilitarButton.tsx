import { useState } from "react";
import Modal from "../utils/Modal";
import ActionButton from "../utils/ActionButton";
import axios, { AxiosError } from "axios";
import ErrorModal from "../utils/ErrorModal";
import SuccessModal from "../utils/SuccessModal";
import { Navigate } from "react-router-dom";
import Loading from "../utils/Loading";

const PolizaRehabilitarButton = ({
  id,
  clienteId,
}: {
  id: number;
  clienteId: number;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [successNavigate, setSuccessNavigate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const rehabilitarHandler = async () => {
    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.patch(
        `${baseUrl}/polizas/${id}/anular-cancelacion`,
        {},
        { withCredentials: true }
      );

      if (response.data.status === 200) {
        setShowModal(false);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setShowModal(false);
      setError(true);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (successNavigate) return <Navigate to={`/clientes/${clienteId}`} />;

  return (
    <>
      {isLoading && <Loading />}
      <ActionButton
        onClick={() => {
          setShowModal(true);
        }}
        color="blue"
        size="lg"
      >
        Rehabilitar
      </ActionButton>
      {showModal && (
        <Modal size="small">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col w-full h-4/5 justify-center align-middle">
              <h2 className="text-3xl text-center h-20">
                ¿Deseas Rehabilitar la Póliza?
              </h2>
            </div>
            <div className="w-full flex justify-between mb-3">
              <ActionButton
                onClick={() => {
                  setShowModal(false);
                }}
                color="red"
              >
                Cancelar
              </ActionButton>
              <ActionButton color="blue" onClick={rehabilitarHandler}>
                Continuar
              </ActionButton>
            </div>
          </div>
        </Modal>
      )}
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
      {success && (
        <SuccessModal
          type="rehabilitada"
          onOk={() => {
            setSuccessNavigate(true);
          }}
        />
      )}
    </>
  );
};

export default PolizaRehabilitarButton;
