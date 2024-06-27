import { PolizaInterface } from "../../types/interfaces";
import PolizaListItem from "./PolizaListItem";

const PolizasList = ({ polizas }: { polizas: PolizaInterface[] }) => {
  return (
    <div className="h-5/6 w-full bg-neutral-100 overflow-y-auto">
      {polizas.map((poliza) => (
        <PolizaListItem poliza={poliza} key={poliza.id} />
      ))}
    </div>
  );
};

export default PolizasList;
