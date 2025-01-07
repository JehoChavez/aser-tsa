import { useContext, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { PolizasContext } from "../../../store/polizas-context";
import IconTextButton from "../../utils/IconTextButton";
import SearchInput from "../../utils/SearchInput";
import SelectClienteModal from "../../clientes/SelectClienteModal";
import EstadoDropdown from "./EstadoDropdown";
import AseguradoraDropdown from "./AseguradoraAgenteDropdowns";

const PolizasOptions = () => {
  const { id: clienteId } = useParams();

  const polizasContext = useContext(PolizasContext);
  const [showClienteSelect, setShowClienteSelect] = useState(false);
  const [isClientePage, setIsClientePage] = useState(false);

  const nuevaClickHandler = () => {
    if (clienteId) {
      setIsClientePage(true);
    } else {
      setShowClienteSelect(true);
    }
  };

  const closeModalHandler = () => {
    setShowClienteSelect(false);
  };

  if (isClientePage) {
    return <Navigate to="./nueva" />;
  }

  return (
    <div className="w-full h-1/5 flex items-center">
      {showClienteSelect && <SelectClienteModal onClose={closeModalHandler} />}
      <div className="w-full h-1/2 grid grid-cols-4 md:grid-cols-5 xl:grid-cols-12">
        <div className="flex items-center col-span-1 px-2">
          <IconTextButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-file-earmark-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0" />
              </svg>
            }
            width="w-full"
            height="h-8"
            onClick={nuevaClickHandler}
          >
            Nueva
          </IconTextButton>
        </div>
        <div className="col-span-3 md:col-span-2 xl:col-span-3 flex items-center px-2">
          <SearchInput
            placeholder="Buscar Póliza"
            onSearch={polizasContext.onSearch}
          />
        </div>
        <EstadoDropdown />
        <AseguradoraDropdown />
      </div>
    </div>
  );
};

export default PolizasOptions;
