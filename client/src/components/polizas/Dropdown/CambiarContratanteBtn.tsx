import { useState } from "react";
import SelectClienteModal from "../../clientes/SelectClienteModal";
import DropdownButton from "../../utils/DropdownButton";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import SuccessModal from "../../utils/SuccessModal";
import ErrorModal from "../../utils/ErrorModal";
import Loading from "../../utils/Loading";

const CambiarContratanteBtn = ({
  id,
  disabled,
}: {
  id: number;
  disabled?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [successNavigate, setSuccessNavigate] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [clienteId, setClienteId] = useState<number>();

  const [isLoading, setIsLoading] = useState(false);

  const selectHandler = async (clienteIdInner: number) => {
    setIsLoading(true);

    try {
      setClienteId(clienteIdInner);
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.patch(
        `${baseUrl}/polizas/${id}/cambiar-contratante`,
        { clienteId: clienteIdInner },
        { withCredentials: true }
      );

      if (response.data.status === 200) {
        setShowModal(false);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
      setShowModal(false);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (successNavigate) return <Navigate to={`/clientes/${clienteId}`} />;

  return (
    <>
      {isLoading && <Loading />}
      <DropdownButton
        onClick={() => {
          !disabled && setShowModal(true);
        }}
        disabled={disabled}
      >
        Cambiar Contratante
      </DropdownButton>
      {showModal && (
        <SelectClienteModal
          onClose={() => {
            setShowModal(false);
          }}
          onSelect={(id: number) => {
            selectHandler(id);
          }}
        />
      )}
      {success && (
        <SuccessModal
          type="cambioContratante"
          onOk={() => {
            setSuccessNavigate(true);
          }}
        />
      )}
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
    </>
  );
};

export default CambiarContratanteBtn;
