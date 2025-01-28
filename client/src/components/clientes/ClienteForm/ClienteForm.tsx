import PersonaFormSection from "./PersonaFormSection";
import DomicilioSection from "./DomicilioSection";
import ContactoSection from "./ContactoSection";
import { FormEvent } from "react";
import ActionButton from "../../utils/ActionButton";
import { Link } from "react-router-dom";
import { ClienteInterface } from "../../../types/interfaces";
import axios from "axios";
import Loading from "../../utils/Loading";
import Modal from "../../utils/Modal";
import { useState } from "react";
import { AxiosError } from "axios";
import SuccessModal from "../../utils/SuccessModal";
import { Navigate } from "react-router-dom";
import ErrorModal from "../../utils/ErrorModal";

const ClienteForm = ({ cliente }: { cliente?: ClienteInterface }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [clienteId, setClienteId] = useState(0);
  const [successNavigate, setSuccessNavigate] = useState(false);
  const [error, setError] = useState(false);

  const createCliente = async (payload: ClienteInterface) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/clientes",
        payload,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setSuccess(true);
        setClienteId(response.data.content.id);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
        setError(true);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateCliente = async (payload: ClienteInterface) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/clientes/${cliente?.id}`,
        payload,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setSuccess(true);
        setClienteId(response.data.content.id);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
        setError(true);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(
      fd.entries()
    ) as unknown as ClienteInterface;

    if (!data.municipioId) {
      data.municipioId = 0;
    }

    if (cliente) {
      updateCliente(data);
    } else {
      createCliente(data);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (successNavigate) return <Navigate to={`/clientes/${clienteId}`} />;

  return (
    <>
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {success &&
        (cliente ? (
          <SuccessModal
            type="clienteEditado"
            onOk={() => {
              setSuccessNavigate(true);
            }}
          />
        ) : (
          <SuccessModal
            type="clienteCreado"
            onOk={() => {
              setSuccessNavigate(true);
            }}
          />
        ))}
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
      <form
        onSubmit={submitHandler}
        className="h-full flex flex-col justify-between"
      >
        <div>
          <PersonaFormSection
            tipoPersona={cliente?.tipoPersona}
            sexo={cliente?.sexo}
            nombre={cliente?.nombre}
            nacimiento={cliente?.nacimiento}
            rfc={cliente?.rfc}
          />
          <DomicilioSection
            calle={cliente?.calle || undefined}
            exterior={cliente?.exterior || undefined}
            interior={cliente?.interior || undefined}
            colonia={cliente?.colonia || undefined}
            codigoPostal={cliente?.codigoPostal || undefined}
            estado={cliente?.estado?.id || undefined}
            municipio={cliente?.municipio?.id || undefined}
          />
          <ContactoSection
            correo={cliente?.correo || undefined}
            telefono={cliente?.telefono || undefined}
            empresa={cliente?.empresa || undefined}
          />
          <h2 className="border-b text-xl text-gray-600 font-bold w-full">
            Comentarios
          </h2>
          <textarea
            id="comentarios"
            name="comentarios"
            rows={7}
            className="w-full mt-2 rounded bg-neutral-100 border-gray-400 focus:ring-blue-400 focus:ring-2"
            defaultValue={cliente?.comentarios || ""}
          />
        </div>
        <div className="w-full flex justify-between">
          <Link to="/clientes">
            <ActionButton color="red" size="lg">
              Cancelar
            </ActionButton>
          </Link>
          <ActionButton color="blue" size="lg">
            Guardar
          </ActionButton>
        </div>
      </form>
    </>
  );
};

export default ClienteForm;
