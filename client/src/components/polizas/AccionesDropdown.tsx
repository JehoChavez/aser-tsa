import axios from "axios";
import { PolizaInterface } from "../../types/interfaces";
import Dropdown from "../utils/Dropdown";
import { useContext, useEffect, useState } from "react";
import ActionButton from "../utils/ActionButton";
import Modal from "../utils/Modal";
import { PolizasContext } from "../../store/polizas-context";
import ErrorModal from "../utils/ErrorModal";

const AccionesDropdown = ({ poliza }: { poliza: PolizaInterface }) => {
  const polizasContext = useContext(PolizasContext);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [refetch, setRefetch] = useState(false);

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/polizas/${poliza.id}`,
        { withCredentials: true }
      );
      if (response.data.status === 200) {
        setDeleteSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (refetch) {
      polizasContext.fetchPolizas();
    }
  }, [refetch]);

  const successModal = (
    <Modal size="small">
      <div className="w-full flex justify-center mt-3 text-green-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          fill="currentColor"
          className="bi bi-check-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
        </svg>
      </div>
      <h4 className="text-center text-3xl mt-3">
        Póliza eliminada exitosamente
      </h4>
      <div className="w-full flex justify-center mt-2">
        <ActionButton
          onClick={() => {
            setRefetch(true);
          }}
          color="blue"
          size="lg"
        >
          OK
        </ActionButton>
      </div>
    </Modal>
  );

  return (
    <>
      <Dropdown title="Más acciones">
        <div className="p-1 text-blue-950 flex flex-col items-start">
          <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
            Reexpedir
          </button>
          <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
            Cambiar Contratante
          </button>
          <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
            {poliza.fechaCancelacion ? "Rehabilitar" : "Cancelar"}
          </button>
          <button
            className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1"
            onClick={deleteHandler}
          >
            Eliminar
          </button>
        </div>
      </Dropdown>
      {deleteSuccess && successModal}
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

export default AccionesDropdown;
