import Modal from "../utils/Modal";

const MassiveUploadDialog = ({
  type,
  onClose,
}: {
  type: "aseguradoras" | "agentes" | "vendedores" | "ramos";
  onClose: () => void;
}) => {
  return (
    <Modal size="small" closeBtn onClose={onClose}>
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        Carga masiva de {type}
      </h3>
    </Modal>
  );
};

export default MassiveUploadDialog;
