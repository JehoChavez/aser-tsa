import { ClienteInterface } from "../../types/interfaces";
import ListItem from "../utils/ListItem";
import ActionButton from "../utils/ActionButton";
import { Link, Navigate } from "react-router-dom";
import { ClientesContext } from "../../store/clientes-context";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import Loading from "../utils/Loading";
import ConfirmModal from "../utils/ConfirmModal";
import SuccessModal from "../utils/SuccessModal";
import ErrorModal from "../utils/ErrorModal";

const ClienteListItem = ({ cliente }: { cliente: ClienteInterface }) => {
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
        `http://localhost:3000/api/clientes/${cliente.id}`,
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
      <ListItem>
        <div className="h-auto flex p-1 text-gray-800 bg-blue-800 bg-opacity-5">
          <div className="w-12 pl-1 pr-2">
            <span className="h-full w-full flex items-center justify-center">
              {cliente.tipoPersona === "fisica" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-building-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                </svg>
              )}
            </span>
          </div>
          <div className="w-full h-auto grid grid-rows-5 grid-cols-4 md:grid-rows-none md:grid-cols-12">
            <div className="row-start-1 col-start-1 col-span-3 px-2 flex items-center">
              <Link to={`/clientes/${cliente.id}`} className="underline">
                {cliente.nombre}
              </Link>
            </div>
            <div className="row-start-2 col-span-3 md:hidden xl:flex md:row-start-1 md:col-span-1 px-2 items-center">
              <p>{cliente.rfc}</p>
            </div>
            <div className="row-start-3 col-span3 md:row-start-1 md:col-span-4 lg:col-span-3 px-2 flex items-center">
              <a href={`mailto:${cliente.correo}`} className="underline">
                {cliente.correo}
              </a>
            </div>
            <div className="row-start-4 col-span-3 md:row-start-1 md:col-span-3 lg:col-span-2 xl:col-span-1 px-2 flex items-center">
              <p>{cliente.telefono}</p>
            </div>
            <div className="flex row-start-5 col-span-3 md:hidden lg:row-start-1 lg:flex xl:col-span-2 lg:col-start-9 px-2 items-center">
              <p>{cliente.empresa}</p>
            </div>
            <div className="col-start-4 row-span-full md:col-start-11 col-span-full px-2 flex flex-col justify-around md:flex-row md:justify-normal items-center">
              <Link to={`/clientes/${cliente.id}`}>
                <ActionButton title="Ver Cliente">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                </ActionButton>
              </Link>
              <Link to={`/clientes/${cliente.id}/editar`}>
                <ActionButton title="Editar Cliente">
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
              </Link>
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
            </div>
          </div>
        </div>
      </ListItem>
    </>
  );
};

export default ClienteListItem;
