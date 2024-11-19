import Modal from "../utils/Modal";
import ClienteForm from "./ClienteForm/ClienteForm";

const ClienteDialog = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal size="large" closeBtn onClose={onClose}>
      <h2 className="w-full text-center text-2xl bg-blue-950 text-gray-100 font-bold p-1">
        CLIENTE
      </h2>
      <ClienteForm />
    </Modal>
  );
};

export default ClienteDialog;
