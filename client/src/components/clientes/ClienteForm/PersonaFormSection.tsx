import { useState } from "react";
import FormTextInput from "../../utils/FormTextInput";
import FormSelectInput from "../../utils/FormSelectInput";
import FormDateInput from "../../utils/FormDateInput";
import FormSection from "../../utils/FormSection";
import { PersonaSectionProps } from "../../../types/interfaces";
import moment from "moment";

const PersonaFormSection = ({
  tipoPersona,
  nombre,
  nacimiento,
  rfc,
}: PersonaSectionProps) => {
  const [fechaNacimiento, setFechaNacimiento] = useState(
    nacimiento ? moment(nacimiento).toDate() : new Date()
  );

  const [tipo, setTipo] = useState<"fisica" | "moral">(tipoPersona || "fisica");

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
          defaultVal={tipoPersona}
          onSelect={(selected) => {
            if (selected === "fisica" || selected === "moral")
              setTipo(selected);
          }}
        />
      </div>
      <div className="w-full md:w-1/4 md:px-1 flex flex-col justify-end">
        <FormTextInput
          name="nombre"
          label="Nombre"
          defaultValue={nombre}
          required
        />
      </div>
      <div className="w-full md:w-1/4 md:px-1 flex flex-col justify-end">
        <FormDateInput
          name="nacimiento"
          label={
            tipo === "moral" ? "Fecha de Constitución" : "Fecha de Nacimiento"
          }
          value={fechaNacimiento}
          onChange={(date) => {
            setFechaNacimiento(date);
          }}
        />
      </div>
      <div className="w-full md:w-1/4 md:pl-1 flex flex-col justify-end">
        <FormTextInput name="rfc" label="RFC" defaultValue={rfc || ""} />
      </div>
    </FormSection>
  );
};

export default PersonaFormSection;
