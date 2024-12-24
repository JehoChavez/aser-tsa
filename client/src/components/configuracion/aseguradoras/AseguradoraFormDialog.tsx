import Modal from "../../utils/Modal";
import FormTextInput from "../../utils/FormTextInput";
import FormNumberInput from "../../utils/FormNumberInput";
import ActionButton from "../../utils/ActionButton";
import { useCallback, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { AseguradorasContext } from "../../../store/aseguradoras-context";
import { AseguradoraInterface } from "../../../types/interfaces";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";
import SuccessModal from "../../utils/SuccessModal";

const AseguradoraFormDialog = ({
  onCancel,
  onSuccess,
  aseguradora,
}: {
  onCancel: () => void;
  onSuccess?: () => void;
  aseguradora?: AseguradoraInterface;
}) => {
  const aseguradorasContext = useContext(AseguradorasContext);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const postAseguradora = useCallback(async (payload: AseguradoraInterface) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/aseguradoras",
        payload,
        { withCredentials: true }
      );
      if (response.status === 201) {
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
  }, []);

  const updateAseguradora = useCallback(
    async (payload: AseguradoraInterface) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/aseguradoras/${aseguradora?.id}`,
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
    [aseguradora]
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(
      fd.entries()
    ) as unknown as AseguradoraInterface;

    if (!data.plazoPrimer) data.plazoPrimer = 0;
    if (!data.plazoSubsecuentes) data.plazoSubsecuentes = 0;
    if (data.comentarios === "") data.comentarios = undefined;

    if (aseguradora) {
      updateAseguradora(data);
    } else {
      postAseguradora(data);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <Modal size="medium">
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        {aseguradora ? "Editar" : "Crear"} aseguradora
      </h3>
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
      {success && (
        <SuccessModal
          type="guardado"
          onOk={() => {
            aseguradorasContext.fetchAseguradoras();
            onSuccess && onSuccess();
          }}
        />
      )}
      <form onSubmit={submitHandler}>
        <div className="w-full flex flex-col my-2">
          <FormTextInput
            name="aseguradora"
            label="Aseguradora"
            required
            defaultValue={aseguradora?.aseguradora}
          />
          <div className="w-full md:flex mt-2">
            <div className="w-full xl:w-1/3 md:mr-10">
              <FormNumberInput
                name="plazoPrimer"
                label="Plazo Primer Recibo"
                defaultVal={aseguradora?.plazoPrimer}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <FormNumberInput
                name="plazoSubsecuentes"
                label="Plazo Recibos Subsecuentes"
                defaultVal={aseguradora?.plazoSubsecuentes}
              />
            </div>
          </div>
        </div>
        <label htmlFor="comentarios">Comentarios</label>
        <textarea
          id="comentarios"
          name="comentarios"
          rows={7}
          className="w-full rounded bg-neutral-100 border-gray-400 focus:ring-blue-400 focus:ring-2"
          defaultValue={aseguradora?.comentarios}
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

export default AseguradoraFormDialog;
