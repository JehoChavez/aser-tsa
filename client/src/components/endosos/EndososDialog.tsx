import Modal from "../utils/Modal";

const EndososDialog = ({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) => {
  return (
    <Modal size="large" closeBtn onClose={onClose}>
      Endosos
    </Modal>
  );
};

export default EndososDialog;
