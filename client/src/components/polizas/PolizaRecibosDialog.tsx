import Modal from "../utils/Modal";
import { PolizaRecibosContext } from "../../store/poliza-recibos-context";
import { useContext } from "react";

const PolizaRecibosDialog = () => {
  const polizaRecibosContext = useContext(PolizaRecibosContext);
  console.log(polizaRecibosContext);

  return (
    <Modal size="large" onClose={polizaRecibosContext.onClose} closeBtn>
      Recibos
    </Modal>
  );
};

export default PolizaRecibosDialog;
