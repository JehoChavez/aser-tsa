import { createContext } from "react";
import {
  CalendarContextInterface,
  CustomEvent,
  DateRange,
} from "../types/interfaces";
import moment from "moment";

export const defaultCalendarContextValue: CalendarContextInterface = {
  isLoading: false,
  range: {
    start: new Date(
      moment().startOf("month").toDate().getTime() - 7 * 24 * 60 * 60 * 1000
    ),
    end: new Date(
      moment().endOf("month").toDate().getTime() + 7 * 24 * 60 * 60 * 1000
    ),
  },
  pendientes: {
    cobranza: [],
    renovacion: [],
  },
  events: [],
  selectedDay: null,
  type: null,
  dayPendientes: null,
  hasError: false,
  fetchPendientes: async () => {},
  changeRange: (range: DateRange) => {},
  selectDay: (event: CustomEvent) => {},
  closePendientesModal: () => {},
  onPay: (id: number) => {},
};

export const CalendarContext: React.Context<CalendarContextInterface> =
  createContext(defaultCalendarContextValue);
