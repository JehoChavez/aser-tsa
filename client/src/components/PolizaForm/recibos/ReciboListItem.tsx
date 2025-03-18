import { ReciboListItemProps } from "../../../types/interfaces";
import ListItem from "../../utils/ListItem";
import FormNumberInput from "../../utils/FormNumberInput";
import FormDateInput from "../../utils/FormDateInput";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import ActionButton from "../../utils/ActionButton";

const ReciboListItem = ({ recibo, onReciboChange }: ReciboListItemProps) => {
  // Compute the constant day difference between fechaLimite and fechaInicio from the prop.
  const diff = moment(recibo.fechaLimite).diff(
    moment(recibo.fechaInicio),
    "days"
  );

  const [localRecibo, setLocalRecibo] = useState(recibo);

  // Sync local state when the recibo prop changes.
  useEffect(() => {
    setLocalRecibo(recibo);
  }, [recibo]);

  // Recompute primaTotal and fechaLimite whenever one of the dependent fields changes.
  useEffect(() => {
    setLocalRecibo((prev) => {
      const sub =
        (prev.primaNeta || 0) +
        (prev.expedicion || 0) +
        (prev.financiamiento || 0) +
        (prev.otros || 0);
      const newPrimaTotal = sub + (prev.iva || 0);
      const newFechaLimite = moment(prev.fechaInicio)
        .add(diff, "days")
        .format("YYYY-MM-DD");

      // Only update if something changed.
      if (
        prev.primaTotal !== newPrimaTotal ||
        prev.fechaLimite !== newFechaLimite
      ) {
        return {
          ...prev,
          primaTotal: newPrimaTotal,
          fechaLimite: newFechaLimite,
        };
      }
      return prev;
    });
  }, [
    localRecibo.primaNeta,
    localRecibo.expedicion,
    localRecibo.financiamiento,
    localRecibo.otros,
    localRecibo.iva,
    localRecibo.fechaInicio,
    diff,
  ]);

  const recalculateIva = () => {
    const sub =
      (localRecibo.primaNeta || 0) +
      (localRecibo.expedicion || 0) +
      (localRecibo.financiamiento || 0) +
      (localRecibo.otros || 0);
    const newIva = sub * 0.16;
    const newPrimaTotal = sub + newIva;

    setLocalRecibo((prev) => ({
      ...prev,
      iva: newIva,
      primaTotal: newPrimaTotal,
    }));
  };

  // Notify the parent when key values change.
  useEffect(() => {
    onReciboChange(localRecibo.exhibicion, localRecibo);
  }, [localRecibo.primaTotal, localRecibo.fechaLimite]);

  const numberInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    setLocalRecibo((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const dateInputChangeHandler = (date: Date, name: string) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setLocalRecibo((prev) => ({ ...prev, [name]: formattedDate }));
  };

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
          <div className="w-3/4">
            <FormNumberInput
              name="iva"
              id={`${localRecibo.exhibicion}_iva`}
              value={localRecibo.iva}
              onChange={numberInputChangeHandler}
            />
          </div>
          <ActionButton onClick={recalculateIva} title="Recalcular IVA">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
          </ActionButton>
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
