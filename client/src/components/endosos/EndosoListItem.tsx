import { EndosoInterface } from "../../types/interfaces";
import ListItem from "../utils/ListItem";

const EndosoListItem = ({ endoso }: { endoso: EndosoInterface }) => {
  return (
    <ListItem>
      <div className="w-full px-1 bg-neutral-100 flex flex-col md:grid grid-cols-12 md:text-center">
        <div className="flex">
          <p className="md:hidden mr-1 text-neutral-600 font-semibold">
            Endoso
          </p>
          <p className="md:w-full">{endoso.endoso}</p>
        </div>
        <div className="flex">
          <p className="md:hidden mr-1 text-neutral-600 font-semibold">Tipo</p>
          <p className="md:w-full">{endoso.tipo}</p>
        </div>
        <div className="flex md:col-span-2">
          <p className="md:hidden mr-1 text-neutral-600 font-semibold">
            Emisión
          </p>
          <p className="md:w-full">
            {endoso.emision?.split("-").reverse().join("-")}
          </p>
        </div>
        <div className="flex md:col-span-2">
          <p className="md:hidden mr-1 text-neutral-600 font-semibold">
            Inicio de Vigencia
          </p>
          <p className="md:w-full">
            {endoso.inicioVigencia.split("-").reverse().join("-")}
          </p>
        </div>
        <div className="flex">
          <p className="md:hidden mr-1 text-neutral-600 font-semibold">
            Estado
          </p>
          <p
            className={`md:w-full rounded text-neutral-100 ${
              endoso.fechaCancelacion ? "bg-red-700" : "bg-emerald-700"
            }`}
          >
            {endoso.fechaCancelacion ? "Cancelado" : "Vigente"}
          </p>
        </div>
        <div className="flex md:col-span-3">
          <p className="md:hidden mr-1 text-neutral-600 font-semibold">
            Comentarios
          </p>
          <p className="md:w-full">{endoso.comentarios}</p>
        </div>
        <div className="flex md:col-span-2">
          <p className="md:hidden mr-1 text-neutral-600 font-semibold">
            Acciones
          </p>
          <p className="md:w-full">Acciones</p>
        </div>
      </div>
    </ListItem>
  );
};

export default EndosoListItem;
