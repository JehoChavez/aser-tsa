import ActionButton from "../utils/ActionButton";
import { useState } from "react";
import { PolizaInterface } from "../../types/interfaces";
import PolizaCambiarContratanteButton from "./PolizaCambiarContratanteButton";
import PolizaCancelarButton from "./PolizaCancelarButton";
import PolizaRehabilitarButton from "./PolizaRehabilitarButton";
import PolizaEliminarButton from "./PolizaEliminarButton";

const PolizaAccionesSection = ({ poliza }: { poliza: PolizaInterface }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [renovarNavigate, setRenovarNavigate] = useState(false);
  const [reexpedirNavigate, setReexpedirNavigate] = useState(false);
  const [showContratanteModal, setShowContratanteModal] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full justify-between">
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
          setReexpedirNavigate(false);
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
    </div>
  );
};

export default PolizaAccionesSection;
