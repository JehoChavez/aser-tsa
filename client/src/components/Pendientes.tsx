import { useContext } from "react";
import { CalendarContext } from "../store/calendar-context";
import RecibosPendientes from "./RecibosPendientes";

const Pendientes = () => {
  const calendarContext = useContext(CalendarContext);

  if (calendarContext.type === "cobranza" && calendarContext.dayPendientes) {
    return <RecibosPendientes />;
  }

  return <div>No pending items.</div>;
};

export default Pendientes;
