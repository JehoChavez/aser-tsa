import { ClienteInterface } from "../../types/interfaces";
import ClienteListItem from "./ClienteListItem";

const ClientesList = ({ clientes }: { clientes: ClienteInterface[] }) => {
  return (
    <div className="h-full w-full bg-neutral-200">
      {clientes.map((cliente) => (
        <ClienteListItem cliente={cliente} key={cliente.id} />
      ))}
    </div>
  );
};

export default ClientesList;
