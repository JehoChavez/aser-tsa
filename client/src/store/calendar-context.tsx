import { createContext } from "react";
import { CalendarContextInterface } from "../types/interfaces";
import moment from "moment";

export const defaultCalendarContextValue: CalendarContextInterface = {
  isLoading: false,
  range: {
    start: moment().startOf("month").toDate(),
    end: moment().endOf("month").toDate(),
  },
  pendientes: [],
  events: [],
  selectedDay: null,
  type: null,
  dayPendientes: [],
};

export const CalendarContext: React.Context<CalendarContextInterface> =
  createContext(defaultCalendarContextValue);
