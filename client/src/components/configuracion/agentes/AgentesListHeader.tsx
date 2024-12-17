import { useState, useCallback, useEffect } from "react";
import FormSelectInput from "../../utils/FormSelectInput";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { AseguradoraInterface } from "../../../types/interfaces";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";

const AgentesListHeader = () => {
  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAseguradoras = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/aseguradoras",
        { withCredentials: true }
      );
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
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      {isLoading && <Loading />}
      {isError && (
        <ErrorModal
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <div className="w-full h-auto p-2 bg-blue-950 text-neutral-200">
        <div className="max-w-96">
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
          />
        </div>
      </div>
    </>
  );
};

export default AgentesListHeader;
