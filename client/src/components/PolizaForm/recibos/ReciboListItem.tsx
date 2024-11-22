import { ReciboListItemProps } from "../../../types/interfaces";
import ListItem from "../../utils/ListItem";
import FormNumberInput from "../../utils/FormNumberInput";
import FormDateInput from "../../utils/FormDateInput";
import { ChangeEvent, useEffect, useState, useContext } from "react";
import { FormRecibosContext } from "../../../store/form-recibos-context";
import moment from "moment";

const ReciboListItem = ({
  reciboIndex,
  onReciboChange,
}: ReciboListItemProps) => {
  const formRecibosContext = useContext(FormRecibosContext);
  const recibo = formRecibosContext.recibos[reciboIndex];

  const diff = moment(recibo.fechaLimite).diff(
    moment(recibo.fechaInicio),
    "days"
  );

  const [reciboState, setReciboState] = useState(recibo);

  useEffect(() => {
    setReciboState(recibo);
  }, [
    recibo.primaNeta,
    recibo.expedicion,
    recibo.financiamiento,
    recibo.otros,
    recibo.iva,
    recibo.primaTotal,
  ]);

  const [subtotal, setSubtotal] = useState(
    (recibo.primaNeta as number) +
      (recibo.expedicion as number) +
      (recibo.financiamiento as number) +
      (recibo.otros as number)
  );

  const numberInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReciboState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ? parseFloat(e.target.value) : 0,
    }));
  };

  useEffect(() => {
    const sub =
      (reciboState.primaNeta as number) +
      (reciboState.expedicion as number) +
      (reciboState.financiamiento as number) +
      (reciboState.otros as number);
    setSubtotal(sub);
    setReciboState((prev) => ({
      ...prev,
      iva: recibo.iva === 0 ? 0 : sub * 0.16,
    }));
  }, [
    reciboState.primaNeta,
    reciboState.expedicion,
    reciboState.financiamiento,
    reciboState.otros,
  ]);

  useEffect(() => {
    setReciboState((prev) => ({
      ...prev,
      primaTotal: subtotal + (prev.iva as number),
    }));
  }, [reciboState.iva]);

  useEffect(() => {
    onReciboChange(recibo.exhibicion, reciboState);
  }, [
    reciboState.primaTotal,
    reciboState.fechaInicio,
    reciboState.fechaLimite,
  ]);

  const dateInputChangeHandler = (date: Date, name: string) => {
    setReciboState((prev) => ({
      ...prev,
      [name]: moment(date).add(1, "d").format("YYYY-MM-DD"),
    }));
  };

  useEffect(() => {
    setReciboState((prev) => ({
      ...prev,
      fechaLimite: moment(reciboState.fechaInicio)
        .add(diff, "days")
        .format("YYYY-MM-DD"),
    }));
  }, [reciboState.fechaInicio]);

  return (
    <ListItem>
      <div className="h-auto text-gray-800 bg-blue-800 bg-opacity-5 grid grid-cols-9 text-center text-xl">
        <p>{recibo.exhibicion}</p>
        <span className="px-1">
          <FormNumberInput
            name="primaNeta"
            id={`${reciboState.exhibicion}_primaNeta`}
            value={reciboState.primaNeta}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="expedicion"
            id={`${reciboState.exhibicion}_expedicion`}
            value={reciboState.expedicion}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="financiamiento"
            id={`${reciboState.exhibicion}_financiamiento`}
            value={reciboState.financiamiento}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="otros"
            id={`${reciboState.exhibicion}_otros`}
            value={reciboState.otros}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="iva"
            id={`${reciboState.exhibicion}_iva`}
            value={reciboState.iva}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="primaTotal"
            id={`${reciboState.exhibicion}_primaTotal`}
            value={reciboState.primaTotal}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormDateInput
            value={
              new Date(
                new Date(reciboState.fechaInicio).setDate(
                  new Date(reciboState.fechaInicio).getDate() + 1
                )
              )
            }
            onChange={dateInputChangeHandler}
            name="fechaInicio"
            id={`${reciboState.exhibicion}_fechaInicio`}
          />
        </span>
        <span className="px-1">
          <FormDateInput
            value={
              new Date(
                new Date(reciboState.fechaLimite).setDate(
                  new Date(reciboState.fechaLimite).getDate() + 1
                )
              )
            }
            onChange={dateInputChangeHandler}
            name="fechaLimite"
            id={`${reciboState.exhibicion}_fechaLimite`}
          />
        </span>
      </div>
    </ListItem>
  );
};

export default ReciboListItem;
