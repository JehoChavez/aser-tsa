import Modal from "../utils/Modal";
import ActionButton from "../utils/ActionButton";

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
      <div className="flex flex-col h-full justify-center items-center">
        <input
          type="file"
          accept=".csv"
          name="archivo"
          id="archivo"
          className="p-1"
        />
      </div>
      <ActionButton
        color="blue"
        onClick={() => {
          // Handle file upload logic here
          console.log("File uploaded");
        }}
      >
        Subir
      </ActionButton>
    </Modal>
  );
};

export default MassiveUploadDialog;
