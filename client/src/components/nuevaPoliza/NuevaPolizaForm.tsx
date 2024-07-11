import { useState, useEffect, useCallback, FormEvent } from "react";
import FormTextInput from "../utils/FormTextInput";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { AgenteInterface, AseguradoraInterface } from "../../types/interfaces";
import Loading from "../utils/Loading";
import FormSelectInput from "../utils/FormSelectInput";

const NuevaPolizaForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);
  const [selectedAseguradora, setSelectedAseguradora] = useState(1);
  const [agentes, setAgentes] = useState<AgenteInterface[]>([]);

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

    console.log(data);
  };

  const aseguradoraSelectHandler = (selected: string) => {
    setSelectedAseguradora(parseInt(selected));
  };

  const displayAgentes = agentes.filter(
    (agente) => agente.aseguradoraId === selectedAseguradora
  );

  const agenteOptions = displayAgentes.map((agente) => {
    return { value: agente.id, name: `${agente.clave} - ${agente.nombre}` };
  });

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
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 px-2">
                <FormTextInput
                  name="noPoliza"
                  label="Número de Póliza"
                  required
                />
              </div>
              <div className="md:w-1/4 px-2">
                <FormSelectInput
                  name="aseguradoraId"
                  label="Aseguradora"
                  options={aseguradoras.map((aseguradora) => {
                    return {
                      value: aseguradora.id,
                      name: aseguradora.aseguradora,
                    };
                  })}
                  onSelect={aseguradoraSelectHandler}
                />
              </div>
              <div className="md:w-1/4 px-2">
                <FormSelectInput
                  name="agenteId"
                  label="Agente"
                  options={agenteOptions}
                />
              </div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default NuevaPolizaForm;
