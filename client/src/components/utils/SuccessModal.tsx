import ActionButton from "./ActionButton";
import Modal from "./Modal";
import { SuccessModalProps } from "../../types/interfaces";

const SuccessModal = ({ type, onOk }: SuccessModalProps) => {
  return (
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
      {type === "cambioContratante" ? (
        <h4 className="text-center text-3xl mt-3">
          Contratante cambiado exitosamente
        </h4>
      ) : type === "endosoEliminado" ? (
        <h4 className="text-center text-3xl mt-3">Endoso Eliminado</h4>
      ) : type === "clienteCreado" ? (
        <h4 className="text-center text-3xl mt-3">
          Cliente Creado Exitosamente
        </h4>
      ) : type === "clienteEditado" ? (
        <h4 className="text-center text-3xl mt-3">
          Cliente Editado Exitosamente
        </h4>
      ) : type === "clienteEliminado" ? (
        <h4 className="text-center text-3xl mt-3">
          Cliente Eliminado Exitosamente
        </h4>
      ) : type === "guardado" ? (
        <h4 className="text-center text-3xl mt-3">Guardado exitosamente</h4>
      ) : type === "editado" ? (
        <h4 className="text-center text-3xl mt-3">Editado exitosamente</h4>
      ) : type === "eliminado" ? (
        <h4 className="text-center text-3xl mt-3">Eliminado exitosamente</h4>
      ) : (
        <h4 className="text-center text-3xl mt-3">
          Póliza {type} exitosamente
        </h4>
      )}
      <div className="w-full flex justify-center mt-2">
        <ActionButton onClick={onOk} color="blue" size="lg">
          OK
        </ActionButton>
      </div>
    </Modal>
  );
};

export default SuccessModal;
