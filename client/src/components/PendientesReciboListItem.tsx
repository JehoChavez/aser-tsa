import { useState } from "react";
import ListItem from "./ListItem";
import PayDialog from "./PayDialog";
import { PendientesReciboListItemInterface } from "../types/interfaces";

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
          <a className="col-span-2">{recibo.poliza.cliente.nombre}</a>
          <p className="col-span-2">{recibo.poliza.ramo.ramo}</p>
          <a className="col-span-2">{recibo.poliza.noPoliza}</a>
          <a>{recibo.endoso?.endoso}</a>
          <p>
            {recibo.exhibicion}/{recibo.de}
          </p>
          <p className="col-span-2">{recibo.poliza.aseguradora.aseguradora}</p>
          <p>
            ${monto} {recibo.poliza.moneda}
          </p>
          <button
            title="Aplicar pago"
            className="bg-gray-100 flex items-center justify-center border border-blue-950 rounded text-blue-950 hover:bg-gray-300 active:bg-gray-500"
            onClick={() => setShowPayDialog(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-credit-card-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
            </svg>
          </button>
        </div>
      </ListItem>
      {showPayDialog && <PayDialog recibo={recibo} onCancel={cancelPay} />}
    </>
  );
};

export default PendientesReciboListItem;