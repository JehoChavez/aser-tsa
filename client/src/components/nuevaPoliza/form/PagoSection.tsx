import { useEffect, useRef, useState } from "react";
import FormSection from "../../utils/FormSection";
import FormSelectInput from "../../utils/FormSelectInput";
import FormTextInput from "../../utils/FormTextInput";
import moment from "moment";

const PagoSection = ({
  inicioVigencia,
  finVigencia,
}: {
  inicioVigencia: Date;
  finVigencia: Date;
}) => {
  const netaRef = useRef<HTMLInputElement>(null);
  const expedicionRef = useRef<HTMLInputElement>(null);
  const financiamientoRef = useRef<HTMLInputElement>(null);
  const otrosRef = useRef<HTMLInputElement>(null);
  const ivaRef = useRef<HTMLInputElement>(null);
  const totalRef = useRef<HTMLInputElement>(null);

  const [subtotal, setSubtotal] = useState(0.0);
  const [iva, setIva] = useState(0.0);

  const [months, setMonths] = useState(0);
  console.log(months);

  const updateSum = () => {
    const netaVal = netaRef.current
      ? parseFloat(netaRef.current.value) || 0
      : 0;
    const expedicionVal = expedicionRef.current
      ? parseFloat(expedicionRef.current.value) || 0
      : 0;
    const financiamientoVal = financiamientoRef.current
      ? parseFloat(financiamientoRef.current.value) || 0
      : 0;

    const subtotalSum = netaVal + expedicionVal + financiamientoVal;
    setSubtotal(subtotalSum);
    setIva(subtotalSum * 0.16);
  };

  const onIvaChange = () => {
    const ivaVal = ivaRef.current ? parseFloat(ivaRef.current.value) || 0 : 0;
    setIva(ivaVal);
  };

  useEffect(() => {
    updateSum();
  }, []);

  useEffect(() => {
    const total = subtotal + iva;
    if (ivaRef.current) {
      ivaRef.current.value = iva.toString();
    }
    if (totalRef.current) {
      totalRef.current.value = total.toString();
    }
  }, [subtotal, iva]);

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
          <FormTextInput
            name="primaNeta"
            label="Prima Neta"
            placeholder="00.00"
            ref={netaRef}
            onChange={updateSum}
            required
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormTextInput
            name="expedicion"
            label="Gastos de Expedición"
            ref={expedicionRef}
            onChange={updateSum}
            placeholder="00.00"
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormTextInput
            name="financiamiento"
            label="Gastos de Financiamiento"
            ref={financiamientoRef}
            onChange={updateSum}
            placeholder="00.00"
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormTextInput
            name="otros"
            label="Otros"
            ref={otrosRef}
            onChange={updateSum}
            placeholder="00.00"
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormTextInput
            name="iva"
            label="IVA"
            placeholder="00.00"
            ref={ivaRef}
            onChange={onIvaChange}
          />
        </div>
        <div className="px-2 md:w-1/6">
          <FormTextInput
            name="primaTotal"
            label="Prima Total"
            placeholder="00.00"
            ref={totalRef}
            required
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
              { value: "UDI", name: "MXN" },
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
