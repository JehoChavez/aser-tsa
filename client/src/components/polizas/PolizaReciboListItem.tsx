import { Recibo } from "../../types/interfaces";
import { useState, useContext } from "react";
import ListItem from "../utils/ListItem";
import PayDialog from "../pendientes/PayDialog";
import ActionButton from "../utils/ActionButton";
import ConfirmModal from "../utils/ConfirmModal";
import { PolizaRecibosContext } from "../../store/poliza-recibos-context";

const PolizaReciboListItem = ({ recibo }: { recibo: Recibo }) => {
  const polizaRecibosContext = useContext(PolizaRecibosContext);

  const [showPayDialog, setShowPayDialog] = useState(false);

  const [showAnularConfirm, setShowAnularConfirm] = useState(false);

  const monto = new Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(recibo.primaTotal);

  const cancelPay = () => {
    setShowPayDialog(false);
  };

  return (
    <>
      <ListItem>
        <div
          className={`w-full px-1 ${
            recibo.fechaPago ? "bg-green-100" : "bg-neutral-100"
          } flex flex-col md:grid grid-cols-10 md:text-center`}
        >
          <div className="flex">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Endoso
            </p>
            <p className="md:w-full">{recibo.endoso?.endoso || 0}</p>
          </div>
          <div className="flex">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Serie
            </p>
            <p className="md:w-full">
              {recibo.exhibicion}/{recibo.de}
            </p>
          </div>
          <div className="flex md:col-span-2">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Inicio de Vigencia
            </p>
            <p className="md:w-full">
              {recibo.fechaInicio.split("-").reverse().join("-")}
            </p>
          </div>
          <div className="flex md:col-span-2">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Límite de Pago
            </p>
            <p className="md:w-full">
              {recibo.fechaLimite.split("-").reverse().join("-")}
            </p>
          </div>
          <div className="flex md:col-span-2">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Fecha de Pago
            </p>
            <p className="md:w-full">
              {recibo.fechaPago?.split("-").reverse().join("-")}
            </p>
          </div>
          <div className="flex">
            <p className="md:hidden mr-1 text-neutral-600 font-semibold">
              Serie
            </p>
            <p className="md:w-full">${monto}</p>
          </div>
          <div className="px-2 flex items-center justify-center">
            {recibo.fechaPago ? (
              <ActionButton
                title="Anular Pago"
                onClick={() => {
                  setShowAnularConfirm(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              </ActionButton>
            ) : (
              <ActionButton
                title="Aplicar Pago"
                onClick={() => {
                  setShowPayDialog(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-credit-card-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
                </svg>
              </ActionButton>
            )}
          </div>
        </div>
      </ListItem>
      {showPayDialog && (
        <PayDialog
          recibo={recibo}
          onCancel={cancelPay}
          onPay={() => {
            setShowPayDialog(false);
          }}
        />
      )}
      {showAnularConfirm && (
        <ConfirmModal
          onCancel={() => {
            setShowAnularConfirm(false);
          }}
          onContinue={() => {
            recibo.id && polizaRecibosContext.onAnular(recibo.id);
            setShowAnularConfirm(false);
          }}
        >
          <h4 className="text-center text-3xl my-3 font-semibold">
            ¿Desea anular el pago?
          </h4>
        </ConfirmModal>
      )}
    </>
  );
};

export default PolizaReciboListItem;
