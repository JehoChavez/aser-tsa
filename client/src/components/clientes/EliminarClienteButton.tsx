import ActionButton from "../utils/ActionButton";
import { Navigate } from "react-router-dom";
import { ClientesContext } from "../../store/clientes-context";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import Loading from "../utils/Loading";
import ConfirmModal from "../utils/ConfirmModal";
import SuccessModal from "../utils/SuccessModal";
import ErrorModal from "../utils/ErrorModal";

const EliminarClienteButton = ({ id }: { id: number }) => {
  const clientesContext = useContext(ClientesContext);

  const [isLoading, setIsLoading] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const deleteHandler = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/clientes/${id}`,
        { withCredentials: true }
      );
      if (response.data.status === 200) {
        setShowConfirmDialog(false);
        setDeleteSuccess(true);
      }
    } catch (error) {
      setError(true);
      setShowConfirmDialog(false);
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
      {isLoading && <Loading />}
      {showConfirmDialog && (
        <ConfirmModal
          onContinue={deleteHandler}
          onCancel={() => {
            setShowConfirmDialog(false);
          }}
        >
          <h4 className="text-center text-3xl my-3 font-semibold">
            ¿Desea eliminar el cliente?
          </h4>
          <p className="text-center text-lg my-3">
            Sus pólizas serán eliminadas
          </p>
        </ConfirmModal>
      )}
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
      {deleteSuccess && (
        <SuccessModal
          type="clienteEliminado"
          onOk={() => {
            clientesContext.fetchClientes();
          }}
        />
      )}
      <ActionButton
        title="Eliminar Cliente"
        onClick={() => {
          setShowConfirmDialog(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
        </svg>
      </ActionButton>
    </>
  );
};

export default EliminarClienteButton;
