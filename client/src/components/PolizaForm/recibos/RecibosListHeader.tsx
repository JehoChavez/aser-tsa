import { useContext } from "react";
import { FormRecibosContext } from "../../../store/form-recibos-context";

const RecibosListHeader = () => {
  const formRecibosContext = useContext(FormRecibosContext);

  return (
    <div className="h-auto p-2 bg-blue-950 bg-opacity-90 text-neutral-200 flex rounded">
      <div className="w-full grid grid-cols-9">
        <span className="col-span-1 flex justify-around font-bold text-2xl">
          <button onClick={formRecibosContext.subNrOfRecibos}>-</button>
          <p>{formRecibosContext.nrOfRecibos}</p>
          <button onClick={formRecibosContext.addNrOfRecibos}>+</button>
        </span>
      </div>
    </div>
  );
};

export default RecibosListHeader;
