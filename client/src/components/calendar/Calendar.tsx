import { useContext } from "react";
import {
  Calendar,
  Event,
  momentLocalizer,
  EventProps,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es";
import { CustomEvent, DateRange } from "../../types/interfaces";
import Modal from "../utils/Modal";
import Loading from "../utils/Loading";
import CalendarEvent from "./CalendarEvent";
import Pendientes from "../pendientes/Pendientes";
import { CalendarContext } from "../../store/calendar-context";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const calendarContext = useContext(CalendarContext);

  return (
    <>
      <div className="h-full px-20 py-2">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          culture="es"
          views={["month"]}
          events={calendarContext.events}
          components={{
            event: CalendarEvent as React.ComponentType<EventProps<Event>>,
          }}
          onRangeChange={(range) =>
            calendarContext.changeRange(range as DateRange)
          }
          onSelectEvent={(event) =>
            calendarContext.selectDay(event as CustomEvent)
          }
        />
      </div>
      {calendarContext.isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {calendarContext.dayPendientes && <Pendientes />}
    </>
  );
};

export default CalendarComponent;
