import { PolizaInterface } from "../../../types/interfaces";
import Dropdown from "../../utils/Dropdown";
import EliminarButton from "./EliminarButton";

const AccionesDropdown = ({ poliza }: { poliza: PolizaInterface }) => {
  return (
    <>
      <Dropdown title="Más acciones">
        <div className="p-1 text-blue-950 flex flex-col items-start">
          <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
            Reexpedir
          </button>
          <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
            Cambiar Contratante
          </button>
          <button className="w-full hover:bg-gray-200 active:bg-gray-500 active:text-white rounded text-left px-1">
            {poliza.fechaCancelacion ? "Rehabilitar" : "Cancelar"}
          </button>
          <EliminarButton id={poliza.id} />
        </div>
      </Dropdown>
    </>
  );
};

export default AccionesDropdown;
