import Dropdown from "../../utils/Dropdown";
import { useContext } from "react";
import { PolizasContext } from "../../../store/polizas-context";

const EstadoDropdown = () => {
  const polizasContext = useContext(PolizasContext);

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
                  />
                  <label htmlFor="vigentes">Vigentes</label>
                </div>
                <div className="hover:font-semibold">
                  <input
                    type="checkbox"
                    id="renovadas"
                    className="mr-3"
                    checked={polizasContext.params.estado?.includes(
                      "renovadas"
                    )}
                  />
                  <label htmlFor="renovadas">Renovadas</label>
                </div>
                <div className="hover:font-semibold">
                  <input
                    type="checkbox"
                    id="reexpedidas"
                    className="mr-3"
                    checked={polizasContext.params.estado?.includes(
                      "reexpedidas"
                    )}
                  />
                  <label htmlFor="reexpedidas">Reexpedidas</label>
                </div>
                <div className="hover:font-semibold">
                  <input
                    type="checkbox"
                    id="canceladas"
                    className="mr-3"
                    checked={polizasContext.params.estado?.includes(
                      "canceladas"
                    )}
                  />
                  <label htmlFor="canceladas">Canceladas</label>
                </div>
                <div className="hover:font-semibold">
                  <input
                    type="checkbox"
                    id="vencias"
                    className="mr-3"
                    checked={polizasContext.params.estado?.includes("vencidas")}
                  />
                  <label htmlFor="vencias">Vencidas</label>
                </div>
              </form>
            </div>
          </Dropdown>
        </div>
  )
}

export default EstadoDropdown;