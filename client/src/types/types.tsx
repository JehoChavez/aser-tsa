import { Recibo, Renovacion } from "./interfaces";

export type ValueType = Date | null;

export type DatePickerValue = ValueType | [ValueType, ValueType];

export type DayPendientes = Recibo[] | Renovacion[] | null;
