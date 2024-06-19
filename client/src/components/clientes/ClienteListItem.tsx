import { ClienteInterface } from "../../types/interfaces";
import ListItem from "../utils/ListItem";
import ActionButton from "../utils/ActionButton";

const ClienteListItem = ({ cliente }: { cliente: ClienteInterface }) => {
  return (
    <ListItem>
      <div className="h-auto flex p-1 text-gray-800">
        <div className="w-12 pl-1 pr-2">
          <span className="h-full w-full flex items-center justify-center">
            {cliente.tipoPersona === "fisica" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-building-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
              </svg>
            )}
          </span>
        </div>
        <div className="w-full h-auto grid grid-cols-12">
          <div className="col-span-3 px-2 flex items-center">
            <a href={`/clientes/${cliente.id}`} className="underline">
              {cliente.nombre}
            </a>
          </div>
          <div className="col-span-1 px-2 flex items-center">
            <p>{cliente.rfc}</p>
          </div>
          <div className="col-span-3 px-2 flex items-center">
            <a href={`mailto:${cliente.correo}`} className="underline">
              {cliente.correo}
            </a>
          </div>
          <div className="col-span-1 px-2 flex items-center">
            <p>{cliente.telefono}</p>
          </div>
          <div className="col-span-2 px-2 flex items-center">
            <p>{cliente.empresa}</p>
          </div>
          <div className="col-start-11 col-span-full px-2 flex items-center">
            <ActionButton title="Ver Cliente">Ver</ActionButton>
            <ActionButton title="Editar Cliente">Editar</ActionButton>
            <ActionButton title="Eliminar Cliente">Eliminar</ActionButton>
          </div>
        </div>
      </div>
    </ListItem>
  );
};

export default ClienteListItem;
