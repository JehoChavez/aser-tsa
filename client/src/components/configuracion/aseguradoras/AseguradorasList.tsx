import AseguradorasListHeader from "./AseguradorasListHeader";
import AseguradoraListItem from "./AseguradoraListItem";
import { useContext } from "react";
import { AseguradorasContext } from "../../../store/aseguradoras-context";

const AseguradorasList = () => {
  const aseguradorasContext = useContext(AseguradorasContext);

  return (
    <>
      <AseguradorasListHeader />
      <div className="h-5/6 w-full bg-neutral-100 overflow-y-auto">
        {aseguradorasContext.aseguradoras.map((aseguradora) => (
          <AseguradoraListItem aseguradora={aseguradora} key={aseguradora.id} />
        ))}
      </div>
    </>
  );
};

export default AseguradorasList;
