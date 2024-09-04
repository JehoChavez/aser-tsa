import { ReciboListItemProps } from "../../../types/interfaces";
import ListItem from "../../utils/ListItem";
import FormNumberInput from "../../utils/FormNumberInput";
import FormDateInput from "../../utils/FormDateInput";
import { ChangeEvent, useEffect, useState } from "react";

const ReciboListItem = ({ recibo, onReciboChange }: ReciboListItemProps) => {
  const [reciboState, setRecibo] = useState(recibo);
  const [subtotal, setSubtotal] = useState(
    (recibo.primaNeta as number) +
      (recibo.expedicion as number) +
      (recibo.financiamiento as number) +
      (recibo.otros as number)
  );

  const numberInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRecibo((prev) => ({
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
    setRecibo((prev) => ({
      ...prev,
      iva: sub * 0.16,
    }));
  }, [
    reciboState.primaNeta,
    reciboState.expedicion,
    reciboState.financiamiento,
    reciboState.otros,
  ]);

  useEffect(() => {
    setRecibo((prev) => ({
      ...prev,
      primaTotal: subtotal + (prev.iva as number),
    }));
  }, [reciboState.iva]);

  useEffect(() => {
    onReciboChange(recibo.exhibicion, reciboState);
  }, [reciboState.primaTotal]);

  return (
    <ListItem>
      <div className="h-auto text-gray-800 bg-blue-800 bg-opacity-5 grid grid-cols-9 text-center text-xl">
        <p>{recibo.exhibicion}</p>
        <span className="px-1">
          <FormNumberInput
            name="primaNeta"
            value={recibo.primaNeta}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="expedicion"
            value={recibo.expedicion}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="financiamiento"
            value={recibo.financiamiento}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="otros"
            value={recibo.otros}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="iva"
            value={recibo.iva}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="primaTotal"
            value={recibo.primaTotal}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormDateInput
            value={
              new Date(
                new Date(recibo.fechaInicio).setDate(
                  new Date(recibo.fechaInicio).getDate() + 1
                )
              )
            }
            onChange={() => {}}
            name="fechaInicio"
          />
        </span>
        <span className="px-1">
          <FormDateInput
            value={
              new Date(
                new Date(recibo.fechaLimite).setDate(
                  new Date(recibo.fechaLimite).getDate() + 1
                )
              )
            }
            onChange={() => {}}
            name="fechaLimite"
          />
        </span>
      </div>
    </ListItem>
  );
};

export default ReciboListItem;
