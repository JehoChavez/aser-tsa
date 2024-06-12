import { PendientesProps } from "../types/interfaces";

const Pendientes = ({ title, pendientes }: PendientesProps) => {
  console.log(pendientes);
  return (
    <>
      <h1 className="text-2xl text-gray-100 text-center font-bold bg-blue-950 p-1">
        {title?.toUpperCase() || "Pendientes"}
      </h1>
    </>
  );
};

export default Pendientes;
