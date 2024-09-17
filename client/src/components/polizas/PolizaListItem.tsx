import { useState } from "react";
import ListItem from "../utils/ListItem";
import ActionButton from "../utils/ActionButton";
import { PolizaInterface } from "../../types/interfaces";
import { Link } from "react-router-dom";

const PolizaListItem = ({ poliza }: { poliza: PolizaInterface }) => {
  const [displayMore, setDisplayMore] = useState(false);
  const inicioVigencia = poliza.inicioVigencia.split("-").reverse().join("-");
  const finVigencia = poliza.finVigencia.split("-").reverse().join("-");

  return (
    <ListItem>
      <div className="w-full h-auto p-1 text-gray-800 bg-blue-800 bg-opacity-5 grid grid-rows-2 grid-cols-4 md:grid-rows-none md:grid-cols-12">
        <div className="row-start-1 col-span-1 md:col-span-2 lg:col-span-1 px-2 flex items-center underline">
          <Link to={`/polizas/${poliza.id}`}>{poliza.noPoliza}</Link>
        </div>
        <div className="hidden col-auto md:row-start-1 md:col-span-2 xl:col-span-1 px-2 md:flex items-center">
          <p>{poliza.aseguradora.aseguradora}</p>
        </div>
        <div className="hidden lg:flex lg:row-start-1 lg:col-span-2 px-2 items-center">
          <p>
            {poliza.agente.clave} - {poliza.agente.nombre}
          </p>
        </div>
        <div className="hidden xl:flex xl:row-start-1 xl:col-span-1 px-2 items-center">
          <p>{poliza.vendedor?.nombre}</p>
        </div>
        <div className="col-span-2 md:col-span-3 px-2 flex items-center underline">
          <Link to={`/clientes/${poliza.cliente.id}`}>
            {poliza.cliente.nombre}
          </Link>
        </div>
        <div className="hidden md:flex px-2 items-center">
          <p>{inicioVigencia}</p>
        </div>
        <div className="hidden md:flex px-2 items-center">
          <p>{finVigencia}</p>
        </div>
        <div className="col-start-4 md:col-start-11 col-span-full px-2 flex flex-col justify-around md:flex-row md:justify-normal items-center">
          <p
            className={`rounded px-1 text-neutral-100 ${
              poliza.fechaCancelacion || poliza.reexpedicion
                ? "bg-red-600"
                : poliza.vencida
                ? "bg-red-900"
                : poliza.renovacionId
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            {poliza.fechaCancelacion
              ? "Cancelada"
              : poliza.reexpedicionId
              ? "Reexpedida"
              : poliza.vencida
              ? "Vencida"
              : poliza.renovacionId
              ? "Renovada"
              : "Vigente"}
          </p>
          <div className="flex flex-wrap">
            <ActionButton title="Editar Póliza">
              <Link to={`/polizas/${poliza.id}/editar`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </Link>
            </ActionButton>
            <ActionButton title="Recibos">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cash-coin"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
              </svg>
            </ActionButton>
            <ActionButton title="Renovar Póliza">
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
            </ActionButton>
            <ActionButton title="Endosos">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-earmark-diff-fill"
                viewBox="0 0 16 16"
              >
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8 6a.5.5 0 0 1 .5.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5A.5.5 0 0 1 8 6m-2.5 6.5A.5.5 0 0 1 6 12h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5" />
              </svg>
            </ActionButton>
            <div className="relative w-full lg:w-auto flex">
              <ActionButton
                title="Más Opciones"
                onClick={() => setDisplayMore((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </ActionButton>
              {displayMore && (
                <div className="absolute top-7 right-0 z-30 bg-white rounded w-52 p-2 shadow-lg shadow-gray-500">
                  <h4 className="text-blue-900 font-bold">Más acciones</h4>
                  <div className="p-1 text-blue-950 flex flex-col items-start">
                    <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
                      Reexpedir
                    </button>
                    <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
                      Cambiar Contratante
                    </button>
                    <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
                      Cancelar
                    </button>
                    <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
                      Eliminar
                    </button>
                    <button
                      className="w-full hover:bg-red-200 rounded active:bg-red-700 active:text-white text-right text-red-700 px-1"
                      onClick={() => {
                        setDisplayMore(false);
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden row-start-2 col-span-full p-2 rounded bg-neutral-100 text-neutral-600">
          <h3 className="text-sm text-neutral-500 font-bold">Otros datos</h3>
          <p>Aseguradora: {poliza.aseguradora.aseguradora}</p>
          <p>
            Agente: {poliza.agente.clave} - {poliza.agente.nombre}
          </p>
          <p>Vendedor: {poliza.vendedor?.nombre}</p>
          <p>
            Vigencia: {inicioVigencia} al {finVigencia}
          </p>
        </div>
      </div>
    </ListItem>
  );
};

export default PolizaListItem;
