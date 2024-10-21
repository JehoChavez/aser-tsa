import { Recibo } from "../../types/interfaces";
import PolizaRecibosListCols from "../polizas/PolizaRecibosListCols";

const PolizaRecibosSection = ({ recibos }: { recibos: Recibo[] }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-gray-100 text-center font-bold bg-blue-950 p-1 w-full rounded">
        Recibos
      </h1>
      <PolizaRecibosListCols />
    </div>
  );
};

export default PolizaRecibosSection;
