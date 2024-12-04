import { useState, useEffect, useCallback } from "react";
import IconTitle from "../components/utils/IconTitle";
import { useParams, Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";
import NPClienteInfo from "../components/nuevaPoliza/NPClienteInfo";
import PolizaNumberVigenciaSection from "../components/poliza/PolizaNumberVigenciaSection";
import PolizaAseguradoraSection from "../components/poliza/PolizaAseguradoraSection";
import LabelAndData from "../components/utils/LabelAndData";
import PolizaPrimasSection from "../components/poliza/PolizaPrimasSection";
import PolizaRecibosSection from "../components/poliza/PolizaRecibosSection";
import PolizaAccionesSection from "../components/poliza/PolizaAccionesSection";
import PolizaRenuevaReexpideSection from "../components/poliza/PolizaRenuevaReexpideSection";
import ActionButton from "../components/utils/ActionButton";
import EndososDialog from "../components/endosos/EndososDialog";
import { ClienteInterface, PolizaInterface } from "../types/interfaces";

const Poliza = () => {
  const { id: polizaId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [poliza, setPoliza] = useState<PolizaInterface | null>(null);
  const [cliente, setCliente] = useState<ClienteInterface | null>(null);
  const [showEndosos, setShowEndosos] = useState(false);

  const fetchPoliza = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ content: PolizaInterface }>(
        `http://localhost:3000/api/polizas/${polizaId}`,
        { withCredentials: true }
      );
      setPoliza(response.data.content);
      setCliente(response.data.content.cliente);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setIsAuthenticated(false);
      } else {
        console.error("Error fetching policy data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [polizaId]);

  useEffect(() => {
    fetchPoliza();
  }, [fetchPoliza]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="w-full h-full px-5 py-4 flex flex-col">
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      <IconTitle
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-file-earmark-medical-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-3 2v.634l.549-.317a.5.5 0 1 1 .5.866L7 7l.549.317a.5.5 0 1 1-.5.866L6.5 7.866V8.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L5 7l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V5.5a.5.5 0 1 1 1 0m-2 4.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1m0 2h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
          </svg>
        }
      >
        Póliza {poliza?.noPoliza}
      </IconTitle>
      <div className="w-full h-full py-5">
        {cliente && <NPClienteInfo cliente={cliente} />}
        {poliza && (
          <>
            <PolizaNumberVigenciaSection
              noPoliza={poliza.noPoliza}
              emision={poliza.emision}
              inicioVigencia={poliza.inicioVigencia}
              finVigencia={poliza.finVigencia}
            />
            <PolizaAseguradoraSection
              aseguradora={poliza.aseguradora}
              agente={poliza.agente}
              vendedor={poliza.vendedor}
              ramo={poliza.ramo}
            />
            <LabelAndData label="Bien Asegurado">
              {poliza.bienAsegurado}
            </LabelAndData>
            <PolizaPrimasSection
              primas={{
                primaNeta: poliza.primaNeta,
                expedicion: poliza.expedicion || 0,
                financiamiento: poliza.financiamiento || 0,
                otros: poliza.otros || 0,
                iva: poliza.iva || 0,
                primaTotal: poliza.primaTotal,
              }}
              formaPago={poliza.formaPago}
            />
            <PolizaRenuevaReexpideSection
              renueva={poliza.renueva}
              reexpide={poliza.reexpide}
              renovacion={poliza.renovacion}
              reexpedicion={poliza.reexpedicion}
              fechaCancelacion={poliza.fechaCancelacion || undefined}
            />
            <ActionButton
              color="blue"
              size="lg"
              onClick={() => setShowEndosos(true)}
            >
              Ver Endosos
            </ActionButton>
            {showEndosos && (
              <EndososDialog
                polizaId={poliza.id}
                noPoliza={poliza.noPoliza}
                onClose={() => {
                  setShowEndosos(false);
                  fetchPoliza();
                }}
                aseguradora={poliza.aseguradora}
                formaPago={poliza.formaPago}
                polizaInicioVigencia={poliza.inicioVigencia}
                polizaFinVigencia={poliza.finVigencia}
              />
            )}
            {poliza.recibos && (
              <PolizaRecibosSection
                recibos={poliza.recibos}
                polizaId={poliza.id}
              />
            )}
            <PolizaAccionesSection poliza={poliza} />
          </>
        )}
      </div>
    </div>
  );
};

export default Poliza;
