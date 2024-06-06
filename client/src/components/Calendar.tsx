import { useState, useEffect, useCallback } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es";
import axios from "axios";
import {
  CustomEvent,
  DateRange,
  Recibo,
  Renovacion,
} from "../types/interfaces";
// import Loading from "./Loading";
import CalendarEvent from "./CalendarEvent";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  // Set initial range to month start and end
  const [dateRange, setDateRange] = useState<DateRange>({
    start: moment().startOf("month").toDate(),
    end: moment().endOf("month").toDate(),
  });
  const [recibos, setRecibos] = useState<Recibo[]>([]);
  const [renovaciones, setRenovaciones] = useState<Renovacion[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const rangeChangeHandler = (range: DateRange) => {
    setDateRange(range);
  };

  // Fetch pendientes each time dateRange changes
  const getEvents = useCallback(async () => {
    // Convert dates to iso date strings (api expects string)
    const startDate = dateRange.start.toISOString().split("T")[0];
    const endDate = dateRange.end.toISOString().split("T")[0];
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/pendientes", {
        params: { desde: startDate, hasta: endDate },
        withCredentials: true,
      });
      const fetchedRecibos: Recibo[] = response.data.content.cobranza;
      setRecibos(fetchedRecibos);
      const fetchedRenovaciones: Renovacion[] =
        response.data.content.renovaciones;
      setRenovaciones(fetchedRenovaciones);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [dateRange]);

  useEffect(() => {
    getEvents();
  }, [dateRange]);

  useEffect(() => {
    // Convert recibos and renovaciones to events
    const rangeEvents: CustomEvent[] = [];
    recibos.map((recibo) => {
      rangeEvents.push({
        title: recibo.poliza.noPoliza,
        start: new Date(recibo.fechaInicio),
        end: new Date(recibo.fechaInicio),
        type: "recibo",
      });
    });
    renovaciones.map((renovacion) => {
      rangeEvents.push({
        title: renovacion.noPoliza,
        start: new Date(renovacion.finVigencia),
        end: new Date(renovacion.finVigencia),
        type: "renovacion",
      });
    });

    // Set events
    setEvents(rangeEvents);
  }, [recibos, renovaciones]);

  // Create modal to display loading without breaking the calendar
  // if (isLoading) return <Loading />;

  return (
    <div className="h-full px-20 py-2">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        culture="es"
        views={["month"]}
        events={events}
        components={{
          event: CalendarEvent,
        }}
        onRangeChange={(range) => rangeChangeHandler(range as DateRange)}
      />
    </div>
  );
};

export default CalendarComponent;
