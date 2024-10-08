import { PolizaInterface } from "../../types/interfaces";
import PolizaSection from "../utils/PolizaSection";
import LabelAndData from "../utils/LabelAndData";

const PolizaNumberVigenciaSection = ({
  poliza,
}: {
  poliza: PolizaInterface;
}) => {
  return (
    <PolizaSection>
      <LabelAndData label="Póliza">{poliza.noPoliza}</LabelAndData>
    </PolizaSection>
  );
};

export default PolizaNumberVigenciaSection;
