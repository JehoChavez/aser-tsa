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
    start: moment().startOf("month").toDate(),
    end: moment().endOf("month").toDate(),
  },
  pendientes: {
    cobranza: [],
    renovacion: [],
  },
  events: [],
  selectedDay: null,
  type: null,
  dayPendientes: null,
  fetchEvents: async () => {},
  changeRange: (range: DateRange) => {},
  selectDay: (event: CustomEvent) => {},
  closePendientesModal: () => {},
};

export const CalendarContext: React.Context<CalendarContextInterface> =
  createContext(defaultCalendarContextValue);