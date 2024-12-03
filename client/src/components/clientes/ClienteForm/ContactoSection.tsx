import FormSection from "../../utils/FormSection";
import FormTextInput from "../../utils/FormTextInput";
import FormEmailInput from "../../utils/FormEmailInput";
import FormPhoneInput from "../../utils/FormPhoneInput";
import { ContactoSectionProps } from "../../../types/interfaces";

const ContactoSection = ({
  correo,
  telefono,
  empresa,
}: ContactoSectionProps) => {
  return (
    <>
      <h2 className="border-b text-xl text-gray-600 font-bold w-full">
        Contacto
      </h2>
      <FormSection>
        <div className="w-full md:w-1/4 md:pr-1 flex flex-col justify-end">
          <FormEmailInput name="correo" label="Correo" defaultValue={correo} />
        </div>
        <div className="w-full md:w-1/4 md:px-1 flex flex-col justify-end">
          <FormPhoneInput
            name="telefono"
            label="Teléfono"
            defaultValue={telefono}
          />
        </div>
        <div className="w-full md:w-1/4 md:px-1 flex flex-col justify-end">
          <FormTextInput
            name="empresa"
            label="Empresa"
            defaultValue={empresa}
          />
        </div>
      </FormSection>
    </>
  );
};

export default ContactoSection;
