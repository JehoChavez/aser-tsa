import { useState, useEffect } from "react";
import CalendarComponent from "../components/Calendar";
import {
  CalendarContext,
  defaultCalendarContextValue,
} from "../store/calendar-context";
import axios from "axios";
import {
  Recibo,
  Renovacion,
  CustomEvent,
  PendientesInterface,
  DateRange,
} from "../types/interfaces";

const Calendario = () => {
  const [isLoading, setIsLoading] = useState(
    defaultCalendarContextValue.isLoading
  );
  const [range, setRange] = useState(defaultCalendarContextValue.range);
  const [pendientes, setPendientes] = useState(
    defaultCalendarContextValue.pendientes
  );
  const [events, setEvents] = useState(defaultCalendarContextValue.events);
  const [selectedDay, setSelectedDay] = useState<Date | null>(
    defaultCalendarContextValue.selectedDay
  );
  const [type, setType] = useState<"cobranza" | "renovacion" | null>(
    defaultCalendarContextValue.type
  );
  const [dayPendientes, setDayPendientes] = useState(
    defaultCalendarContextValue.dayPendientes
  );

  const fetchEvents = async () => {
    const rangePendientes: PendientesInterface = {
      cobranza: [],
      renovacion: [],
    };
    // Convert dates to iso date strings (api expects string)
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/pendientes", {
        params: {
          desde: range.start.toISOString(),
          hasta: range.end.toISOString(),
        },
        withCredentials: true,
      });
      const fetchedRecibos: Recibo[] = response.data.content.cobranza;
      rangePendientes.cobranza = fetchedRecibos;

      const fetchedRenovaciones: Renovacion[] =
        response.data.content.renovaciones;
      rangePendientes.renovacion = fetchedRenovaciones;

      setPendientes(rangePendientes);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const changeRange = (range: DateRange) => {
    setRange(range);
    setSelectedDay(null);
    setDayPendientes(null);
    setType(null);
  };

  const selectDay = (event: CustomEvent) => {
    setType(event.type);
    setSelectedDay(event.start as Date);

    let eventPendientes: Renovacion[] | Recibo[] = [];
    if (event.type === "cobranza") {
      eventPendientes = pendientes.cobranza.filter(
        (recibo) =>
          new Date(recibo.fechaInicio).getTime() === event.start?.getTime()
      );
    } else if (event.type === "renovacion") {
      eventPendientes = pendientes.renovacion.filter(
        (renovacion) =>
          new Date(renovacion.finVigencia).getTime() === event.start?.getTime()
      );
    }
    setDayPendientes(eventPendientes);
  };

  const closePendientesModal = () => {
    setSelectedDay(null);
    setType(null);
    setDayPendientes(null);
  };

  useEffect(() => {
    fetchEvents();
  }, [range]);

  useEffect(() => {
    // Convert recibos and renovaciones to events wuth count
    const rangeEvents: CustomEvent[] = [];
    const countedRecibos: CustomEvent[] = pendientes.cobranza.reduce(
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

    const countedRenovaciones: CustomEvent[] = pendientes.renovacion.reduce(
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
  }, [pendientes]);

  return (
    <div className="mt-16 h-full w-full">
      <CalendarContext.Provider
        value={{
          isLoading,
          range,
          pendientes,
          events,
          selectedDay,
          type,
          dayPendientes,
          fetchEvents,
          changeRange,
          selectDay,
          closePendientesModal,
        }}
      >
        <CalendarComponent />
      </CalendarContext.Provider>
    </div>
  );
};

export default Calendario;
