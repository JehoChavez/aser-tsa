import { ClienteInterface } from "../../types/interfaces";
import ActionButton from "../utils/ActionButton";
import { Link } from "react-router-dom";
import EliminarClienteButton from "./EliminarClienteButton";

const ClienteInfo = ({ cliente }: { cliente: ClienteInterface }) => {
  let nacimiento: string | undefined;
  if (cliente.nacimiento) {
    const [year, month, day] = cliente.nacimiento.split("-");
    nacimiento = `${day}-${month}-${year}`;
  }

  return (
    <div className="bg-neutral-100 p-2 rounded">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-neutral-800">
          Datos del cliente
        </h3>
        <div className="flex">
          <Link to={`/clientes/${cliente.id}/editar`}>
            <ActionButton title="Editar Cliente">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </ActionButton>
          </Link>
          <EliminarClienteButton id={cliente.id} endoso />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full p-2 text-neutral-700">
        <div className="md:w-1/3 m-1">
          <div>
            <p className="inline-block font-semibold mr-1">Tipo:</p>
            <p className="inline-block">Persona {cliente?.tipoPersona}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">
              {cliente.tipoPersona === "fisica"
                ? "Fecha de nacimiento:"
                : "Fecha de constitución:"}
            </p>
            <p className="inline-block">{nacimiento}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">RFC:</p>
            <p className="inline-block">{cliente.rfc}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Empresa:</p>
            <p className="inline-block">{cliente.empresa}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Correo:</p>
            <p className="inline-block">
              <a href={`mailto:${cliente.correo}`} className="underline">
                {cliente.correo}
              </a>
            </p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Teléfono:</p>
            <p className="inline-block">{cliente.telefono}</p>
          </div>
        </div>
        <div className="md:w-1/3 m-1">
          <div>
            <p className="inline-block font-semibold mr-1">Calle:</p>
            <p className="inline-block">{cliente.calle}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Exterior:</p>
            <p className="inline-block">{cliente.exterior}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Interior:</p>
            <p className="inline-block">{cliente.interior}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Colonia:</p>
            <p className="inline-block">{cliente.colonia}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Código Postal:</p>
            <p className="inline-block">{cliente.codigoPostal}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Estado:</p>
            <p className="inline-block">{cliente.estado?.estado}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Municipio:</p>
            <p className="inline-block">{cliente.municipio?.municipio}</p>
          </div>
        </div>
        <div className="md:w-1/3 m-1 flex flex-col">
          <h4 className="font-semibold">Comentarios:</h4>
          <p className="bg-neutral-50 w-full h-40 p-1 rounded overflow-y-auto">
            {cliente.comentarios}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClienteInfo;
