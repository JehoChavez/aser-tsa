import { PrimasInterface } from "../../types/interfaces";
import PolizaSection from "../utils/PolizaSection";
import LabelAndData from "../utils/LabelAndData";

const PolizaPrimasSection = ({ primas }: { primas: PrimasInterface }) => {
  const currencyFormat = new Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <PolizaSection>
      <div className="md:w-1/6 m-1">
        <LabelAndData label="Prima Neta">
          ${currencyFormat.format(primas.primaNeta)}
        </LabelAndData>
      </div>
      <div className="md:w-1/6 m-1">
        <LabelAndData label="Expedición">
          ${currencyFormat.format(primas.expedicion)}
        </LabelAndData>
      </div>
      <div className="md:w-1/6 m-1">
        <LabelAndData label="Financiamiento">
          ${currencyFormat.format(primas.financiamiento)}
        </LabelAndData>
      </div>
      <div className="md:w-1/6 m-1">
        <LabelAndData label="Otros">
          ${currencyFormat.format(primas.otros)}
        </LabelAndData>
      </div>
      <div className="md:w-1/6 m-1">
        <LabelAndData label="IVA">
          ${currencyFormat.format(primas.iva)}
        </LabelAndData>
      </div>
      <div className="md:w-1/6 m-1">
        <LabelAndData label="Prima Total">
          ${currencyFormat.format(primas.primaTotal)}
        </LabelAndData>
      </div>
    </PolizaSection>
  );
};

export default PolizaPrimasSection;
