import { useState } from "react";
import ListItem from "./ListItem";
import { PendientesRenovListItemInterface } from "../types/interfaces";
import { Navigate } from "react-router-dom";

const PendientesRenovListItem = ({
  renovacion,
}: PendientesRenovListItemInterface) => {
  const [navigate, setNavigate] = useState(false);

  if (navigate) {
    return <Navigate to={`/polizas/${renovacion.id}/renovar`} />;
  }

  return (
    <ListItem>
      <div className="w-full p-2 bg-neutral-100 grid grid-cols-12">
        <a className="col-start-1 col-span-2">{renovacion.cliente.nombre}</a>
        <p className="col-span-2">{renovacion.ramo.ramo}</p>
        <a className="col-span-2">{renovacion.noPoliza}</a>
        <p className="col-span-2">{renovacion.aseguradora.aseguradora}</p>
        <p className="col-span-2">
          {renovacion.agente.clave} - {renovacion.agente.nombre}
        </p>
        <div className="col-span-2 flex items-center justify-center">
          <button
            className="w-auto bg-gray-100 flex items-center justify-center border border-blue-950 rounded text-blue-950 hover:bg-gray-300 active:bg-gray-500"
            onClick={() => setNavigate(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
          </button>
        </div>
      </div>
    </ListItem>
  );
};

export default PendientesRenovListItem;
