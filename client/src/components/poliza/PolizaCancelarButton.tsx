import { useState } from "react";
import Modal from "../utils/Modal";
import ActionButton from "../utils/ActionButton";
import FormDateInput from "../utils/FormDateInput";
import axios, { AxiosError } from "axios";
import ErrorModal from "../utils/ErrorModal";
import SuccessModal from "../utils/SuccessModal";
import { Navigate } from "react-router-dom";
import Loading from "../utils/Loading";

const PolizaCancelarButton = ({
  id,
  clienteId,
  disabled,
}: {
  id: number;
  clienteId: number;
  disabled?: boolean;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [successNavigate, setSuccessNavigate] = useState(false);

  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = async () => {
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/polizas/${id}/cancelar`,
        { fechaCancelacion: date },
        { withCredentials: true }
      );

      if (response.data.status === 200) {
        setShowModal(false);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setShowModal(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
      setError(true);
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
          !disabled && setShowModal(true);
        }}
        disabled={disabled}
        color="red"
        size="lg"
      >
        Cancelar
      </ActionButton>
      {showModal && (
        <Modal size="small">
          <div className="w-full h-full flex flex-col justify-between">
            <h2 className="text-3xl text-center">Cancelar Póliza</h2>
            <div>
              <FormDateInput
                name="fechaCancelacion"
                label="Fecha de Cancelación"
                value={date}
                onChange={(date) => {
                  const newDate = new Date(date.setDate(date.getDate() + 1));
                  setDate(newDate);
                }}
              />
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
              <ActionButton color="blue" onClick={cancelHandler}>
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
          type="cancelada"
          onOk={() => {
            setSuccessNavigate(true);
          }}
        />
      )}
    </>
  );
};

export default PolizaCancelarButton;
