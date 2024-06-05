import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  return (
    <div className="h-full">
      <Calendar localizer={localizer} startAccessor="start" endAccessor="end" />
    </div>
  );
};

export default CalendarComponent;
