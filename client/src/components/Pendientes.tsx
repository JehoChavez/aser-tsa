import { PendientesInterface } from "../types/interfaces";

const Pendientes = ({ pendientes }: { pendientes: PendientesInterface }) => {
  return (
    <>
      <h1 className="text-2xl text-gray-100 text-center font-bold bg-blue-950">{pendientes.type.toUpperCase()}</h1>
    </>
  );
};

export default Pendientes;
