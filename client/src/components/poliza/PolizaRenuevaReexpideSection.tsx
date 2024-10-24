import PolizaSection from "../utils/PolizaSection";
import LabelAndData from "../utils/LabelAndData";
import { PolizaInterface } from "../../types/interfaces";
import { Link } from "react-router-dom";

const PolizaRenuevaReexpideSection = ({
  renueva,
  reexpide,
  renovacion,
  reexpedicion,
}: {
  renueva?: PolizaInterface | null;
  reexpide?: PolizaInterface | null;
  renovacion?: PolizaInterface | null;
  reexpedicion?: PolizaInterface | null;
}) => {
  return (
    <PolizaSection>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Renueva A">
          <Link to={`/polizas/${renueva?.id}`}>
            <span className="underline">{renueva?.noPoliza}</span>
          </Link>
        </LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Reexpide A">
          <Link to={`/polizas/${reexpide?.id}`}>
            <span className="underline">{reexpide?.noPoliza}</span>
          </Link>
        </LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Renovada En">
          <Link to={`/polizas/${renovacion?.id}`}>
            <span className="underline">{renovacion?.noPoliza}</span>
          </Link>
        </LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Reexpedida En">
          <Link to={`/polizas/${reexpedicion?.id}`}>
            <span className="underline">{reexpedicion?.noPoliza}</span>
          </Link>
        </LabelAndData>
      </div>
    </PolizaSection>
  );
};

export default PolizaRenuevaReexpideSection;
