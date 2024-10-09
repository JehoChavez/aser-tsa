import PolizaSection from "../utils/PolizaSection";
import LabelAndData from "../utils/LabelAndData";
import {
  AseguradoraInterface,
  AgenteInterface,
  VendedorInterface,
  RamoInterface,
} from "../../types/interfaces";
import { Link } from "react-router-dom";

const PolizaAseguradoraSection = ({
  aseguradora,
  agente,
  vendedor,
  ramo,
}: {
  aseguradora: AseguradoraInterface;
  agente: AgenteInterface;
  vendedor: VendedorInterface;
  ramo?: RamoInterface;
}) => {
  return (
    <PolizaSection>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Aseguradora">
          <Link to={`/aseguradoras/${aseguradora.id}`}>
            <span className="underline">{aseguradora.aseguradora}</span>
          </Link>
        </LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Agente">
          <Link to={`/agentes/${agente.id}`}>
            <span className="underline">
              {agente.clave} - {agente.nombre}
            </span>
          </Link>
        </LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Vendedor">
          <Link to={`/vendedores/${vendedor.id}`}>
            <span className="underline">{vendedor.nombre}</span>
          </Link>
        </LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Ramo">{ramo?.ramo}</LabelAndData>
      </div>
    </PolizaSection>
  );
};

export default PolizaAseguradoraSection;
