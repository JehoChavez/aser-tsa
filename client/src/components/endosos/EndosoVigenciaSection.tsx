import FormSection from "../utils/FormSection";
import FormTextInput from "../utils/FormTextInput";
import FormDateInput from "../utils/FormDateInput";
import { EndosoVigenciaProps } from "../../types/interfaces";
import { useState } from "react";

const EndosoVigenciaSection = ({
  endoso,
  fechaEmision,
}: EndosoVigenciaProps) => {
  const [emision, setEmision] = useState(
    fechaEmision ? new Date(fechaEmision) : new Date()
  );

  return (
    <FormSection>
      <div className="w-1/4">
        <FormTextInput
          name="endoso"
          label="No. de Endoso"
          defaultValue={endoso}
          required
        />
      </div>
      <div className="w-1/4">
        <FormDateInput
          name="emision"
          label="Fecha de Emisión"
          value={emision}
          onChange={(date) => {
            setEmision(new Date(date.setDate(date.getDate() + 1)));
          }}
        />
      </div>
      <div className="w-1/4">
        <FormTextInput name="endoso" label="No. de Endoso" />
      </div>
      <div className="w-1/4">
        <FormTextInput name="endoso" label="No. de Endoso" />
      </div>
    </FormSection>
  );
};

export default EndosoVigenciaSection;
