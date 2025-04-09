import Modal from "../../utils/Modal";
import FormTextInput from "../../utils/FormTextInput";
import FormSelectInput from "../../utils/FormSelectInput";
import ActionButton from "../../utils/ActionButton";
import { useCallback, useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { AgentesContext } from "../../../store/agentes-context";
import {
  AgenteInterface,
  AseguradoraInterface,
} from "../../../types/interfaces";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";
import SuccessModal from "../../utils/SuccessModal";

const AgenteFormDialog = ({
  onCancel,
  onSuccess,
  agente,
}: {
  onCancel: () => void;
  onSuccess?: () => void;
  agente?: AgenteInterface;
}) => {
  const agentesContext = useContext(AgentesContext);

  const [aseguradoras, setAseguradoras] = useState<AseguradoraInterface[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<undefined | String>(undefined);

  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchAseguradoras = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/aseguradoras`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setAseguradoras(response.data.content);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchAseguradoras();
  }, [fetchAseguradoras]);

  const postAgente = useCallback(async (payload: AgenteInterface) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/agentes`, payload, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
        setError(true);
        if (error.response?.data.message === "agente ya existente") {
          setMessage("El agente ya existe");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAgente = useCallback(
    async (payload: AgenteInterface) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `${baseUrl}/agentes/${agente?.id}`,
          payload,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setSuccess(true);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setIsAuthenticated(false);
          }
          setError(true);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [agente]
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries()) as unknown as AgenteInterface;

    if (data.comentarios === "") data.comentarios = undefined;

    if (agente) {
      updateAgente(data);
    } else {
      postAgente(data);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <Modal size="medium">
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        {agente ? "Editar" : "Crear"} agente
      </h3>
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {error && (
        <ErrorModal
          message={message}
          onClick={() => {
            setError(false);
          }}
        />
      )}
      {success && (
        <SuccessModal
          type="guardado"
          onOk={() => {
            agentesContext.fetchAgentes();
            onSuccess && onSuccess();
          }}
        />
      )}
      <form onSubmit={submitHandler}>
        <div className="w-full flex flex-col my-2">
          <FormTextInput
            name="nombre"
            label="Nombre"
            required
            defaultValue={agente?.nombre}
          />
        </div>
        <div className="w-full md:flex mt-2">
          <div className="w-full xl:w-1/3 md:mr-10">
            <FormTextInput
              name="clave"
              label="Clave"
              required
              defaultValue={agente?.clave}
            />
          </div>
          <div className="w-full xl:w-1/3">
            <FormSelectInput
              name="aseguradoraId"
              label="Aseguradora"
              required
              defaultVal={agente?.aseguradoraId}
              options={aseguradoras.map((aseguradora) => ({
                name: aseguradora.aseguradora,
                value: aseguradora.id,
              }))}
            />
          </div>
        </div>
        <label htmlFor="comentarios">Comentarios</label>
        <textarea
          id="comentarios"
          name="comentarios"
          rows={7}
          className="w-full rounded bg-neutral-100 border-gray-400 focus:ring-blue-400 focus:ring-2"
          defaultValue={agente?.comentarios || ""}
        />
        <div className="flex justify-between">
          <ActionButton color="red" size="lg" onClick={onCancel}>
            Cancelar
          </ActionButton>
          <ActionButton color="blue" size="lg">
            Guardar
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
};

export default AgenteFormDialog;
