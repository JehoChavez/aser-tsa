import { useContext } from "react";
import { ClientesContext } from "../../../store/clientes-context";
import SearchInput from "../../utils/SearchInput";
import IconTextButton from "../../utils/IconTextButton";
import { Link } from "react-router-dom";
import TipoDropdown from "./TipoDropdown";
import OrderDropdown from "./OrderDropdown";

const ClientesOptions = () => {
  const clientesContext = useContext(ClientesContext);

  return (
    <div className="w-full h-1/5 flex items-center">
      <div className="w-full h-1/2 grid grid-cols-4 md:grid-cols-5 xl:grid-cols-12">
        <div className="flex items-center col-span-1 px-2">
          <Link to="/clientes/nuevo" className="w-full">
            <IconTextButton
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-person-fill-add"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                </svg>
              }
              width="w-full"
              height="h-8"
            >
              Nuevo
            </IconTextButton>
          </Link>
        </div>
        <div className="col-span-3 md:col-span-2 xl:col-span-3 flex items-center px-2">
          <SearchInput
            placeholder="Buscar Cliente"
            onSearch={clientesContext.onSearch}
          />
        </div>
        <TipoDropdown />
        <OrderDropdown />
      </div>
    </div>
  );
};

export default ClientesOptions;
