import Modal from "../../utils/Modal";
import FormTextInput from "../../utils/FormTextInput";
import ActionButton from "../../utils/ActionButton";
import { useCallback, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { VendedoresContext } from "../../../store/vendedores-context";
import { VendedorInterface } from "../../../types/interfaces";
import Loading from "../../utils/Loading";
import ErrorModal from "../../utils/ErrorModal";
import SuccessModal from "../../utils/SuccessModal";

const VendedorFormDialog = ({
  onCancel,
  onSuccess,
  vendedor,
}: {
  onCancel: () => void;
  onSuccess?: () => void;
  vendedor?: VendedorInterface;
}) => {
  const vendedoresContext = useContext(VendedoresContext);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const postVendedor = useCallback(async (payload: VendedorInterface) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/vendedores`, payload, {
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

  const updateVendedor = useCallback(
    async (payload: VendedorInterface) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `${baseUrl}/vendedores/${vendedor?.id}`,
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
    [vendedor]
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(
      fd.entries()
    ) as unknown as VendedorInterface;

    if (data.comentarios === "") data.comentarios = undefined;

    if (vendedor) {
      updateVendedor(data);
    } else {
      postVendedor(data);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <Modal size="medium">
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        {vendedor ? "Editar" : "Crear"} vendedor
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
            vendedoresContext.fetchVendedores();
            onSuccess && onSuccess();
          }}
        />
      )}
      <form
        onSubmit={submitHandler}
        className="h-full flex flex-col justify-between"
      >
        <div>
          <div className="w-full my-2">
            <FormTextInput
              name="nombre"
              label="Nombre"
              required
              defaultValue={vendedor?.nombre}
            />
          </div>
          <label htmlFor="comentarios">Comentarios</label>
          <textarea
            name="comentarios"
            id="comentarios"
            rows={7}
            className="w-full rounded bg-neutral-100 border-gray-400 focus:ring-blue-400 focus:ring-2"
            defaultValue={vendedor?.comentarios}
          />
        </div>
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

export default VendedorFormDialog;
