import Modal from "../utils/Modal";
import ActionButton from "../utils/ActionButton";

const EndososDialog = ({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) => {
  return (
    <Modal size="large" closeBtn onClose={onClose}>
      <h2 className="w-full text-center text-2xl bg-blue-950 text-gray-100 font-bold p-1">
        ENDOSOS
      </h2>
      <div className="p-2">
        <h3 className="mb-2 text-neutral-900">Crear</h3>
        <div className="flex flex-col md:flex-row md:w-96 md:Sjustify-between">
          <ActionButton color="blue">Endoso A</ActionButton>
          <ActionButton color="blue">Endoso B</ActionButton>
          <ActionButton color="blue">Endoso D</ActionButton>
        </div>
      </div>
    </Modal>
  );
};

export default EndososDialog;
