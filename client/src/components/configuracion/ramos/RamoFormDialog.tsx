import Modal from "../../utils/Modal";
import FormTextInput from "../../utils/FormTextInput";
import ActionButton from "../../utils/ActionButton";
import { useCallback, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { RamosContext } from "../../../store/ramos-context";
import { RamoInterface } from "../../../types/interfaces";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";
import SuccessModal from "../../utils/SuccessModal";

const RamoFormDialog = ({
  onCancel,
  onSuccess,
  ramo,
}: {
  onCancel: () => void;
  onSuccess?: () => void;
  ramo?: RamoInterface;
}) => {
  const ramosContext = useContext(RamosContext);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const postRamo = useCallback(async (payload: RamoInterface) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/ramos`, payload, {
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
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRamo = useCallback(
    async (payload: RamoInterface) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `${baseUrl}/ramos/${ramo?.id}`,
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
    [ramo]
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries()) as unknown as RamoInterface;

    if (ramo) {
      updateRamo(data);
    } else {
      postRamo(data);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <Modal size="small">
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        {ramo ? "Editar" : "Crear"} Ramo
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
            ramosContext.fetchRamos();
            onSuccess && onSuccess();
          }}
        />
      )}
      <form
        onSubmit={submitHandler}
        className="h-full flex flex-col justify-between pt-3"
      >
        <FormTextInput name="ramo" label="Ramo" defaultValue={ramo?.ramo} />
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

export default RamoFormDialog;
