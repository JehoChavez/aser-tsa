import FormSection from "../utils/FormSection";
import FormTextInput from "../utils/FormTextInput";
import FormDateInput from "../utils/FormDateInput";
import { EndosoVigenciaProps } from "../../types/interfaces";
import { useState, useContext } from "react";
import { FormRecibosContext } from "../../store/form-recibos-context";
import moment from "moment";

const EndosoVigenciaSection = ({
  endoso,
  fechaEmision,
}: EndosoVigenciaProps) => {
  const formRecibosContext = useContext(FormRecibosContext);

  const today = new Date();

  const [emision, setEmision] = useState(
    fechaEmision ? moment(fechaEmision).toDate() : today
  );

  return (
    <FormSection>
      <div className="w-full md:w-1/4 md:pr-1 flex flex-col justify-end">
        <FormTextInput
          name="endoso"
          label="No. de Endoso"
          defaultValue={endoso}
          required
        />
      </div>
      <div className="w-full md:w-1/4 md:px-1 flex flex-col justify-end">
        <FormDateInput
          name="emision"
          label="Fecha de Emisión"
          value={emision}
          onChange={(date) => {
            setEmision(new Date(date.setDate(date.getDate() + 1)));
          }}
        />
      </div>
      <div className="w-full md:w-1/4 md:px-1 flex flex-col justify-end">
        <FormDateInput
          name="inicioVigencia"
          label="Inicio de Vigencia"
          value={formRecibosContext.endosoInicioVigencia || today}
          onChange={(date) => {
            formRecibosContext.onEndosoInicioVigenciaChange &&
              formRecibosContext.onEndosoInicioVigenciaChange(date);
          }}
        />
      </div>
      <div className="w-full md:w-1/4 md:pl-1 flex flex-col justify-end">
        <FormDateInput
          name="finVigencia"
          label="Fin de Vigencia"
          value={
            formRecibosContext.endosoFinVigencia ||
            formRecibosContext.polizaFinVigencia
          }
          onChange={(date) => {
            formRecibosContext.onEndosoFinVigenciaChange &&
              formRecibosContext.onEndosoFinVigenciaChange(date);
          }}
        />
      </div>
    </FormSection>
  );
};

export default EndosoVigenciaSection;
