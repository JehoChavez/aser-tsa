import Dropdown from "../../utils/Dropdown";
import { useContext, useState } from "react";
import { PolizasContext } from "../../../store/polizas-context";
import FormDateInput from "../../utils/FormDateInput";
import ActionButton from "../../utils/ActionButton";

const FechaDropdown = () => {
  const polizasContext = useContext(PolizasContext);

  const [tipoFecha, setTipoFecha] = useState<
    | "inicioVigencia"
    | "finVigencia"
    | "emision"
    | "createdAt"
    | "fechaCancelación"
    | null
  >(null);
  const [desde, setDesde] = useState(new Date());
  const [hasta, setHasta] = useState(new Date());

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === "") {
      setTipoFecha(null);
    } else {
      setTipoFecha(value as any);
    }
  };

  const hadleDateChange = (date: Date, name: string) => {
    if (name === "desde") {
      setDesde(date);
    } else {
      setHasta(date);
    }
  };

  const handleDelete = () => {
    setTipoFecha(null);
    setDesde(new Date());
    setHasta(new Date());

    polizasContext.setParams({
      ...polizasContext.params,
      tipoFecha: null,
      desde: null,
      hasta: null,
    });
  };

  const handleApply = () => {
    polizasContext.setParams({
      ...polizasContext.params,
      tipoFecha,
      desde,
      hasta,
    });
  };

  return (
    <div className="flex items-center">
      <Dropdown title="Fecha" text right full>
        <label htmlFor="tipoFecha">Tipo de Fecha</label>
        <select
          className="h-8 p-1 bg-neutral-100 text-black border-gray-400 rounded focus:ring-blue-400 focus:ring-2 w-full"
          value={tipoFecha || ""}
          onChange={handleSelectChange}
          id="tipoFecha"
        >
          <option value="">Seleccione</option>
          <option value="createdAt">Creación</option>
          <option value="inicioVigencia">Inicio de vigencia</option>
          <option value="finVigencia">Fin de vigencia</option>
          <option value="emision">Emisión</option>
          <option value="fechaCancelacion">Cancelación</option>
        </select>
        <FormDateInput
          label="Desde"
          name="desde"
          value={desde}
          onChange={hadleDateChange}
        />
        <FormDateInput
          label="Hasta"
          name="hasta"
          value={hasta}
          onChange={hadleDateChange}
        />
        <div className="w-full flex justify-between mt-3">
          <ActionButton color="red" onClick={handleDelete}>
            Borrar
          </ActionButton>
          <ActionButton color="blue" onClick={handleApply}>
            Aplicar
          </ActionButton>
        </div>
      </Dropdown>
    </div>
  );
};

export default FechaDropdown;
