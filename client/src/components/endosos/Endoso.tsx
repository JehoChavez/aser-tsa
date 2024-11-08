import { useContext } from "react";
import { EndososContext } from "../../store/endosos-context";
import PolizaSection from "../utils/PolizaSection";
import LabelAndData from "../utils/LabelAndData";
import ActionButton from "../utils/ActionButton";

const Endoso = () => {
  const endosoContext = useContext(EndososContext);

  return (
    <div className="w-full h-full p-1 flex flex-col justify-between">
      <div className="w-full h-full">
        <h3 className="text-2xl text-neutral-800 border-b border-neutral-800">
          {endosoContext.endosoToShow?.endoso}
        </h3>
        <PolizaSection>
          <div className="md:w-1/4 m-1">
            <LabelAndData label="Póliza">
              {endosoContext.endosoToShow?.endoso}
            </LabelAndData>
          </div>
          <div className="md:w-1/4 m-1">
            <LabelAndData label="Fecha de Emisión">
              {endosoContext.endosoToShow?.emision
                ?.split("-")
                .reverse()
                .join("-")}
            </LabelAndData>
          </div>
          <div className="md:w-1/4 m-1">
            <LabelAndData label="Inicio de Vigencia">
              {endosoContext.endosoToShow?.inicioVigencia
                ?.split("-")
                .reverse()
                .join("-")}
            </LabelAndData>
          </div>
          <div className="md:w-1/4 m-1">
            <LabelAndData label="Fin de Vigencia">
              {endosoContext.endosoToShow?.finVigencia
                ?.split("-")
                .reverse()
                .join("-")}
            </LabelAndData>
          </div>
        </PolizaSection>
        <PolizaSection>
          <LabelAndData label="Concepto">
            {endosoContext.endosoToShow?.concepto}
          </LabelAndData>
        </PolizaSection>
        <PolizaSection>
          <div className="md:w-1/6 m-1">
            <LabelAndData label="Prima Neta">
              ${endosoContext.endosoToShow?.primaNeta}
            </LabelAndData>
          </div>
          <div className="md:w-1/6 m-1">
            <LabelAndData label="Gastos de Expedición">
              ${endosoContext.endosoToShow?.expedicion}
            </LabelAndData>
          </div>
          <div className="md:w-1/6 m-1">
            <LabelAndData label="Gastos de Financiamiento">
              ${endosoContext.endosoToShow?.financiamiento}
            </LabelAndData>
          </div>
          <div className="md:w-1/6 m-1">
            <LabelAndData label="Otros">
              ${endosoContext.endosoToShow?.otros}
            </LabelAndData>
          </div>
          <div className="md:w-1/6 m-1">
            <LabelAndData label="IVA">
              ${endosoContext.endosoToShow?.iva}
            </LabelAndData>
          </div>
          <div className="md:w-1/6 m-1">
            <LabelAndData label="Prima Total">
              ${endosoContext.endosoToShow?.primaTotal}
            </LabelAndData>
          </div>
        </PolizaSection>
      </div>
      <div className="w-full flex justify-between">
        <ActionButton
          size="lg"
          color="blue"
          onClick={() => {
            endosoContext.setEndosoToShow(null);
          }}
        >
          Regresar
        </ActionButton>
        <ActionButton
          size="lg"
          color="blue"
          onClick={() => {
            endosoContext.setEndosoToEdit(endosoContext.endosoToShow);
            endosoContext.setEndosoToShow(null);
            endosoContext.setShowForm(true);
          }}
        >
          Editar
        </ActionButton>
      </div>
    </div>
  );
};

export default Endoso;
