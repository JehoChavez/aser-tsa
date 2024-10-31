import { PrimasInterface } from "../../types/interfaces";
import PolizaSection from "../utils/PolizaSection";
import LabelAndData from "../utils/LabelAndData";

const PolizaPrimasSection = ({
  primas,
  formaPago,
}: {
  primas: PrimasInterface;
  formaPago: 1 | 2 | 4 | 12;
}) => {
  const currencyFormat = new Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let labelFormaPago;

  switch (formaPago) {
    case 1:
      labelFormaPago = "Contado";
      break;
    case 2:
      labelFormaPago = "Semestral";
      break;
    case 4:
      labelFormaPago = "Trimestral";
      break;
    case 12:
      labelFormaPago = "Mensual";
      break;
  }

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
      <div className="md:w-1/6 m-1">
        <LabelAndData label="Forma de Pago">{labelFormaPago}</LabelAndData>
      </div>
    </PolizaSection>
  );
};

export default PolizaPrimasSection;
