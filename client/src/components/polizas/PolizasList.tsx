import { useContext } from "react";
import PolizaListItem from "./PolizaListItem";
import { PolizasContext } from "../../store/polizas-context";

const PolizasList = () => {
  const polizasContext = useContext(PolizasContext);

  return (
    <div className="h-5/6 w-full bg-neutral-100 overflow-y-auto">
      {polizasContext.polizas.map((poliza) => (
        <PolizaListItem poliza={poliza} key={poliza.id} />
      ))}
    </div>
  );
};

export default PolizasList;
