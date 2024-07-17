import { useState, useEffect } from "react";
import FormDateInput from "../../utils/FormDateInput";
import FormSection from "../../utils/FormSection";
import FormTextInput from "../../utils/FormTextInput";

const NumberVigenciaSection = ({
  onInicioVigenciaChange,
  onFinVigenciaChange,
}: {
  onInicioVigenciaChange: (date: Date) => void;
  onFinVigenciaChange: (date: Date) => void;
}) => {
  const today = new Date();

  const [emision, setEmision] = useState(today);

  const [inicioVigencia, setInicioVigencia] = useState(today);

  const [finVigencia, setFinVigencia] = useState(
    new Date(new Date().setFullYear(today.getFullYear() + 1))
  );

  useEffect(() => {
    setFinVigencia(
      new Date(
        new Date(inicioVigencia).setFullYear(inicioVigencia.getFullYear() + 1)
      )
    );
  }, [inicioVigencia]);

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
          value={inicioVigencia}
          onChange={(date) => {
            setInicioVigencia(date);
            onInicioVigenciaChange(date);
          }}
        />
      </div>
      <div className="md:w-1/4 px-2">
        <FormDateInput
          name="finVigencia"
          label="Fin de Vigencia"
          value={finVigencia}
          onChange={(date) => {
            setFinVigencia(date);
            onFinVigenciaChange(date);
          }}
        />
      </div>
    </FormSection>
  );
};

export default NumberVigenciaSection;
