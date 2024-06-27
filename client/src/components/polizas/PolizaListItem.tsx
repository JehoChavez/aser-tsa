import ListItem from "../utils/ListItem";
import ActionButton from "../utils/ActionButton";
import { PolizaInterface } from "../../types/interfaces";
import { Link } from "react-router-dom";

const PolizaListItem = ({ poliza }: { poliza: PolizaInterface }) => {
  const inicioVigencia = poliza.inicioVigencia.split("-").reverse().join("-");
  const finVigencia = poliza.finVigencia.split("-").reverse().join("-");

  return (
    <ListItem>
      <div className="w-full h-auto p-1 text-gray-800 bg-blue-800 bg-opacity-5 grid grid-rows-2 grid-cols-4 md:grid-rows-none md:grid-cols-12">
        <div className="row-start-1 col-span-1 md:col-span-2 lg:col-span-1 px-2 flex items-center underline md:no-underline justify-center">
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
