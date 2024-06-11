import CalendarComponent from "../components/Calendar";
import {
  CalendarContext,
  defaultCalendarContextValue,
} from "../store/calendar-context";

const Calendario = () => {
  return (
    <div className="mt-16 h-full w-full">
      <CalendarContext.Provider value={defaultCalendarContextValue}>
        <CalendarComponent />
      </CalendarContext.Provider>
    </div>
  );
};

export default Calendario;
