import ListItem from "../utils/ListItem";
import { PolizaInterface } from "../../types/interfaces";
import PolizaLIData from "./PolizaLIData";
import EstadoAcciones from "./EstadoAcciones";

const PolizaListItem = ({ poliza }: { poliza: PolizaInterface }) => {
  const inicioVigencia = poliza.inicioVigencia.split("-").reverse().join("-");
  const finVigencia = poliza.finVigencia.split("-").reverse().join("-");

  return (
    <>
      <ListItem>
        <div className="w-full h-auto p-1 text-gray-800 bg-blue-800 bg-opacity-5 grid grid-rows-2 grid-cols-4 md:grid-rows-none md:grid-cols-12">
          <PolizaLIData
            poliza={poliza}
            inicioVigencia={inicioVigencia}
            finVigencia={finVigencia}
          />
          <EstadoAcciones poliza={poliza} />
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
    </>
  );
};

export default PolizaListItem;
