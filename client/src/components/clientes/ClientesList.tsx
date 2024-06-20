import { useContext } from "react";
import { ClientesContext } from "../../store/clientes-context";
import ClienteListItem from "./ClienteListItem";

const ClientesList = () => {
  const clientesContext = useContext(ClientesContext);
  return (
    <div className="h-full w-full bg-neutral-200 overflow-y-auto">
      {clientesContext.clientes.map((cliente) => (
        <ClienteListItem cliente={cliente} key={cliente.id} />
      ))}
    </div>
  );
};

export default ClientesList;
