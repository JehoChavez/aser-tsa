import FormSection from "../../utils/FormSection";
import FormSelectInput from "../../utils/FormSelectInput";
import FormTextInput from "../../utils/FormTextInput";

const MonedaSection = () => {
  return (
    <FormSection>
      <div className="px-2 md:w-1/6">
        <FormSelectInput
          name="moneda"
          label="Moneda"
          options={[
            { value: "MXN", name: "MXN" },
            { value: "USD", name: "USD" },
            { value: "UDI", name: "MXN" },
          ]}
        />
      </div>
      <div className="px-2 md:w-1/6">
        <FormTextInput
          name="primaNeta"
          label="Prima Neta"
          placeholder="00.00"
          required
        />
      </div>
      <div className="px-2 md:w-1/6">
        <FormTextInput
          name="expedicion"
          label="Gastos de Expedición"
          placeholder="00.00"
        />
      </div>
      <div className="px-2 md:w-1/6">
        <FormTextInput
          name="financiamiento"
          label="Gastos de Financiamiento"
          placeholder="00.00"
        />
      </div>
      <div className="px-2 md:w-1/6">
        <FormTextInput name="iva" label="IVA" placeholder="00.00" />
      </div>
      <div className="px-2 md:w-1/6">
        <FormTextInput
          name="primaTotal"
          label="Prima Total"
          placeholder="00.00"
          required
        />
      </div>
    </FormSection>
  );
};

export default MonedaSection;
