import { useState, useContext } from "react";
import ActionButton from "../utils/ActionButton";
import ConfirmModal from "../utils/ConfirmModal";
import { EndososContext } from "../../store/endosos-context";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Loading from "../utils/Loading";
import ErrorModal from "../utils/ErrorModal";
import SuccessModal from "../utils/SuccessModal";
import Modal from "../utils/Modal";

const DeleteEndosoButton = ({ id }: { id: number }) => {
  const endososContext = useContext(EndososContext);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const deleteEndoso = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/endosos/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
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

  return (
    <>
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      <ActionButton
        title="Eliminar Endoso"
        onClick={() => {
          setShowDeleteConfirm(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash3-fill"
          viewBox="0 0 16 16"
        >
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
        </svg>
      </ActionButton>
      {showDeleteConfirm && (
        <ConfirmModal
          onCancel={() => {
            setShowDeleteConfirm(false);
          }}
          onContinue={() => {
            deleteEndoso();
          }}
        >
          <h4 className="text-center text-3xl my-3 font-semibold">
            ¿Desea eliminar el endoso?
          </h4>
        </ConfirmModal>
      )}
      {success && (
        <SuccessModal
          type="endosoEliminado"
          onOk={() => {
            endososContext.fetchEndosos();
          }}
        />
      )}
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
    </>
  );
};

export default DeleteEndosoButton;
