import { ReactNode } from "react";
import ActionButton from "./ActionButton";
import Modal from "./Modal";

const ConfirmModal = ({
  onCancel,
  onContinue,
  children,
}: {
  onCancel: () => void;
  onContinue: () => void;
  children?: ReactNode;
}) => {
  return (
    <Modal size="small">
      <div className="h-full w-full flex flex-col justify-around">
        <div>
          {children ? (
            children
          ) : (
            <h4 className="text-center text-3xl my-3 font-semibold">
              ¿Desea continuar?
            </h4>
          )}
        </div>
        <div className="w-full flex justify-between px-5">
          <ActionButton color="red" onClick={onCancel}>
            Cancelar
          </ActionButton>
          <ActionButton color="blue" onClick={onContinue}>
            Continuar
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
