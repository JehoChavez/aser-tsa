import { ReciboListItemProps } from "../../../types/interfaces";
import ListItem from "../../utils/ListItem";
import FormNumberInput from "../../utils/FormNumberInput";
import FormDateInput from "../../utils/FormDateInput";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";

const ReciboListItem = ({ recibo, onReciboChange }: ReciboListItemProps) => {
  // Compute the constant day difference between fechaLimite and fechaInicio from the prop.
  const diff = moment(recibo.fechaLimite).diff(
    moment(recibo.fechaInicio),
    "days"
  );

  const [localRecibo, setLocalRecibo] = useState(recibo);

  const updateReciboPrimas = () => {
    const { primaNeta, expedicion, financiamiento, otros } = localRecibo;
    const subtotalSum =
      (primaNeta || 0) +
      (expedicion || 0) +
      (financiamiento || 0) +
      (otros || 0);
    setLocalRecibo((prev) => ({
      ...prev,
      iva: subtotalSum * 0.16,
      primaTotal: subtotalSum + subtotalSum * 0.16,
    }));
  };

  // Input change handlers.
  const numberInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalRecibo((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const dateInputChangeHandler = (date: Date, name: string) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setLocalRecibo((prev) => ({ ...prev, [name]: formattedDate }));
  };

  // Sync local state when the recibo prop changes.
  useEffect(() => {
    setLocalRecibo(recibo);
  }, [recibo]);

  // Update the recibo whenever the user changes the input values.
  useEffect(() => {
    updateReciboPrimas();
  }, [
    localRecibo.primaNeta,
    localRecibo.expedicion,
    localRecibo.financiamiento,
    localRecibo.otros,
  ]);

  // Update the recibo whenever the iva changes.
  useEffect(() => {
    const { primaNeta, expedicion, financiamiento, otros } = localRecibo;
    const subtotalSum =
      (primaNeta || 0) +
      (expedicion || 0) +
      (financiamiento || 0) +
      (otros || 0);
    setLocalRecibo((prev) => ({
      ...prev,
      primaTotal: subtotalSum + (localRecibo.iva || 0),
    }));
  }, [localRecibo.iva]);

  // Recompute fechaLimite whenever fechaInicio changes.
  useEffect(() => {
    setLocalRecibo((prev) => {
      const newFechaLimite = moment(prev.fechaInicio)
        .add(diff, "days")
        .format("YYYY-MM-DD");

      // Only update if something changed.
      if (prev.fechaLimite !== newFechaLimite) {
        return {
          ...prev,
          fechaLimite: newFechaLimite,
        };
      }
      return prev;
    });
  }, [localRecibo.fechaInicio, diff]);

  // Notify the parent component whenever the recibo changes.
  useEffect(() => {
    onReciboChange(localRecibo.exhibicion, localRecibo);
  }, [localRecibo.primaTotal, localRecibo.fechaLimite]);

  return (
    <ListItem>
      <div className="h-auto text-gray-800 bg-blue-800 bg-opacity-5 grid grid-cols-9 text-center text-xl">
        <p>{localRecibo.exhibicion}</p>
        <span className="px-1">
          <FormNumberInput
            name="primaNeta"
            id={`${localRecibo.exhibicion}_primaNeta`}
            value={localRecibo.primaNeta}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="expedicion"
            id={`${localRecibo.exhibicion}_expedicion`}
            value={localRecibo.expedicion}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="financiamiento"
            id={`${localRecibo.exhibicion}_financiamiento`}
            value={localRecibo.financiamiento}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="otros"
            id={`${localRecibo.exhibicion}_otros`}
            value={localRecibo.otros}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1 flex">
          <FormNumberInput
            name="iva"
            id={`${localRecibo.exhibicion}_iva`}
            value={localRecibo.iva}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormNumberInput
            name="primaTotal"
            id={`${localRecibo.exhibicion}_primaTotal`}
            value={localRecibo.primaTotal}
            onChange={numberInputChangeHandler}
          />
        </span>
        <span className="px-1">
          <FormDateInput
            value={
              new Date(
                new Date(localRecibo.fechaInicio).setDate(
                  new Date(localRecibo.fechaInicio).getDate() + 1
                )
              )
            }
            onChange={dateInputChangeHandler}
            name="fechaInicio"
            id={`${localRecibo.exhibicion}_fechaInicio`}
          />
        </span>
        <span className="px-1">
          <FormDateInput
            value={
              new Date(
                new Date(localRecibo.fechaLimite).setDate(
                  new Date(localRecibo.fechaLimite).getDate() + 1
                )
              )
            }
            onChange={dateInputChangeHandler}
            name="fechaLimite"
            id={`${localRecibo.exhibicion}_fechaLimite`}
          />
        </span>
      </div>
    </ListItem>
  );
};

export default ReciboListItem;
