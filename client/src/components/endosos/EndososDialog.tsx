import Modal from "../utils/Modal";
import ActionButton from "../utils/ActionButton";
import EndososList from "./EndososList";

const EndososDialog = ({
  id,
  noPoliza,
  onClose,
}: {
  id: number;
  noPoliza: string;
  onClose: () => void;
}) => {
  return (
    <Modal size="large" closeBtn onClose={onClose}>
      <h2 className="w-full text-center text-2xl bg-blue-950 text-gray-100 font-bold p-1">
        ENDOSOS {noPoliza}
      </h2>
      <div className="p-2">
        <h3 className="mb-2 text-neutral-900">Crear</h3>
        <div className="flex flex-col md:flex-row">
          <ActionButton color="blue">Endoso A</ActionButton>
          <ActionButton color="blue">Endoso B</ActionButton>
          <ActionButton color="blue">Endoso D</ActionButton>
        </div>
      </div>
      <EndososList />
    </Modal>
  );
};

export default EndososDialog;
