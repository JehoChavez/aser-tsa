import ListItem from "../utils/ListItem";
import { PolizaInterface } from "../../types/interfaces";
import PolizaLIData from "./PolizaLIData";
import EstadoAcciones from "./EstadoAcciones";
import OtrosDatos from "./OtrosDatos";

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
          <OtrosDatos
            poliza={poliza}
            inicioVigencia={inicioVigencia}
            finVigencia={finVigencia}
          />
        </div>
      </ListItem>
    </>
  );
};

export default PolizaListItem;
