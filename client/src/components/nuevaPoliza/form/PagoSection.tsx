import { ChangeEvent, useEffect, useState } from "react";
import FormSection from "../../utils/FormSection";
import FormSelectInput from "../../utils/FormSelectInput";
import FormNumberInput from "../../utils/FormNumberInput";
import moment from "moment";

interface PagoSectionProps {
  inicioVigencia: Date;
  finVigencia: Date;
}

const PagoSection = ({ inicioVigencia, finVigencia }: PagoSectionProps) => {
  const [formValues, setFormValues] = useState({
    primaNeta: 0,
    expedicion: 0,
    financiamiento: 0,
    otros: 0,
    iva: 0,
    primaTotal: 0,
  });

  const [subtotal, setSubtotal] = useState(0);
  const [months, setMonths] = useState(0);

  const updateSum = () => {
    const { primaNeta, expedicion, financiamiento, otros } = formValues;
    const subtotalSum = primaNeta + expedicion + financiamiento + otros;
    setSubtotal(subtotalSum);
    setFormValues((prevValues) => ({
      ...prevValues,
      iva: subtotalSum * 0.16,
    }));
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

  const calcMonthDifference = () => {
    const inicioDate = moment(inicioVigencia);
    const finDate = moment(finVigencia);

    const monthDiff = finDate.diff(inicioDate, "months");
    setMonths(monthDiff);
  };

  useEffect(() => {
    calcMonthDifference();
  }, [inicioVigencia, finVigencia]);

  return (
    <>
      <FormSection>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="primaNeta"
            label="Prima Neta"
            placeholder="00.00"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="expedicion"
            label="Gastos de Expedición"
            placeholder="00.00"
            onChange={handleInputChange}
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="financiamiento"
            label="Gastos de Financiamiento"
            placeholder="00.00"
            onChange={handleInputChange}
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormNumberInput
            name="otros"
            label="Otros"
            placeholder="00.00"
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
          />
        </div>
      </FormSection>
    </>
  );
};

export default PagoSection;