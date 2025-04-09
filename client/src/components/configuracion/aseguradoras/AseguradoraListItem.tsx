import ListItem from "../../utils/ListItem";
import { AseguradoraInterface } from "../../../types/interfaces";
import LabelAndData from "../../utils/LabelAndData";
import ActionButton from "../../utils/ActionButton";
import { Navigate } from "react-router-dom";
import { AseguradorasContext } from "../../../store/aseguradoras-context";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import Loading from "../../utils/Loading";
import ConfirmModal from "../../utils/ConfirmModal";
import SuccessModal from "../../utils/SuccessModal";
import ErrorModal from "../../utils/ErrorModal";
import Modal from "../../utils/Modal";
import AseguradoraFormDialog from "./AseguradoraFormDialog";

const AseguradoraListItem = ({
  aseguradora,
}: {
  aseguradora: AseguradoraInterface;
}) => {
  const aseguradorasContext = useContext(AseguradorasContext);

  const [isLoading, setIsLoading] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.delete(
        `${baseUrl}/aseguradoras/${aseguradora.id}`,
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
    <ListItem>
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {showConfirmDialog && (
        <ConfirmModal
          onContinue={deleteHandler}
          onCancel={() => {
            setShowConfirmDialog(false);
          }}
        >
          <h4 className="text-center text-3xl my-3 font-semibold">
            ¿Desea eliminar la aseguradora {aseguradora.aseguradora}?
          </h4>
          <p className="text-center text-lg my-3">
            Sus pólizas y agentes serán eliminados
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
          type="eliminado"
          onOk={() => {
            aseguradorasContext.fetchAseguradoras();
            setDeleteSuccess(false);
          }}
        />
      )}
      {showForm && (
        <AseguradoraFormDialog
          onCancel={() => setShowForm(false)}
          onSuccess={() => setShowForm(false)}
          aseguradora={aseguradora}
        />
      )}
      <div className="w-full h-auto p-1 text-gray-800 bg-blue-800 bg-opacity-5 md:hidden">
        <LabelAndData label="Aseguradora">
          {aseguradora.aseguradora}
        </LabelAndData>
        <LabelAndData label="Plazo Primer Recibo">
          {aseguradora.plazoPrimer + " días"}
        </LabelAndData>
        <LabelAndData label="Plazo Recibos Subsecuentes">
          {aseguradora.plazoSubsecuentes + " días"}
        </LabelAndData>
        <LabelAndData label="Comentarios">
          {aseguradora.comentarios}
        </LabelAndData>
        <div>
          <ActionButton title="Editar" onClick={() => setShowForm(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </ActionButton>
          <ActionButton
            title="Eliminar"
            onClick={() => setShowConfirmDialog(true)}
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
        </div>
      </div>
      <div className="w-full h-auto p-1 text-gray-800 bg-blue-800 bg-opacity-5 hidden md:grid grid-cols-6 hover:bg-gray-200">
        <p>{aseguradora.aseguradora}</p>
        <p className="text-center">{aseguradora.plazoPrimer + " días"}</p>
        <p className="text-center">{aseguradora.plazoSubsecuentes + " días"}</p>
        <p className="col-span-2">{aseguradora.comentarios}</p>
        <div className="flex">
          <ActionButton title="Editar" onClick={() => setShowForm(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </ActionButton>
          <ActionButton
            title="Eliminar"
            onClick={() => setShowConfirmDialog(true)}
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
        </div>
      </div>
    </ListItem>
  );
};

export default AseguradoraListItem;
