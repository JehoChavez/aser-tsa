import Dropdown from "../../utils/Dropdown";
import { useContext } from "react";
import { PolizasContext } from "../../../store/polizas-context";

const EstadoDropdown = () => {
  const polizasContext = useContext(PolizasContext);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let newEstado = [...(polizasContext.params.estado || [])];

    if (
      id === "vigentes" ||
      id === "renovadas" ||
      id === "reexpedidas" ||
      id === "canceladas" ||
      id === "vencidas"
    ) {
      if (checked) {
        newEstado.push(id);
      } else {
        newEstado = newEstado.filter((estado) => estado !== id);
      }
    }

    polizasContext.setParams({
      ...polizasContext.params,
      estado: newEstado,
    });
  };

  return (
    <div className="flex items-center ml-3">
      <Dropdown title="Estado" text right>
        <div className="w-36 text-gray-800">
          <form>
            <div className="hover:font-semibold">
              <input
                type="checkbox"
                id="vigentes"
                className="mr-3"
                checked={polizasContext.params.estado?.includes("vigentes")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="vigentes">Vigentes</label>
            </div>
            <div className="hover:font-semibold">
              <input
                type="checkbox"
                id="renovadas"
                className="mr-3"
                checked={polizasContext.params.estado?.includes("renovadas")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="renovadas">Renovadas</label>
            </div>
            <div className="hover:font-semibold">
              <input
                type="checkbox"
                id="reexpedidas"
                className="mr-3"
                checked={polizasContext.params.estado?.includes("reexpedidas")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="reexpedidas">Reexpedidas</label>
            </div>
            <div className="hover:font-semibold">
              <input
                type="checkbox"
                id="canceladas"
                className="mr-3"
                checked={polizasContext.params.estado?.includes("canceladas")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="canceladas">Canceladas</label>
            </div>
            <div className="hover:font-semibold">
              <input
                type="checkbox"
                id="vencidas"
                className="mr-3"
                checked={polizasContext.params.estado?.includes("vencidas")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="vencias">Vencidas</label>
            </div>
          </form>
        </div>
      </Dropdown>
    </div>
  );
};

export default EstadoDropdown;
