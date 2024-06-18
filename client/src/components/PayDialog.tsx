import { useState, useContext } from "react";
import Modal from "./Modal";
import { PayDialogProps } from "../types/interfaces";
import DatePicker from "react-date-picker";
import { DatePickerValue } from "../types/types";
import { CalendarContext } from "../store/calendar-context";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const PayDialog = ({ recibo, onCancel }: PayDialogProps) => {
  const [value, onChange] = useState<DatePickerValue>(new Date());
  const calendarContext = useContext(CalendarContext);

  const monto = new Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(recibo.monto);

  return (
    <Modal size="small">
      <div className="flex flex-col h-full">
        <h2 className="bg-blue-950 text-gray-100 text-lg font-bold text-center p-2">
          Pagar Recibo {recibo.exhibicion}/{recibo.de} de Póliza{" "}
          {recibo.poliza.noPoliza}
          {`${recibo.endoso ? `/${recibo.endoso.endoso}` : ""}`}
        </h2>
        <div className="h-full flex flex-col justify-around p-3">
          <span className="m-2 font-bold flex justify-between">
            <p>Monto:</p>
            <p>
              ${monto} {recibo.poliza.moneda}
            </p>
          </span>
          <div className="flex justify-between m-2">
            <p className="font-bold">Fecha de pago:</p>
            <DatePicker
              value={value}
              onChange={onChange}
              shouldOpenCalendar={({ reason }) => reason !== "focus"}
              locale="es-es"
            />
          </div>
          {calendarContext.hasError && (
            <h3 className="text-center text-red-600">Ocurrió un error :(</h3>
          )}
          <div className="flex items-center justify-between h-1/5 text-gray-100 text-lg">
            <button
              className="flex justify-evenly items-center w-auto px-2 bg-red-500 rounded hover:bg-red-700"
              onClick={() => onCancel()}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </span>
              <p>Cancelar</p>
            </button>
            <button
              className="flex justify-evenly items-center w-auto px-2 bg-blue-900 rounded hover:bg-blue-950"
              onClick={() => calendarContext.onPay(recibo.id, value as Date)}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-credit-card-fill pr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
                </svg>
              </span>
              <p>Pagar</p>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PayDialog;
