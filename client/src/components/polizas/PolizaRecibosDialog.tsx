import Modal from "../utils/Modal";
import { PolizaRecibosContext } from "../../store/poliza-recibos-context";
import { useContext, useEffect, useState } from "react";
import Loading from "../utils/Loading";
import ListDialog from "../utils/ListDialog";
import PolizaRecibosListHeader from "./PolizaRecibosListHeader";
import PendientesReciboListItem from "../pendientes/PendientesReciboListItem";

const PolizaRecibosDialog = () => {
  const polizaRecibosContext = useContext(PolizaRecibosContext);

  const [primaNetaSum, setPrimaNetaSum] = useState(0);
  const [primaTotalSum, setPrimaTotalSum] = useState(0);

  useEffect(() => {
    polizaRecibosContext.fetchRecibos();
  }, []);

  useEffect(() => {
    const netaSum = polizaRecibosContext.recibos.reduce((sum, recibo) => {
      if (recibo.primaNeta) {
        return sum + recibo.primaNeta;
      } else {
        return sum;
      }
    }, 0);
    setPrimaNetaSum(netaSum);

    const totalSum = polizaRecibosContext.recibos.reduce((sum, recibo) => {
      return sum + recibo.primaTotal;
    }, 0);
    setPrimaTotalSum(totalSum);
  }, [polizaRecibosContext.recibos]);

  return (
    <Modal size="large" onClose={polizaRecibosContext.onClose} closeBtn>
      {polizaRecibosContext.isLoading ? (
        <Loading />
      ) : (
        <ListDialog
          title="Recibos"
          header={
            <PolizaRecibosListHeader
              noPoliza={polizaRecibosContext.noPoliza}
              contratante={polizaRecibosContext.contratante}
              primaNeta={primaNetaSum}
              primaTotal={primaTotalSum}
            />
          }
        >
          {polizaRecibosContext.recibos.map((recibo) => (
            <PendientesReciboListItem recibo={recibo} key={recibo.id} />
          ))}
        </ListDialog>
      )}
    </Modal>
  );
};

export default PolizaRecibosDialog;
