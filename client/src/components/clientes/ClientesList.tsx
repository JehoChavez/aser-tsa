import { useContext } from "react";
import { ClientesContext } from "../../store/clientes-context";
import ClienteListItem from "./ClienteListItem";

const ClientesList = () => {
  const clientesContext = useContext(ClientesContext);
  return (
    <div className="h-5/6 w-full bg-neutral-100 overflow-y-auto">
      {clientesContext.clientes.map((cliente) => (
        <ClienteListItem cliente={cliente} key={cliente.id} />
      ))}
    </div>
  );
};

export default ClientesList;
