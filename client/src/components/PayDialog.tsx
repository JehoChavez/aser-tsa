import { useState } from "react";
import Modal from "./Modal";
import { PayDialogProps } from "../types/interfaces";
import DatePicker from "react-date-picker";
import { DatePickerValue } from "../types/types";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const PayDialog = ({ recibo, onCancel }: PayDialogProps) => {
  const [value, onChange] = useState<DatePickerValue>(new Date());

  const monto = new Intl.NumberFormat("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(recibo.monto);

  return (
    <Modal size="small">
      <div className="flex flex-col h-full">
        <h2 className="bg-blue-950 text-gray-100 text-lg font-bold text-center p-2">
          Pagar Recibo {recibo.exhibicion}/{recibo.de} de Póliza{" "}
          {recibo.poliza.noPoliza}/{recibo.endoso?.endoso}
        </h2>
        <div className="h-full flex flex-col justify-around p-3">
          <span className="m-2 font-bold flex justify-between">
            <p>Monto:</p>
            <p>
              ${monto} {recibo.poliza.moneda}
            </p>
          </span>
          <div className="w-full h-8 text-center">
            <DatePicker value={value} onChange={onChange} locale="es-es" />
          </div>
          <div className="flex items-center justify-center h-1/5">
            <button
              className="w-2/5 flex justify-evenly items-center bg-red-500 text-gray-100 text-lg rounded hover:bg-red-700"
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PayDialog;
