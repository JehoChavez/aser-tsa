import { useState } from "react";
import ActionButton from "../utils/ActionButton";
import EndosoVigenciaSection from "./EndosoVigenciaSection";
import {
  AseguradoraInterface,
  EndosoInterface,
  PrimasInterface,
  Recibo,
} from "../../types/interfaces";
import moment from "moment";
import { FormRecibosContext } from "../../store/form-recibos-context";

const EndosoForm = ({
  id,
  type,
  onCancel,
  aseguradora,
  formaPago,
  endoso,
  polizaInicioVigencia,
  polizaFinVigencia,
}: {
  id: number;
  type: "A" | "B" | "D";
  onCancel: () => void;
  aseguradora: AseguradoraInterface;
  formaPago: number;
  endoso?: EndosoInterface;
  polizaInicioVigencia: string;
  polizaFinVigencia: string;
}) => {
  const [nrOfRecibos, setNrOfRecibos] = useState(0);

  const addNrOfRecibos = () => {
    setNrOfRecibos((nr) => nr + 1);
  };

  const subNrOfRecibos = () => {
    if (nrOfRecibos > 1) {
      setNrOfRecibos((nr) => nr - 1);
    }
  };

  const setNr = (nr: number) => {
    setNrOfRecibos(nr);
  };

  const [recibos, setRecibos] = useState<Recibo[]>([]);

  const today = new Date();
  const [endosoInicioVigencia, setEndosoInicioVigencia] = useState(
    endoso ? moment(endoso.inicioVigencia).toDate() : today
  );
  const [endosoFinVigencia, setEndosoFinVigencia] = useState(
    endoso
      ? moment(endoso.finVigencia).toDate()
      : moment(polizaFinVigencia).add(1, "y").toDate()
  );

  const [months, setMonths] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [primas, setPrimas] = useState<PrimasInterface>({
    primaNeta: endoso ? endoso.primaNeta || 0 : 0,
    expedicion: endoso ? endoso.expedicion || 0 : 0,
    financiamiento: endoso ? endoso.financiamiento || 0 : 0,
    otros: endoso ? endoso.otros || 0 : 0,
    iva: endoso ? endoso.iva || 0 : 0,
    primaTotal: endoso ? endoso.primaTotal || 0 : 0,
  });

  const onPrimasChange = (primas: PrimasInterface) => {
    setPrimas(primas);
  };

  const onInicioVigenciaChange = (date: Date) => {
    const newDate = new Date(date.setDate(date.getDate() + 1));
    setEndosoInicioVigencia(newDate);
  };
  const onFinVigenciaChange = (date: Date) => {
    setEndosoFinVigencia(date);
  };
  const calcMonthsDiff = () => {
    const inicioDate = moment(endosoInicioVigencia);
    const finDate = moment(endosoFinVigencia);

    const monthDiff = finDate.diff(inicioDate, "months");
    setMonths(monthDiff);
  };
  const onFormaPagoChange = () => {};
  const onRecibosChange = (recibos: Recibo[]) => {
    setRecibos(recibos);
  };
  const onSubtotalChange = (value: number) => {
    setSubtotal(value);
  };

  return (
    <div className="flex flex-col">
      <FormRecibosContext.Provider
        value={{
          nrOfRecibos,
          recibos,
          aseguradora,
          formaPago,
          polizaInicioVigencia: moment(polizaInicioVigencia).toDate(),
          polizaFinVigencia: moment(polizaFinVigencia).toDate(),
          endosoInicioVigencia,
          endosoFinVigencia,
          monthsDiff: months,
          subtotalWoExp: subtotal,
          primas,
          addNrOfRecibos,
          subNrOfRecibos,
          setNrOfRecibos: setNr,
          setPrimas: onPrimasChange,
          setSubtotalWoExp: onSubtotalChange,
          setRecibos: onRecibosChange,
          setFormaPago: onFormaPagoChange,
          calcMonthsDiff,
          onEndosoInicioVigenciaChange: onInicioVigenciaChange,
          onEndosoFinVigenciaChange: onFinVigenciaChange,
        }}
      >
        <EndosoVigenciaSection />
        <ActionButton color="red" onClick={onCancel}>
          Cancelar
        </ActionButton>
      </FormRecibosContext.Provider>
    </div>
  );
};

export default EndosoForm;
