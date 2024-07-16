import { useState, useEffect, useCallback, FormEvent } from "react";
import FormTextInput from "../utils/FormTextInput";
import { Navigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  AgenteInterface,
  AseguradoraInterface,
  RamoInterface,
  VendedorInterface,
} from "../../types/interfaces";
import Loading from "../utils/Loading";
import FormSelectInput from "../utils/FormSelectInput";
import NumberVigenciaSection from "./form/NumberVigenciaSection";
import AseguradoraSection from "./form/AseguradoraSection";

const NuevaPolizaForm = () => {
  const { id: clienteId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);
  const [agentes, setAgentes] = useState<AgenteInterface[]>([]);
  const [vendedores, setVendedores] = useState<VendedorInterface[]>([]);
  const [ramos, setRamos] = useState<RamoInterface[]>([]);

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
    <>
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
            <div className="flex flex-col md:flex-row mb-4">
              <div className="px-2 md:w-1/6">
                <FormSelectInput
                  name="moneda"
                  label="Moneda"
                  options={[
                    { value: "MXN", name: "MXN" },
                    { value: "USD", name: "USD" },
                    { value: "UDI", name: "MXN" },
                  ]}
                />
              </div>
              <div className="px-2 md:w-1/6"></div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default NuevaPolizaForm;
