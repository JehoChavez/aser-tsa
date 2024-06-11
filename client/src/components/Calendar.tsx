import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Event,
  momentLocalizer,
  EventProps,
} from "react-big-calendar";
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
import Modal from "./Modal";
import Loading from "./Loading";
import CalendarEvent from "./CalendarEvent";
import Pendientes from "./Pendientes";
import { PendientesInterface } from "../types/interfaces";

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
  const [eventPendientes, setEventPendientes] =
    useState<PendientesInterface | null>(null);

  const rangeChangeHandler = (range: DateRange) => {
    setDateRange(range);
    setEventPendientes(null);
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
    // Convert recibos and renovaciones to events wuth count
    const rangeEvents: CustomEvent[] = [];
    const countedRecibos: CustomEvent[] = recibos.reduce(
      (acc: CustomEvent[], recibo) => {
        const reciboDate = new Date(recibo.fechaInicio);

        const existingEntry: CustomEvent | undefined = acc.find((entry) => {
          return entry.start?.getTime() === reciboDate.getTime();
        });

        if (existingEntry) {
          existingEntry.count++;
        } else {
          acc.push({
            start: reciboDate,
            end: reciboDate,
            type: "cobranza",
            count: 1,
          });
        }

        return acc;
      },
      []
    );

    const countedRenovaciones: CustomEvent[] = renovaciones.reduce(
      (acc: CustomEvent[], renovacion) => {
        const renovacionDate = new Date(renovacion.finVigencia);

        const existingEntry: CustomEvent | undefined = acc.find(
          (entry) => entry.start?.getTime() === renovacionDate.getTime()
        );

        if (existingEntry) {
          existingEntry.count++;
        } else {
          acc.push({
            start: renovacionDate,
            end: renovacionDate,
            type: "renovacion",
            count: 1,
          });
        }

        return acc;
      },
      []
    );

    rangeEvents.push(...countedRecibos);
    rangeEvents.push(...countedRenovaciones);

    // Set events
    setEvents(rangeEvents);
  }, [recibos, renovaciones]);

  const selectEventHandler = (event: CustomEvent) => {
    if (event.type === "cobranza") {
      const eventRecibos = recibos.filter(
        (recibo) =>
          new Date(recibo.fechaInicio).getTime() === event.start?.getTime()
      );
      setEventPendientes({
        type: "cobranza",
        pendientes: eventRecibos,
      });
    } else if (event.type === "renovacion") {
      const eventRenovaciones = renovaciones.filter(
        (renovacion) =>
          new Date(renovacion.finVigencia).getTime() === event.start?.getTime()
      );
      setEventPendientes({
        type: "renovaciones",
        pendientes: eventRenovaciones,
      });
    }
  };

  return (
    <>
      <div className="h-full px-20 py-2">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          culture="es"
          views={["month"]}
          events={events}
          components={{
            event: CalendarEvent as React.ComponentType<EventProps<Event>>,
          }}
          onRangeChange={(range) => rangeChangeHandler(range as DateRange)}
          onSelectEvent={(event) => selectEventHandler(event as CustomEvent)}
        />
      </div>
      {isLoading && (
        <Modal size="small">
          <Loading />
        </Modal>
      )}
      {eventPendientes && (
        <Modal
          size="large"
          closeBtn={true}
          onClose={() => setEventPendientes(null)}
        >
          <Pendientes pendientes={eventPendientes} />
        </Modal>
      )}
    </>
  );
};

export default CalendarComponent;
