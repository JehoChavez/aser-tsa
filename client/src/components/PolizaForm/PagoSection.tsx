import { ChangeEvent, useEffect, useState, useContext } from "react";
import FormSection from "../utils/FormSection";
import FormSelectInput from "../utils/FormSelectInput";
import FormNumberInput from "../utils/FormNumberInput";
import { FormRecibosContext } from "../../store/form-recibos-context";

const PagoSection = ({ moneda }: { moneda?: string }) => {
  const formRecibosContext = useContext(FormRecibosContext);

  const [formValues, setFormValues] = useState(formRecibosContext.primas);

  const [subtotal, setSubtotal] = useState(0);

  const updateSum = () => {
    const { primaNeta, expedicion, financiamiento, otros } = formValues;
    const subtotalSum = primaNeta + expedicion + financiamiento + otros;
    setSubtotal(subtotalSum);
    setFormValues((prevValues) => ({
      ...prevValues,
      iva: subtotalSum * 0.16,
    }));

    formRecibosContext.setSubtotalWoExp(primaNeta + financiamiento + otros);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: parseFloat(value) || 0,
    }));
  };

  useEffect(() => {
    updateSum();
  }, [
    formValues.primaNeta,
    formValues.expedicion,
    formValues.financiamiento,
    formValues.otros,
  ]);

  useEffect(() => {
    const total = subtotal + formValues.iva;
    setFormValues((prevValues) => ({
      ...prevValues,
      primaTotal: total,
    }));
  }, [subtotal, formValues.iva]);

  useEffect(() => {
    formRecibosContext.setPrimas(formValues);
  }, [formValues]);

  useEffect(() => {
    formRecibosContext.calcMonthsDiff();
  }, [
    formRecibosContext.polizaInicioVigencia,
    formRecibosContext.polizaFinVigencia,
  ]);

  const handleFormaPagoChange = (selected: string) => {
    formRecibosContext.setFormaPago(parseInt(selected));
  };

  return (
    <>
      <FormSection>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="primaNeta"
            label="Prima Neta"
            placeholder="00.00"
            defaultVal={formValues.primaNeta}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="expedicion"
            label="Gastos de Expedición"
            placeholder="00.00"
            defaultVal={formValues.expedicion}
            onChange={handleInputChange}
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="financiamiento"
            label="Gastos de Financiamiento"
            placeholder="00.00"
            defaultVal={formValues.financiamiento}
            onChange={handleInputChange}
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="otros"
            label="Otros"
            placeholder="00.00"
            defaultVal={formValues.otros}
            onChange={handleInputChange}
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="iva"
            label="IVA"
            placeholder="00.00"
            value={formValues.iva}
            onChange={handleInputChange}
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="primaTotal"
            label="Prima Total"
            placeholder="00.00"
            value={formValues.primaTotal}
            onChange={handleInputChange}
          />
        </div>
      </FormSection>
      <FormSection>
        <div className="px-2 md:w-1/6">
          <FormSelectInput
            name="moneda"
            label="Moneda"
            options={[
              { value: "MXN", name: "MXN" },
              { value: "USD", name: "USD" },
              { value: "UDI", name: "UDI" },
            ]}
            defaultVal={moneda}
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormSelectInput
            name="formaPago"
            label="Forma de Pago"
            options={[
              { value: 1, name: "Contado" },
              { value: 2, name: "Semestral" },
              { value: 4, name: "Trimestral" },
              { value: 12, name: "Mensual" },
            ]}
            defaultVal={formRecibosContext.formaPago}
            onSelect={handleFormaPagoChange}
          />
        </div>
      </FormSection>
    </>
  );
};

export default PagoSection;
