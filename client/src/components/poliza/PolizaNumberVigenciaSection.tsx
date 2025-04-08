import PolizaSection from "../utils/PolizaSection";
import LabelAndData from "../utils/LabelAndData";

const PolizaNumberVigenciaSection = ({
  noPoliza,
  emision,
  inicioVigencia,
  finVigencia,
}: {
  noPoliza: string;
  emision: string;
  inicioVigencia: string;
  finVigencia: string;
}) => {
  return (
    <PolizaSection>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Póliza">{noPoliza}</LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Fecha de Emisión">
          {emision && emision.split("-").reverse().join("-")}
        </LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Inicio de Vigencia">
          {inicioVigencia.split("-").reverse().join("-")}
        </LabelAndData>
      </div>
      <div className="md:w-1/4 m-1">
        <LabelAndData label="Fin de Vigencia">
          {finVigencia.split("-").reverse().join("-")}
        </LabelAndData>
      </div>
    </PolizaSection>
  );
};

export default PolizaNumberVigenciaSection;
