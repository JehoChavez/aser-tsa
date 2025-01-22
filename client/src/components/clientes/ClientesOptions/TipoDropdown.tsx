import Dropdown from "../../utils/Dropdown";
import { useContext } from "react";
import { ClientesContext } from "../../../store/clientes-context";

const TipoDropdown = () => {
  const clientesContext = useContext(ClientesContext);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    let newTipo = id === "todos" ? undefined : id;

    clientesContext.setParams({
      ...clientesContext.params,
      tipoPersona: newTipo as "fisica" | "moral" | undefined,
    });
  };

  return (
    <div className="flex items-center md:ml-3">
      <Dropdown title="Tipo" text right full>
        <div className="w-36 text-gray-800">
          <div className="hover:font-semibold flex items-center">
            <input
              type="radio"
              id="todos"
              className="mr-3"
              name="tipo"
              checked={!clientesContext.params.tipoPersona}
              onChange={handleRadioChange}
            />
            <label htmlFor="todos" className="w-full">
              Todos
            </label>
          </div>
          <div className="hover:font-semibold flex items-center">
            <input
              type="radio"
              id="fisica"
              className="mr-3"
              name="tipo"
              checked={clientesContext.params.tipoPersona === "fisica"}
              onChange={handleRadioChange}
            />
            <label htmlFor="fisica" className="w-full">
              Persona Física
            </label>
          </div>
          <div className="hover:font-semibold flex items-center">
            <input
              type="radio"
              id="moral"
              className="mr-3"
              name="tipo"
              checked={clientesContext.params.tipoPersona === "moral"}
              onChange={handleRadioChange}
            />
            <label htmlFor="moral" className="w-full">
              Persona Moral
            </label>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default TipoDropdown;
