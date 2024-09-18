import { Link } from "react-router-dom";
import { PolizaInterface } from "../../types/interfaces";

const PolizaLIData = ({
  poliza,
  inicioVigencia,
  finVigencia,
}: {
  poliza: PolizaInterface;
  inicioVigencia: string;
  finVigencia: string;
}) => {
  return (
    <>
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
    </>
  );
};

export default PolizaLIData;
