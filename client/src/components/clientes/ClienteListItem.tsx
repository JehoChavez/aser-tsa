import { ClienteInterface } from "../../types/interfaces";
import ListItem from "../utils/ListItem";

const ClienteListItem = ({ cliente }: { cliente: ClienteInterface }) => {
  return (
    <ListItem>
      <div className="h-auto flex p-1">
        <div className="w-12 pl-1 pr-2">
          <span>{cliente.tipoPersona}</span>
        </div>
        <div className="w-full h-auto grid grid-cols-12">
          <a href={`/clientes/${cliente.id}`} className="col-span-3 px-2">
            {cliente.nombre}
          </a>
          <p className="col-span-1 px-2">{cliente.rfc}</p>
          <a href={`mailto:${cliente.correo}`} className="col-span-3 px-2">
            {cliente.correo}
          </a>
          <p className="col-span-1 px-2">{cliente.telefono}</p>
          <p className="col-span-2 px-2">{cliente.empresa}</p>
          <div className="col-start-11 col-span-full px-2">acciones</div>
        </div>
      </div>
    </ListItem>
  );
};

export default ClienteListItem;
