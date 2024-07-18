import { useState, useEffect, useCallback, FormEvent } from "react";
import FormTextInput from "../utils/FormTextInput";
import { Navigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  AgenteInterface,
  AseguradoraInterface,
  RamoInterface,
  Recibo,
  VendedorInterface,
} from "../../types/interfaces";
import Loading from "../utils/Loading";
import NumberVigenciaSection from "./form/NumberVigenciaSection";
import AseguradoraSection from "./form/AseguradoraSection";
import PagoSection from "./form/PagoSection";
import { FormRecibosContext } from "../../store/form-recibos-context";

const NuevaPolizaForm = () => {
  const { id: clienteId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);
  const [agentes, setAgentes] = useState<AgenteInterface[]>([]);
  const [vendedores, setVendedores] = useState<VendedorInterface[]>([]);
  const [ramos, setRamos] = useState<RamoInterface[]>([]);

  const [recibos, setRecibos] = useState<Recibo[]>([]);
  const [aseguradora, setAseguradora] = useState<AseguradoraInterface>({
    id: 1,
    aseguradora: "Default",
  });

  const today = new Date();
  const [inicioVigencia, setInicioVigencia] = useState(today);
  const [finVigencia, setFinVigencia] = useState(
    new Date(new Date().setFullYear(today.getFullYear() + 1))
  );

  const onInicioVigenciaChange = (date: Date) => {
    setInicioVigencia(date);
  };
  const onFinVigenciaChange = (date: Date) => {
    setFinVigencia(date);
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

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(fd.entries());
    data.clienteId = clienteId as string;

    console.log(data);
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <FormRecibosContext.Provider
      value={{
        recibos: recibos,
        aseguradora: aseguradora,
        inicioVigencia: inicioVigencia,
        finVigencia: finVigencia,
        onInicioVigenciaChange: onInicioVigenciaChange,
        onFinVigenciaChange: onFinVigenciaChange,
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
          <form className="mt-2" onSubmit={submitHandler}>
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
              />
            </div>
            <PagoSection />
            <button>Submit</button>
          </form>
        </div>
      )}
    </FormRecibosContext.Provider>
  );
};

export default NuevaPolizaForm;
