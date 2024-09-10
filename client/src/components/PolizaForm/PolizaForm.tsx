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

const PolizaForm = () => {
  const { id: clienteId } = useParams();

  const [success, setSuccess] = useState(false);
  const [successNavigate, setSuccessNavigate] = useState(false);

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
  const [formaPago, setFormaPago] = useState(1);

  const today = new Date();
  const [inicioVigencia, setInicioVigencia] = useState(today);
  const [finVigencia, setFinVigencia] = useState(
    new Date(new Date().setFullYear(today.getFullYear() + 1))
  );
  const [months, setMonths] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [primas, setPrimas] = useState<PrimasInterface>({
    primaNeta: 0,
    expedicion: 0,
    financiamiento: 0,
    otros: 0,
    iva: 0,
    primaTotal: 0,
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
    const response = await axios.post(
      "http://localhost:3000/api/polizas",
      payload,
      { withCredentials: true }
    );
    console.log(response);
    if (response.data.status === 201) {
      setSuccess(true);
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(fd.entries()) as unknown as PolizaInterface;
    data.clienteId = clienteId;

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

    postPoliza(payload);
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
    }
  }, [success]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (successNavigate) return <Navigate to={`/clientes/${clienteId}`} />;

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
      <h4 className="text-center text-3xl mt-3">Póliza creada exitosamente</h4>
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
            <NumberVigenciaSection />
            <AseguradoraSection
              aseguradoras={aseguradoras}
              agentes={agentes}
              vendedores={vendedores}
              ramos={ramos}
            />
            <div className="px-2 mb-4">
              <FormTextInput
                name="bienAsegurado"
                label="Bien Asegurado"
                placeholder="Unidad, Producto, Titular, Etc."
                required
              />
            </div>
            <PagoSection />
          </form>
          <Recibos />
          <div className="w-full flex justify-end">
            <ActionButton onClick={clickHandler} color="blue" size="lg">
              Guardar
            </ActionButton>
          </div>
        </div>
      )}
      {success && successModal}
    </FormRecibosContext.Provider>
  );
};

export default PolizaForm;
