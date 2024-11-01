import { FormEvent, useRef, useState, useContext } from "react";
import ActionButton from "../utils/ActionButton";
import EndosoVigenciaSection from "./EndosoVigenciaSection";
import {
  AseguradoraInterface,
  EndosoInterface,
  PostEndosoPayload,
  PrimasInterface,
  Recibo,
} from "../../types/interfaces";
import moment from "moment";
import { FormRecibosContext } from "../../store/form-recibos-context";
import FormTextInput from "../utils/FormTextInput";
import PagoSection from "../PolizaForm/PagoSection";
import FormSection from "../utils/FormSection";
import Recibos from "../PolizaForm/recibos/Recibos";
import Modal from "../utils/Modal";
import ErrorModal from "../utils/ErrorModal";
import Loading from "../utils/Loading";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { EndososContext } from "../../store/endosos-context";

const EndosoForm = ({
  polizaId,
  type,
  onCancel,
  aseguradora,
  formaPago,
  endoso,
  polizaInicioVigencia,
  polizaFinVigencia,
  onSuccess,
  onError,
}: {
  polizaId: number;
  type: "A" | "B" | "D";
  onCancel: () => void;
  aseguradora: AseguradoraInterface;
  formaPago: number;
  endoso?: EndosoInterface;
  polizaInicioVigencia: string;
  polizaFinVigencia: string;
  onSuccess: () => void;
  onError: () => void;
}) => {
  const endososContext = useContext(EndososContext);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const [nrOfRecibos, setNrOfRecibos] = useState(0);

  const addNrOfRecibos = () => {
    setNrOfRecibos((nr) => nr + 1);
  };

  const subNrOfRecibos = () => {
    if (nrOfRecibos > 1) {
      setNrOfRecibos((nr) => nr - 1);
    }
  };

  const setNr = (nr: number) => {
    setNrOfRecibos(nr);
  };

  const [recibos, setRecibos] = useState<Recibo[]>([]);

  const today = new Date();
  const [endosoInicioVigencia, setEndosoInicioVigencia] = useState(
    endoso ? moment(endoso.inicioVigencia).toDate() : today
  );
  const [endosoFinVigencia, setEndosoFinVigencia] = useState(
    endoso
      ? moment(endoso.finVigencia).toDate()
      : moment(polizaFinVigencia).toDate()
  );

  const [months, setMonths] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [primas, setPrimas] = useState<PrimasInterface>({
    primaNeta: endoso ? endoso.primaNeta || 0 : 0,
    expedicion: endoso ? endoso.expedicion || 0 : 0,
    financiamiento: endoso ? endoso.financiamiento || 0 : 0,
    otros: endoso ? endoso.otros || 0 : 0,
    iva: endoso ? endoso.iva || 0 : 0,
    primaTotal: endoso ? endoso.primaTotal || 0 : 0,
  });

  const onPrimasChange = (primas: PrimasInterface) => {
    setPrimas(primas);
  };

  const onInicioVigenciaChange = (date: Date) => {
    const newDate = new Date(date.setDate(date.getDate() + 1));
    setEndosoInicioVigencia(newDate);
  };
  const onFinVigenciaChange = (date: Date) => {
    setEndosoFinVigencia(date);
  };
  const calcMonthsDiff = () => {
    const inicioDate = moment(endosoInicioVigencia);
    const finDate = moment(endosoFinVigencia);

    const monthDiff = Math.ceil(finDate.diff(inicioDate, "months", true));
    setMonths(monthDiff);
  };
  const onFormaPagoChange = () => {};
  const onRecibosChange = (recibos: Recibo[]) => {
    setRecibos(recibos);
  };
  const onSubtotalChange = (value: number) => {
    setSubtotal(value);
  };

  const postEndoso = async (payload: PostEndosoPayload) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/endosos",
        payload,
        { withCredentials: true }
      );
      if (response.data.status === 201) {
        setSuccess(true);
        endososContext.fetchEndosos();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        } else {
          setError(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(fd.entries()) as unknown as EndosoInterface;
    data.polizaId = polizaId;

    const payload: PostEndosoPayload = {
      endoso: {
        ...data,
        tipo: type,
        primaNeta: Number(data.primaNeta),
        expedicion: Number(data.expedicion),
        financiamiento: Number(data.financiamiento),
        otros: Number(data.otros),
        iva: Number(data.iva),
        primaTotal: Number(data.primaTotal),
      },
      recibos,
    };

    if (endoso) {
      console.log(payload);
    } else {
      postEndoso(payload);
    }
  };

  const clickHandler = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const successModal = (
    <Modal size="small">
      <div className="w-full flex justify-center mt-3 text-green-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          fill="currentColor"
          className="bi bi-check-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
        </svg>
      </div>
      <h4 className="text-center text-3xl mt-3">
        Endoso {endoso ? "editado" : "creado"} exitosamente
      </h4>
      <div className="w-full flex justify-center mt-2">
        <ActionButton onClick={onSuccess} color="blue" size="lg">
          OK
        </ActionButton>
      </div>
    </Modal>
  );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col h-full">
      <FormRecibosContext.Provider
        value={{
          nrOfRecibos,
          recibos,
          aseguradora,
          formaPago,
          polizaInicioVigencia: moment(polizaInicioVigencia).toDate(),
          polizaFinVigencia: moment(polizaFinVigencia).toDate(),
          endosoInicioVigencia,
          endosoFinVigencia,
          monthsDiff: months,
          subtotalWoExp: subtotal,
          primas,
          addNrOfRecibos,
          subNrOfRecibos,
          setNrOfRecibos: setNr,
          setPrimas: onPrimasChange,
          setSubtotalWoExp: onSubtotalChange,
          setRecibos: onRecibosChange,
          setFormaPago: onFormaPagoChange,
          calcMonthsDiff,
          onEndosoInicioVigenciaChange: onInicioVigenciaChange,
          onEndosoFinVigenciaChange: onFinVigenciaChange,
        }}
      >
        {isLoading ? (
          <div className="w-full h-full">
            <Loading />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col">
              <form ref={formRef} onSubmit={submitHandler}>
                <EndosoVigenciaSection />
                <FormSection>
                  <FormTextInput
                    name="concepto"
                    label="Concepto"
                    defaultValue={endoso?.concepto}
                    required
                  />
                </FormSection>
                {type !== "B" && <PagoSection endoso />}
              </form>
              <div className="h-full">
                <Recibos endoso />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <ActionButton color="red" size="lg" onClick={onCancel}>
                Cancelar
              </ActionButton>
              <ActionButton color="blue" size="lg" onClick={clickHandler}>
                Guardar
              </ActionButton>
            </div>
          </div>
        )}

        {success && successModal}
        {error && <ErrorModal onClick={onError} />}
      </FormRecibosContext.Provider>
    </div>
  );
};

export default EndosoForm;
