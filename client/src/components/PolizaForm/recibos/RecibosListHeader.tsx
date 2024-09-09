import { useContext } from "react";
import { FormRecibosContext } from "../../../store/form-recibos-context";

const RecibosListHeader = () => {
  const formRecibosContext = useContext(FormRecibosContext);

  return (
    <div className="h-auto p-2 bg-blue-950 bg-opacity-90 text-neutral-200 flex rounded">
      <div className="w-full grid grid-cols-9 text-xl text-center">
        <span className="col-span-1 flex justify-evenly">
          <button
            className="font-bold"
            onClick={formRecibosContext.subNrOfRecibos}
          >
            -
          </button>
          <p>{formRecibosContext.nrOfRecibos}</p>
          <button
            className="font-bold"
            onClick={formRecibosContext.addNrOfRecibos}
          >
            +
          </button>
        </span>
        <p>Prima Neta</p>
        <p>Expedición</p>
        <p>Financiamiento</p>
        <p>Otros</p>
        <p>IVA</p>
        <p>Prima Total</p>
        <p>Fecha Inicio</p>
        <p>Fecha Límite</p>
      </div>
    </div>
  );
};

export default RecibosListHeader;
