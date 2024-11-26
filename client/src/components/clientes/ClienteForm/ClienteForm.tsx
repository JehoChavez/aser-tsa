import PersonaFormSection from "./PersonaFormSection";
import DomicilioSection from "./DomicilioSection";

const ClienteForm = () => {
  return (
    <form>
      <PersonaFormSection />
      <DomicilioSection />
    </form>
  );
};

export default ClienteForm;
