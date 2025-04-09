import Dropdown from "../../utils/Dropdown";
import { useContext, useState, useCallback, useEffect } from "react";
import { PolizasContext } from "../../../store/polizas-context";
import {
  AseguradoraInterface,
  AgenteInterface,
} from "../../../types/interfaces";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import Modal from "../../utils/Modal";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";

const AseguradoraDropdown = () => {
  const polizasContext = useContext(PolizasContext);

  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);
  const [agentes, setAgentes] = useState<AgenteInterface[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;
  const fetchAseguradoras = useCallback(async () => {
    setIsLoading(true);
    try {
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

  const fetchAgentes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/agentes`, {
        params: { aseguradora: polizasContext.params.aseguradora },
        withCredentials: true,
      });
      setAgentes(response.data.content);
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
  }, [polizasContext.params.aseguradora]);

  useEffect(() => {
    fetchAseguradoras();
  }, []);

  useEffect(() => {
    fetchAgentes();
  }, [fetchAgentes]);

  const handleAseguradoraCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = event.target;
    let newAseguradora = [...(polizasContext.params.aseguradora || [])];

    if (id === "0") {
      if (checked) {
        newAseguradora = [];
      }
    } else {
      if (checked) {
        newAseguradora.push(parseInt(id));
      } else {
        newAseguradora = newAseguradora.filter(
          (aseguradora) => aseguradora !== parseInt(id)
        );
      }
    }

    polizasContext.setParams({
      ...polizasContext.params,
      aseguradora: newAseguradora,
    });
  };

  const handleAgenteCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = event.target;
    let newAgente = [...(polizasContext.params.agente || [])];

    if (id === "0") {
      if (checked) {
        newAgente = [];
      }
    } else {
      if (checked) {
        newAgente.push(parseInt(id));
      } else {
        newAgente = newAgente.filter((agente) => agente !== parseInt(id));
      }
    }

    polizasContext.setParams({
      ...polizasContext.params,
      agente: newAgente,
    });
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {isError && (
        <ErrorModal
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <div className="flex items-center">
        <Dropdown title="Aseguradora" text right full>
          <div className="w-44 text-gray-800">
            <div className="hover:font-semibold flex items-center">
              <input
                type="checkbox"
                id="0"
                checked={
                  polizasContext.params.aseguradora?.length === 0 || false
                }
                onChange={handleAseguradoraCheckboxChange}
              />
              <label htmlFor="0" className="pl-3 w-full">
                Todas
              </label>
            </div>
            {aseguradoras.map((aseguradora) => (
              <div className="hover:font-semibold" key={aseguradora.id}>
                <input
                  type="checkbox"
                  id={`${aseguradora.id}`}
                  onChange={handleAseguradoraCheckboxChange}
                  checked={
                    polizasContext.params.aseguradora?.includes(
                      aseguradora.id
                    ) || false
                  }
                />
                <label htmlFor={`${aseguradora.id}`} className="pl-3">
                  {aseguradora.aseguradora}
                </label>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
      <div className="flex items-center">
        <Dropdown title="Agente" text right full>
          <div className="w-44 text-gray-800">
            <div className="hover:font-semibold flex items-center">
              <input
                type="checkbox"
                id="0"
                checked={polizasContext.params.agente?.length === 0 || false}
                onChange={handleAgenteCheckboxChange}
              />
              <label htmlFor="0" className="pl-3 w-full">
                Todos
              </label>
            </div>
            {agentes.map((agente) => (
              <div
                className="hover:font-semibold flex items-center"
                key={agente.id}
              >
                <input
                  type="checkbox"
                  id={`${agente.id}`}
                  onChange={handleAgenteCheckboxChange}
                  checked={
                    polizasContext.params.agente?.includes(agente.id) || false
                  }
                />
                <label htmlFor={`${agente.id}`} className="pl-3 w-full">
                  {agente.clave}-{agente.nombre}
                </label>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default AseguradoraDropdown;
