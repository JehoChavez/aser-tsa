import { useState, useEffect, useContext } from "react";
import FormDateInput from "../utils/FormDateInput";
import FormSection from "../utils/FormSection";
import FormTextInput from "../utils/FormTextInput";
import { FormRecibosContext } from "../../store/form-recibos-context";
import { NumberVigenciaProps } from "../../types/interfaces";

const NumberVigenciaSection = ({
  noPoliza,
  fechaEmision,
  inicioVigencia,
  finVigencia,
}: NumberVigenciaProps) => {
  const formRecibosContext = useContext(FormRecibosContext);

  const today = new Date();

  const [emision, setEmision] = useState(
    fechaEmision ? new Date(fechaEmision) : today
  );

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
        <FormTextInput
          name="noPoliza"
          label="Número de Póliza"
          defaultValue={noPoliza}
          required
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormDateInput
          name="emision"
          label="Fecha de Emisión"
          value={emision}
          onChange={(date) => {
            setEmision(new Date(date.setDate(date.getDate() + 1)));
          }}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormDateInput
          name="inicioVigencia"
          label="Inicio de Vigencia"
          value={
            inicioVigencia
              ? new Date(inicioVigencia)
              : formRecibosContext.polizaInicioVigencia
          }
          onChange={(date) => {
            formRecibosContext.onPolizaInicioVigenciaChange(date);
          }}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormDateInput
          name="finVigencia"
          label="Fin de Vigencia"
          value={
            finVigencia
              ? new Date(finVigencia)
              : formRecibosContext.polizaFinVigencia
          }
          onChange={(date) => {
            formRecibosContext.onPolizaFinVigenciaChange(date);
          }}
        />
      </div>
    </FormSection>
  );
};

export default NumberVigenciaSection;
