import FormTextInput from "../../utils/FormTextInput";
import FormSelectInput from "../../utils/FormSelectInput";
import FormDateInput from "../../utils/FormDateInput";
import FormSection from "../../utils/FormSection";

const PersonaFormSection = () => {
  return (
    <FormSection>
      <div className="w-full md:w-1/4 md:pr-1 flex flex-col justify-end">
        <FormSelectInput
          name="tipoPersona"
          label="Tipo de Persona"
          options={[
            { value: "fisica", name: "Física", selected: true },
            { value: "moral", name: "Moral" },
          ]}
        />
      </div>
    </FormSection>
  );
};

export default PersonaFormSection;
