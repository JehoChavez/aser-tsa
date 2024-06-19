import { ClienteInterface } from "../../types/interfaces";

const ClientesList = ({ clientes }: { clientes: ClienteInterface[] }) => {
  return (
    <div className="h-full w-full bg-neutral-200">
      {clientes.map((cliente) => (
        <p>{cliente.nombre}</p>
      ))}
    </div>
  );
};

export default ClientesList;
