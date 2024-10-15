import Modal from "../utils/Modal";
import { PolizaRecibosContext } from "../../store/poliza-recibos-context";
import { useContext, useEffect } from "react";
import Loading from "../utils/Loading";
import ListDialog from "../utils/ListDialog";
import PendientesReciboListHeader from "../pendientes/PendientesReciboListHeader";
import PendientesReciboListItem from "../pendientes/PendientesReciboListItem";

const PolizaRecibosDialog = () => {
  const polizaRecibosContext = useContext(PolizaRecibosContext);

  useEffect(() => {
    polizaRecibosContext.fetchRecibos();
  }, []);

  return (
    <Modal size="large" onClose={polizaRecibosContext.onClose} closeBtn>
      {polizaRecibosContext.isLoading ? (
        <Loading />
      ) : (
        <ListDialog title="Recibos" header={<PendientesReciboListHeader />}>
          {polizaRecibosContext.recibos.map((recibo) => (
            <PendientesReciboListItem recibo={recibo} key={recibo.id} />
          ))}
        </ListDialog>
      )}
    </Modal>
  );
};

export default PolizaRecibosDialog;
