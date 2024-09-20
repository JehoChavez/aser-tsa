import ActionButton from "../utils/ActionButton";
import Modal from "../utils/Modal";

const EditModal = ({
  onCancel,
  onContinue,
}: {
  onCancel: () => void;
  onContinue: () => void;
}) => {
  return (
    <Modal size="small">
      <div className="h-full w-full flex flex-col justify-around">
        <div>
          <h4 className="text-center text-3xl my-3 font-semibold">
            ¿Desea editar la póliza?
          </h4>
          <p className="text-center text-lg my-3">
            Los recibos pagados serán anulados
          </p>
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

export default EditModal;
