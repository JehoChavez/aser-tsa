import { useState, useEffect, useCallback } from "react";
import FormTextInput from "../utils/FormTextInput";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { AseguradoraInterface } from "../../types/interfaces";
import Loading from "../utils/Loading";
import FormSelectInput from "../utils/FormSelectInput";

const NuevaPolizaForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);

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
          <form className="mt-2">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 px-2">
                <FormTextInput name="noPoliza" label="Número de Póliza" />
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
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NuevaPolizaForm;
