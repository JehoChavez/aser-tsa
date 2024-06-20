import { useState } from "react";
import ListItem from "../utils/ListItem";
import PayDialog from "./PayDialog";
import ActionButton from "../utils/ActionButton";
import { PendientesReciboListItemInterface } from "../../types/interfaces";
import { Link } from "react-router-dom";

const PendientesReciboListItem = ({
  recibo,
}: PendientesReciboListItemInterface) => {
  const [showPayDialog, setShowPayDialog] = useState(false);

  const monto = new Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(recibo.monto);

  const cancelPay = () => {
    setShowPayDialog(false);
  };

  return (
    <>
      <ListItem>
        <div className="w-full p-2 bg-neutral-100 grid grid-cols-12">
          <div className="col-span-2 flex items-center">
            <Link
              to={`/clientes/${recibo.poliza.cliente.id}`}
              className="underline"
            >
              {recibo.poliza.cliente.nombre}
            </Link>
          </div>
          <div className="col-span-2 flex items-center">
            <p>{recibo.poliza.ramo.ramo}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <Link to={`/polizas/${recibo.polizaId}`} className="underline">
              {recibo.poliza.noPoliza}
            </Link>
          </div>
          <div className="flex items-center">
            <a>{recibo.endoso?.endoso}</a>
          </div>
          <div className="flex items-center">
            <p>
              {recibo.exhibicion}/{recibo.de}
            </p>
          </div>
          <div className="flex items-center">
            <p>{recibo.poliza.aseguradora.aseguradora}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p>
              ${monto} {recibo.poliza.moneda}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ActionButton
              title="Aplicar pago"
              onClick={() => setShowPayDialog(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-credit-card-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
              </svg>
            </ActionButton>
          </div>
        </div>
      </ListItem>
      {showPayDialog && <PayDialog recibo={recibo} onCancel={cancelPay} />}
    </>
  );
};

export default PendientesReciboListItem;
