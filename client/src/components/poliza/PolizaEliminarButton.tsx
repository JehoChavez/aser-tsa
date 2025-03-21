import { useState } from "react";
import axios, { AxiosError } from "axios";
import SuccessModal from "../utils/SuccessModal";
import ErrorModal from "../utils/ErrorModal";
import { Navigate } from "react-router-dom";
import Loading from "../utils/Loading";
import Modal from "../utils/Modal";
import ActionButton from "../utils/ActionButton";

const PolizaEliminarButton = ({
  id,
  clienteId,
}: {
  id: number;
  clienteId: number;
}) => {
  const [showModal, setShowModal] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [successNavigate, setSuccessNavigate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/polizas/${id}`,
        { withCredentials: true }
      );
      if (response.data.status === 200) {
        setShowModal(false);
        setDeleteSuccess(true);
      }
    } catch (error) {
      console.log(error);
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
        color="red"
        size="lg"
      >
        Eliminar
      </ActionButton>
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
      {showModal && (
        <Modal size="small">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col w-full h-4/5 justify-center align-middle">
              <h2 className="text-3xl text-center h-20">
                ¿Deseas Eliminar la Póliza?
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
              <ActionButton color="blue" onClick={deleteHandler}>
                Continuar
              </ActionButton>
            </div>
          </div>
        </Modal>
      )}
      {deleteSuccess && (
        <SuccessModal
          type="eliminada"
          onOk={() => {
            setSuccessNavigate(true);
          }}
        />
      )}
    </>
  );
};

export default PolizaEliminarButton;
