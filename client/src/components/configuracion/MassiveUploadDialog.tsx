import Modal from "../utils/Modal";

const MassiveUploadDialog = ({
  type,
}: {
  type: "aseguradoras" | "agentes" | "vendedores" | "ramos";
}) => {
  return (
    <Modal size="small" closeBtn>
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        Carga masiva de {type}
      </h3>
    </Modal>
  );
};

export default MassiveUploadDialog;
