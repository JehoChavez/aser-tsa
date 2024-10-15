import Modal from "../utils/Modal";
import { PolizaRecibosContext } from "../../store/poliza-recibos-context";
import { useContext, useEffect } from "react";
import Loading from "../utils/Loading";

const PolizaRecibosDialog = () => {
  const polizaRecibosContext = useContext(PolizaRecibosContext);

  useEffect(() => {
    polizaRecibosContext.fetchRecibos();
  }, []);
  console.log(polizaRecibosContext.recibos);

  return (
    <Modal size="large" onClose={polizaRecibosContext.onClose} closeBtn>
      {polizaRecibosContext.isLoading && <Loading />}
    </Modal>
  );
};

export default PolizaRecibosDialog;
