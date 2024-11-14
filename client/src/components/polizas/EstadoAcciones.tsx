import { useContext, useState } from "react";
import { PolizaInterface, Recibo } from "../../types/interfaces";
import ActionButton from "../utils/ActionButton";
import { Navigate } from "react-router-dom";
import AccionesDropdown from "./Dropdown/AccionesDropdown";
import { PolizaRecibosContext } from "../../store/poliza-recibos-context";
import PolizaRecibosDialog from "./PolizaRecibosDialog";
import axios, { AxiosError } from "axios";
import ErrorModal from "../utils/ErrorModal";
import ConfirmModal from "../utils/ConfirmModal";
import { PolizasContext } from "../../store/polizas-context";
import EndososDialog from "../endosos/EndososDialog";
import moment from "moment";

const EstadoAcciones = ({ poliza }: { poliza: PolizaInterface }) => {
  const polizasContext = useContext(PolizasContext);

  const [editNavigate, setEditNavigate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [showRecibosDialog, setShowRecibosDialog] = useState(false);
  const [recibos, setRecibos] = useState<Recibo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showEndosos, setShowEndosos] = useState(false);

  const [hasError, setHasError] = useState(false);

  const [renovarNavigate, setRenovarNavigate] = useState(false);

  if (editNavigate) return <Navigate to={`/polizas/${poliza.id}/editar`} />;
  if (renovarNavigate) return <Navigate to={`/polizas/${poliza.id}/renovar`} />;

  const fetchRecibos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/polizas/${poliza.id}/recibos`,
        { withCredentials: true }
      );
      setRecibos(response.data.content);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
      setShowRecibosDialog(false);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onPay = async (id: number, date: Date) => {
    setIsLoading(true);
    try {
      await axios.patch(
        `http://localhost:3000/api/recibos/${id}/pagar`,
        {
          fechaPago: date,
        },
        {
          withCredentials: true,
        }
      );
      fetchRecibos();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
        setShowRecibosDialog(false);
        setHasError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onAnular = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.patch(
        `http://localhost:3000/api/recibos/${id}/anular-pago`,
        {},
        { withCredentials: true }
      );
      fetchRecibos();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
        setShowRecibosDialog(false);
        setHasError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const vencida =
    moment().isAfter(moment(poliza.finVigencia)) && !poliza.renovacionId;
  console.log(vencida);

  const onClose = () => {
    setShowRecibosDialog(false);
    polizasContext.fetchPolizas();
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="col-start-4 md:col-start-11 col-span-full px-2 flex flex-col justify-around md:flex-row md:justify-normal items-center">
        <p
          className={`rounded w-28 text-center px-1 text-neutral-100 ${
            poliza.fechaCancelacion
              ? "bg-red-700"
              : poliza.reexpedicionId
              ? "bg-purple-900"
              : poliza.vencida
              ? "bg-orange-900"
              : poliza.renovacionId
              ? "bg-blue-800"
              : vencida
              ? "bg-gray-700"
              : "bg-emerald-700"
          }`}
        >
          {poliza.fechaCancelacion
            ? "Cancelada"
            : poliza.reexpedicionId
            ? "Reexpedida"
            : poliza.vencida
            ? "Vencida"
            : poliza.renovacionId
            ? "Renovada"
            : vencida
            ? "No Renovada"
            : "Vigente"}
        </p>
        <div className="flex flex-wrap">
          <ActionButton
            title="Editar Póliza"
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
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </ActionButton>
          <PolizaRecibosContext.Provider
            value={{
              showModal: showRecibosDialog,
              onClose: onClose,
              isLoading: isLoading,
              recibos: recibos,
              fetchRecibos: fetchRecibos,
              onPay: onPay,
              onAnular: onAnular,
            }}
          >
            <ActionButton
              title="Recibos"
              onClick={() => {
                setShowRecibosDialog(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cash-coin"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
              </svg>
            </ActionButton>
            {showRecibosDialog && (
              <PolizaRecibosDialog
                noPoliza={poliza.noPoliza}
                contratante={poliza.cliente.nombre}
              />
            )}
            {hasError && (
              <ErrorModal
                onClick={() => {
                  setHasError(false);
                }}
              />
            )}
          </PolizaRecibosContext.Provider>
          <ActionButton
            title={
              poliza.renovacionId ? "Póliza ya renovada" : "Renovar Póliza"
            }
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
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
          </ActionButton>
          <ActionButton
            title="Endosos"
            onClick={() => {
              setShowEndosos(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-earmark-diff-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8 6a.5.5 0 0 1 .5.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5A.5.5 0 0 1 8 6m-2.5 6.5A.5.5 0 0 1 6 12h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5" />
            </svg>
          </ActionButton>
        </div>
        <AccionesDropdown poliza={poliza} />
      </div>
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
            Los recibos pagados y endosos serán eliminados
          </p>
        </ConfirmModal>
      )}
      {showEndosos && (
        <EndososDialog
          polizaId={poliza.id}
          noPoliza={poliza.noPoliza}
          onClose={() => {
            setShowEndosos(false);
          }}
          aseguradora={poliza.aseguradora}
          formaPago={poliza.formaPago}
          polizaInicioVigencia={poliza.inicioVigencia}
          polizaFinVigencia={poliza.finVigencia}
        />
      )}
    </>
  );
};

export default EstadoAcciones;
