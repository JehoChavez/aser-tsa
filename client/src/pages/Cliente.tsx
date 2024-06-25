import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClienteInterface } from "../types/interfaces";
import axios from "axios";
import Modal from "../components/utils/Modal";
import Loading from "../components/utils/Loading";
import IconTitle from "../components/utils/IconTitle";
import ClienteInfo from "../components/clientes/ClienteInfo";

const Cliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState<ClienteInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCliente = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/clientes/${id}`,
        {
          withCredentials: true,
        }
      );
      setCliente(response.data.content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCliente();
  }, []);

  let content: JSX.Element;

  if (isLoading) {
    content = (
      <Modal size="small">
        <Loading />
      </Modal>
    );
  } else if (!isLoading && !cliente) {
    content = <h2>Cliente no encontrado</h2>;
  } else {
    const icon =
      cliente?.tipoPersona === "fisica" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/3200/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-building-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
        </svg>
      );
    content = (
      <>
        <IconTitle icon={icon}>{cliente?.nombre}</IconTitle>
        <div className="p-2 pt-5">
          <ClienteInfo cliente={cliente as ClienteInterface} />
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-full px-5 py-4 flex flex-col">{content}</div>
  );
};

export default Cliente;
