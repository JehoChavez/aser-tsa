import VendedoresListHeader from "./VendedoresListHeader";
import { useContext } from "react";
import { VendedoresContext } from "../../../store/vendedores-context";
import VendedorListItem from "./VendedorListItem";

const VendedoresList = () => {
  const vendedoresContext = useContext(VendedoresContext);

  return (
    <>
      <VendedoresListHeader />
      <div className="h-5/6 w-full bg-neutral-100 overflow-y-auto">
        {vendedoresContext.vendedores.map((vendedor) => (
          <VendedorListItem vendedor={vendedor} key={vendedor.id} />
        ))}
      </div>
    </>
  );
};

export default VendedoresList;
