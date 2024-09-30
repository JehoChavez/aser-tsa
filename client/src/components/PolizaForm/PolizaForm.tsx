import { useState, useEffect, useCallback, FormEvent, useRef } from "react";
import FormTextInput from "../utils/FormTextInput";
import { Navigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  AgenteInterface,
  AseguradoraInterface,
  PolizaInterface,
  PostPolizaPayload,
  PrimasInterface,
  RamoInterface,
  Recibo,
  VendedorInterface,
} from "../../types/interfaces";
import Loading from "../utils/Loading";
import NumberVigenciaSection from "../PolizaForm/NumberVigenciaSection";
import AseguradoraSection from "../PolizaForm/AseguradoraSection";
import PagoSection from "../PolizaForm/PagoSection";
import { FormRecibosContext } from "../../store/form-recibos-context";
import moment from "moment";
import Recibos from "./recibos/Recibos";
import ActionButton from "../utils/ActionButton";
import Modal from "../utils/Modal";
import ErrorModal from "../utils/ErrorModal";

const PolizaForm = ({
  poliza,
  renovacion,
}: {
  poliza?: PolizaInterface;
  renovacion?: boolean;
}) => {
  const { id: idParam } = useParams();

  const [success, setSuccess] = useState(false);
  const [successNavigate, setSuccessNavigate] = useState(false);

  const [error, setError] = useState(false);
  const [errorNavigate, setErrorNavigate] = useState(false);

  const [existe, setExiste] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);
  const [agentes, setAgentes] = useState<AgenteInterface[]>([]);
  const [vendedores, setVendedores] = useState<VendedorInterface[]>([]);
  const [ramos, setRamos] = useState<RamoInterface[]>([]);

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
  const [aseguradora, setAseguradora] = useState<AseguradoraInterface>({
    id: 1,
    aseguradora: "Default",
  });
  const [formaPago, setFormaPago] = useState(
    (poliza?.formaPago as number) || 1
  );

  const today = new Date();
  const [inicioVigencia, setInicioVigencia] = useState(
    poliza
      ? renovacion
        ? moment(poliza.finVigencia).toDate()
        : moment(poliza.inicioVigencia).toDate()
      : today
  );
  const [finVigencia, setFinVigencia] = useState(
    poliza
      ? renovacion
        ? moment(poliza.finVigencia).add(1, "y").toDate()
        : moment(poliza.finVigencia).toDate()
      : moment(today).add(1, "y").toDate()
  );
  const [months, setMonths] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [primas, setPrimas] = useState<PrimasInterface>({
    primaNeta: poliza ? (renovacion ? 0 : poliza.primaNeta || 0) : 0,
    expedicion: poliza ? (renovacion ? 0 : poliza.expedicion || 0) : 0,
    financiamiento: poliza ? (renovacion ? 0 : poliza.financiamiento || 0) : 0,
    otros: poliza ? (renovacion ? 0 : poliza.otros || 0) : 0,
    iva: poliza ? (renovacion ? 0 : poliza.iva || 0) : 0,
    primaTotal: poliza ? (renovacion ? 0 : poliza.primaTotal || 0) : 0,
  });

  const onPrimasChange = (primas: PrimasInterface) => {
    setPrimas(primas);
  };

  const onInicioVigenciaChange = (date: Date) => {
    const newDate = new Date(date.setDate(date.getDate() + 1));
    setInicioVigencia(newDate);
  };
  const onFinVigenciaChange = (date: Date) => {
    setFinVigencia(date);
  };
  const calcMonthsDiff = () => {
    const inicioDate = moment(inicioVigencia);
    const finDate = moment(finVigencia);

    const monthDiff = finDate.diff(inicioDate, "months");
    setMonths(monthDiff);
  };
  const onFormaPagoChange = (value: number) => {
    setFormaPago(value);
  };
  const onRecibosChange = (recibos: Recibo[]) => {
    setRecibos(recibos);
  };
  const onSubtotalChange = (value: number) => {
    setSubtotal(value);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const aseguradorasResponse = await axios.get(
        "http://localhost:3000/api/aseguradoras",
        {
          withCredentials: true,
        }
      );
      setAseguradoras(aseguradorasResponse.data.content);
      setAseguradora(aseguradorasResponse.data.content[0]);

      const agentesResponse = await axios.get(
        "http://localhost:3000/api/agentes",
        {
          withCredentials: true,
        }
      );
      setAgentes(agentesResponse.data.content);

      const vendedoresResponse = await axios.get(
        "http://localhost:3000/api/vendedores",
        { withCredentials: true }
      );
      setVendedores(vendedoresResponse.data.content);

      const ramosResponse = await axios.get("http://localhost:3000/api/ramos", {
        withCredentials: true,
      });
      setRamos(ramosResponse.data.content);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const postPoliza = async (payload: PostPolizaPayload) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/polizas",
        payload,
        { withCredentials: true }
      );
      if (response.data.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        } else if (error.response?.data.status === "poliza ya existente") {
          setExiste(true);
        } else {
          setError(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updatePoliza = async (payload: PostPolizaPayload) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/polizas/${idParam}`,
        payload,
        { withCredentials: true }
      );
      if (response.data.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
      setError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renovarPoliza = async (payload: PostPolizaPayload) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/polizas/${idParam}/renovar`,
        payload,
        { withCredentials: true }
      );
      if (response.data.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(fd.entries()) as unknown as PolizaInterface;
    data.clienteId = poliza ? poliza.cliente.id : idParam;

    const payload: PostPolizaPayload = {
      poliza: {
        ...data,
        primaNeta: Number(data.primaNeta),
        expedicion: Number(data.expedicion),
        financiamiento: Number(data.financiamiento),
        otros: Number(data.otros),
        iva: Number(data.iva),
        primaTotal: Number(data.primaTotal),
      },
      recibos,
    };

    if (poliza) {
      if (renovacion) {
        renovarPoliza(payload);
      } else updatePoliza(payload);
    } else {
      postPoliza(payload);
    }
  };

  const clickHandler = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccessNavigate(true);
      }, 5000);

      return () => clearTimeout(timer);
    } else if (error) {
      const timer = setTimeout(() => {
        setErrorNavigate(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (successNavigate)
    return (
      <Navigate to={`/clientes/${poliza ? poliza.cliente.id : idParam}`} />
    );
  if (errorNavigate) return <Navigate to="/polizas" />;

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
        Póliza {poliza ? (renovacion ? "renovada" : "editada") : "creada"}{" "}
        exitosamente
      </h4>
      <p className="text-center text-lg">
        Serás redirigido a la página del cliente
      </p>
      <div className="w-full flex justify-center mt-2">
        <ActionButton
          onClick={() => {
            setSuccessNavigate(true);
          }}
          color="blue"
          size="lg"
        >
          OK
        </ActionButton>
      </div>
    </Modal>
  );

  const existeModal = (
    <Modal size="small">
      <div className="w-full flex justify-center mt-3 text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          fill="currentColor"
          className="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
        </svg>
      </div>
      <h4 className="text-center text-3xl mt-3">
        Número de póliza ya registrado
      </h4>
      <div className="w-full flex justify-center mt-2">
        <ActionButton
          onClick={() => {
            setExiste(false);
          }}
          color="blue"
          size="lg"
        >
          OK
        </ActionButton>
      </div>
    </Modal>
  );

  return (
    <FormRecibosContext.Provider
      value={{
        nrOfRecibos: nrOfRecibos,
        recibos: recibos,
        aseguradora: aseguradora,
        formaPago: formaPago,
        polizaInicioVigencia: inicioVigencia,
        polizaFinVigencia: finVigencia,
        monthsDiff: months,
        subtotalWoExp: subtotal,
        primas: primas,
        addNrOfRecibos: addNrOfRecibos,
        subNrOfRecibos: subNrOfRecibos,
        setNrOfRecibos: setNr,
        setPrimas: onPrimasChange,
        setSubtotalWoExp: onSubtotalChange,
        setRecibos: onRecibosChange,
        calcMonthsDiff: calcMonthsDiff,
        setFormaPago: onFormaPagoChange,
        onPolizaInicioVigenciaChange: onInicioVigenciaChange,
        onPolizaFinVigenciaChange: onFinVigenciaChange,
      }}
    >
      {isLoading ? (
        <div className="w-full h-full">
          <Loading />
        </div>
      ) : (
        <div className="p-2 mt-2">
          <h2 className="border-b text-xl text-gray-600 font-bold">
            Datos de la Póliza
          </h2>
          <form className="mt-2" onSubmit={submitHandler} ref={formRef}>
            <NumberVigenciaSection
              noPoliza={poliza?.noPoliza}
              fechaEmision={
                poliza
                  ? renovacion
                    ? undefined
                    : moment(poliza.emision).toDate()
                  : undefined
              }
            />
            <AseguradoraSection
              aseguradoras={aseguradoras}
              agentes={agentes}
              vendedores={vendedores}
              ramos={ramos}
              aseguradora={poliza?.aseguradora.id}
              agente={poliza?.agente.id}
              vendedor={poliza?.vendedor?.id}
              ramo={poliza?.ramo?.id}
            />
            <div className="px-2 mb-4">
              <FormTextInput
                name="bienAsegurado"
                label="Bien Asegurado"
                placeholder="Unidad, Producto, Titular, Etc."
                defaultValue={poliza?.bienAsegurado}
                required
              />
            </div>
            <PagoSection moneda={poliza?.moneda} />
          </form>
          <Recibos />
          <div className="w-full flex justify-between">
            <ActionButton
              onClick={() => {
                setSuccessNavigate(true);
              }}
              color="red"
              size="lg"
            >
              Cancelar
            </ActionButton>
            <ActionButton onClick={clickHandler} color="blue" size="lg">
              Guardar
            </ActionButton>
          </div>
        </div>
      )}
      {success && successModal}
      {error && (
        <ErrorModal
          onClick={() => {
            setErrorNavigate(true);
          }}
        />
      )}
      {existe && existeModal}
    </FormRecibosContext.Provider>
  );
};

export default PolizaForm;
