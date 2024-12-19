import RamosListHeader from "./RamosListHeader";
import RamoListItem from "./RamoListItem";
import { useContext } from "react";
import { RamosContext } from "../../../store/ramos-context";

const RamosList = () => {
  const ramosContext = useContext(RamosContext);

  return (
    <>
      <RamosListHeader />
      <div className="h-5/6 w-full bg-neutral-100 overflow-y-auto">
        {ramosContext.ramos.map((ramo) => (
          <RamoListItem ramo={ramo} key={ramo.id} />
        ))}
      </div>
    </>
  );
};

export default RamosList;
