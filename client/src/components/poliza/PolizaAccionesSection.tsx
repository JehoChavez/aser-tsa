import ActionButton from "../utils/ActionButton";
import { useState } from "react";
import { PolizaInterface } from "../../types/interfaces";
import PolizaCambiarContratanteButton from "./PolizaCambiarContratanteButton";
import PolizaCancelarButton from "./PolizaCancelarButton";
import PolizaRehabilitarButton from "./PolizaRehabilitarButton";
import PolizaEliminarButton from "./PolizaEliminarButton";
import { Navigate } from "react-router-dom";
import ConfirmModal from "../utils/ConfirmModal";
import ReturnButton from "../utils/ReturnButton";

const PolizaAccionesSection = ({ poliza }: { poliza: PolizaInterface }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNavigate, setEditNavigate] = useState(false);

  const [renovarNavigate, setRenovarNavigate] = useState(false);
  const [reexpedirNavigate, setReexpedirNavigate] = useState(false);

  if (editNavigate) return <Navigate to={`/polizas/${poliza.id}/editar`} />;
  if (renovarNavigate) return <Navigate to={`/polizas/${poliza.id}/renovar`} />;
  if (reexpedirNavigate)
    return <Navigate to={`/polizas/${poliza.id}/reexpedir`} />;

  return (
    <div className="flex flex-col md:flex-row w-full justify-between">
      <ReturnButton size="lg" />
      <ActionButton
        onClick={() => {
          setShowEditModal(true);
        }}
        disabled={
          poliza.renovacionId ||
          poliza.reexpedicionId ||
          poliza.fechaCancelacion
            ? true
            : false
        }
        color="blue"
        size="lg"
      >
        Editar
      </ActionButton>
      <ActionButton
        onClick={() => {
          setRenovarNavigate(true);
        }}
        disabled={
          poliza.renovacionId ||
          poliza.reexpedicionId ||
          poliza.fechaCancelacion
            ? true
            : false
        }
        color="blue"
        size="lg"
      >
        Renovar
      </ActionButton>
      <ActionButton
        onClick={() => {
          setReexpedirNavigate(true);
        }}
        disabled={
          poliza.reexpedicionId ||
          poliza.renovacionId ||
          poliza.fechaCancelacion
            ? true
            : false
        }
        color="blue"
        size="lg"
      >
        Reexpedir
      </ActionButton>
      <PolizaCambiarContratanteButton
        id={poliza.id}
        disabled={
          poliza.fechaCancelacion || poliza.reexpedicionId ? true : false
        }
      />
      {poliza.fechaCancelacion ? (
        <PolizaRehabilitarButton
          id={poliza.id}
          clienteId={poliza.clienteId as number}
        />
      ) : (
        <PolizaCancelarButton
          id={poliza.id}
          clienteId={poliza.clienteId as number}
          disabled={poliza.reexpedicionId ? true : false}
        />
      )}
      <PolizaEliminarButton
        id={poliza.id}
        clienteId={poliza.clienteId as number}
      />
      {showEditModal && (
        <ConfirmModal
          onCancel={() => {
            setShowEditModal(false);
          }}
          onContinue={() => {
            setEditNavigate(true);
          }}
        >
          <h4 className="text-center text-3xl my-3 font-semibold">
            ¿Desea editar la póliza?
          </h4>
          <p className="text-center text-lg my-3">
            Los recibos pagados serán anulados
          </p>
        </ConfirmModal>
      )}
    </div>
  );
};

export default PolizaAccionesSection;
