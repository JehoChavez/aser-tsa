import { useContext } from "react";
import { CalendarContext } from "../../store/calendar-context";
import RecibosPendientes from "./RecibosPendientes";
import RenovacionesPendientes from "./RenovacionesPendientes";

const Pendientes = () => {
  const calendarContext = useContext(CalendarContext);

  if (calendarContext.type === "cobranza" && calendarContext.dayPendientes) {
    return <RecibosPendientes />;
  } else if (
    calendarContext.type === "renovacion" &&
    calendarContext.dayPendientes
  ) {
    return <RenovacionesPendientes />;
  }

  return <div>No pending items.</div>;
};

export default Pendientes;
