import { useState } from "react";
import { ClienteInterface } from "../../types/interfaces";
import IconTextButton from "../utils/IconTextButton";
import SelectClienteModal from "../clientes/SelectClienteModal";

const NPClienteInfo = ({ cliente }: { cliente: ClienteInterface }) => {
  const [showClienteSelect, setShowClienteSelect] = useState(false);

  return (
    <div className="bg-neutral-100 flex flex-col">
      {showClienteSelect && (
        <SelectClienteModal
          onClose={() => {
            setShowClienteSelect(false);
          }}
          onSelect={() => {
            setTimeout(() => {
              setShowClienteSelect(false);
            }, 100);
          }}
        />
      )}
      <h2 className="border-b m-2 text-xl text-gray-600 font-bold">Datos del Cliente</h2>
      <div className="flex flex-col md:flex-row rounded p-2">
        <div className="md:w-1/3 px-1">
          <p>Nombre</p>
          <p className="bg-blue-800 bg-opacity-10 rounded p-1 min-h-8">
            {cliente.nombre}
          </p>
        </div>
        <div className="md:w-1/3 px-1">
          <p>RFC</p>
          <p className="bg-blue-800 bg-opacity-10 rounded p-1 min-h-8">
            {cliente.rfc}
          </p>
        </div>
        <div className="md:w-1/3 px-1">
          <p>Dirección</p>
          <p className="bg-blue-800 bg-opacity-10 rounded p-1 min-h-8">
            {cliente.calle}, {cliente.exterior}, {cliente.interior},{" "}
            {cliente.colonia}, {cliente.codigoPostal},{" "}
            {cliente.municipio?.municipio}, {cliente.estado?.estado}
          </p>
        </div>
      </div>
      <div className="w-28 flex self-end mr-3 mb-2">
        <IconTextButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
          }
          width="w-full"
          onClick={() => {
            setShowClienteSelect(true);
          }}
        >
          Cambiar
        </IconTextButton>
      </div>
    </div>
  );
};

export default NPClienteInfo;
