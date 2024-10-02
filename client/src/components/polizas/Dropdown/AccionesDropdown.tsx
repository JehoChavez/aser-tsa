import { PolizaInterface } from "../../../types/interfaces";
import Dropdown from "../../utils/Dropdown";
import EliminarButton from "./EliminarButton";
import CancelarButton from "./CancelarButton";
import RehabilitarButton from "./RehabilitarButton";
import CambiarContratanteBtn from "./CambiarContratanteBtn";
import ReexpedirButton from "./ReexpedirButton";

const AccionesDropdown = ({ poliza }: { poliza: PolizaInterface }) => {
  return (
    <>
      <Dropdown title="Más acciones">
        <div className="p-1 text-blue-950 flex flex-col items-start">
          <ReexpedirButton
            id={poliza.id}
            disabled={poliza.reexpedicionId ? true : false}
          />
          <CambiarContratanteBtn id={poliza.id} />
          {poliza.fechaCancelacion ? (
            <RehabilitarButton id={poliza.id} />
          ) : (
            <CancelarButton id={poliza.id} />
          )}
          <EliminarButton id={poliza.id} />
        </div>
      </Dropdown>
    </>
  );
};

export default AccionesDropdown;
