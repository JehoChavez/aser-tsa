import { useState, useCallback, useEffect, useContext } from "react";
import FormSelectInput from "../../utils/FormSelectInput";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { AseguradoraInterface } from "../../../types/interfaces";
import ErrorModal from "../../utils/ErrorModal";
import { AgentesContext } from "../../../store/agentes-context";

const AgentesListHeader = () => {
  const { setAseguradoraIds, setIsLoading } = useContext(AgentesContext);

  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isError, setIsError] = useState(false);

  const fetchAseguradoras = useCallback(async () => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${baseUrl}/aseguradoras`, {
        withCredentials: true,
      });
      setAseguradoras(response.data.content);
    } catch (error) {
      setIsError(true);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAseguradoras();
  }, [fetchAseguradoras]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      {isError && (
        <ErrorModal
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <div className="w-full h-auto p-2 bg-blue-950 text-neutral-200 rounded-b">
        <div className="max-w-96 mb-2">
          <FormSelectInput
            label="Aseguradora"
            name="aseguradora"
            options={[
              { name: "Todas", value: -1 },
              ...aseguradoras.map((aseguradora) => ({
                name: aseguradora.aseguradora,
                value: aseguradora.id,
              })),
            ]}
            onSelect={(selected) => {
              const selectedId = parseInt(selected);
              setAseguradoraIds(selectedId === -1 ? [] : [selectedId]);
            }}
          />
        </div>
        <div className="hidden md:grid md:grid-cols-6">
          <p className="hidden md:block">Aseguradora</p>
          <p className="hidden md:block text-center">Clave</p>
          <p className="hidden md:block text-center">Nombre</p>
          <p className="hidden md:block text-center col-span-2">Comentarios</p>
          <p className="hidden md:block text-center">Acciones</p>
        </div>
      </div>
    </>
  );
};

export default AgentesListHeader;
