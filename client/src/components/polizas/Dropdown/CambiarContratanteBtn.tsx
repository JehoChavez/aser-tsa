import { useState } from "react";
import SelectClienteModal from "../../clientes/SelectClienteModal";
import DropdownButton from "../../utils/DropdownButton";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import SuccessModal from "../../utils/SuccessModal";
import ErrorModal from "../../utils/ErrorModal";

const CambiarContratanteBtn = ({ id }: { id: number }) => {
  const [showModal, setShowModal] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [successNavigate, setSuccessNavigate] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [clienteId, setClienteId] = useState<number>();

  const selectHandler = async (clienteIdInner: number) => {
    try {
      setClienteId(clienteIdInner);
      const response = await axios.patch(
        `http://localhost:3000/api/polizas/${id}/cambiarContratante`,
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
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (successNavigate) return <Navigate to={`/clientes/${clienteId}`} />;

  return (
    <>
      <DropdownButton
        onClick={() => {
          setShowModal(true);
        }}
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
