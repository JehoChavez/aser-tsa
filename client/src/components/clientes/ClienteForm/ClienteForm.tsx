import PersonaFormSection from "./PersonaFormSection";
import DomicilioSection from "./DomicilioSection";
import ContactoSection from "./ContactoSection";

const ClienteForm = () => {
  return (
    <form>
      <PersonaFormSection />
      <DomicilioSection />
      <ContactoSection />
    </form>
  );
};

export default ClienteForm;
