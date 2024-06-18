import ListItem from "./ListItem";
import { PendientesRenovListItemInterface } from "../types/interfaces";

const PendientesRenovListItem = ({
  renovacion,
}: PendientesRenovListItemInterface) => {
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
        <button className="col-span-2">Renovar</button>
      </div>
    </ListItem>
  );
};

export default PendientesRenovListItem;
