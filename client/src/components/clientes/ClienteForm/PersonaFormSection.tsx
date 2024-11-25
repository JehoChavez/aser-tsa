import { useState } from "react";
import FormTextInput from "../../utils/FormTextInput";
import FormSelectInput from "../../utils/FormSelectInput";
import FormDateInput from "../../utils/FormDateInput";
import FormSection from "../../utils/FormSection";

const PersonaFormSection = () => {
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  
  return (
    <FormSection>
      <div className="w-full md:w-1/4 md:pr-1 flex flex-col justify-end">
        <FormSelectInput
          name="tipoPersona"
          label="Tipo de Persona"
          options={[
            { value: "fisica", name: "Física" },
            { value: "moral", name: "Moral" },
          ]}
        />
      </div>
      <div className="w-full md:w-1/4 md:px-1 flex flex-col justify-end">
        <FormTextInput name="nombre" label="Nombre" required />
      </div>
      <div className="w-full md:w-1/4 md:px-1 flex flex-col justify-end">
        <FormDateInput
          name="nacimiento"
          label="Fecha de Nacimiento"
          value={fechaNacimiento}
          onChange={(date) => {
            setFechaNacimiento(date);
          }}
        />
      </div>
      <div className="w-full md:w-1/4 md:pl-1 flex flex-col justify-end">
        <FormTextInput name="rfc" label="RFC" />
      </div>
    </FormSection>
  );
};

export default PersonaFormSection;
