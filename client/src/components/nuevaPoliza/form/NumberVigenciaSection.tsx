import { useState, useEffect, useContext } from "react";
import FormDateInput from "../../utils/FormDateInput";
import FormSection from "../../utils/FormSection";
import FormTextInput from "../../utils/FormTextInput";
import { FormRecibosContext } from "../../../store/form-recibos-context";

const NumberVigenciaSection = () => {
  const formRecibosContext = useContext(FormRecibosContext);

  const today = new Date();

  const [emision, setEmision] = useState(today);

  useEffect(() => {
    formRecibosContext.onPolizaFinVigenciaChange(
      new Date(
        new Date(formRecibosContext.polizaInicioVigencia).setFullYear(
          formRecibosContext.polizaInicioVigencia.getFullYear() + 1
        )
      )
    );
  }, [formRecibosContext.polizaInicioVigencia]);

  return (
    <FormSection>
      <div className="md:w-1/4 px-2">
        <FormTextInput name="noPoliza" label="Número de Póliza" required />
      </div>
      <div className="md:w-1/4 px-2">
        <FormDateInput
          name="emision"
          label="Fecha de Emisión"
          value={emision}
          onChange={(date) => {
            setEmision(date);
          }}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormDateInput
          name="inicioVigencia"
          label="Inicio de Vigencia"
          value={formRecibosContext.polizaInicioVigencia}
          onChange={(date) => {
            formRecibosContext.onPolizaInicioVigenciaChange(date);
          }}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormDateInput
          name="finVigencia"
          label="Fin de Vigencia"
          value={formRecibosContext.polizaFinVigencia}
          onChange={(date) => {
            formRecibosContext.onPolizaFinVigenciaChange(date);
          }}
        />
      </div>
    </FormSection>
  );
};

export default NumberVigenciaSection;
