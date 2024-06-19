import { useState, useEffect } from "react";
import CalendarComponent from "../components/calendar/Calendar";
import {
  CalendarContext,
  defaultCalendarContextValue,
} from "../store/calendar-context";
import axios, { AxiosError } from "axios";
import {
  Recibo,
  Renovacion,
  CustomEvent,
  PendientesInterface,
  DateRange,
} from "../types/interfaces";
import { Navigate } from "react-router-dom";
import { DayPendientes } from "../types/types";

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
  const [dayPendientes, setDayPendientes] = useState<DayPendientes>(
    defaultCalendarContextValue.dayPendientes
  );
  const [hasError, setHasError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const fetchPendientes = async () => {
    const rangePendientes: PendientesInterface = {
      cobranza: [],
      renovacion: [],
    };
    // Convert dates to iso date strings (api expects string)
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/pendientes", {
        params: {
          desde: range.start,
          hasta: range.end,
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
      setIsAuthenticated(true);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
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
      eventPendientes = pendientes.cobranza.filter((recibo) => {
        const [year, month, day] = recibo.fechaInicio.split("-").map(Number);
        return (
          new Date(year, month - 1, day, 0, 0, 0).getTime() ===
          event.start?.getTime()
        );
      });
    } else if (event.type === "renovacion") {
      eventPendientes = pendientes.renovacion.filter(
        (renovacion) =>
          new Date(renovacion.finVigencia).getTime() === event.start?.getTime()
      );
    }
    setDayPendientes(eventPendientes);
  };

  const onPay = async (id: number, date: Date) => {
    try {
      setIsLoading(true);
      await axios.patch(
        `http://localhost:3000/api/recibos/${id}/pagar`,
        {
          fechaPago: date,
        },
        {
          withCredentials: true,
        }
      );
      const newDayPendientes = dayPendientes?.filter(
        (pendiente) => pendiente.id !== id
      );
      setDayPendientes(newDayPendientes as DayPendientes);
      fetchPendientes();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const closePendientesModal = () => {
    setSelectedDay(null);
    setType(null);
    setDayPendientes(null);
  };

  useEffect(() => {
    fetchPendientes();
  }, [range]);

  useEffect(() => {
    // Convert recibos and renovaciones to events wuth count
    const rangeEvents: CustomEvent[] = [];
    const countedRecibos: CustomEvent[] = pendientes.cobranza.reduce(
      (acc: CustomEvent[], recibo) => {
        const [year, month, day] = recibo.fechaInicio.split("-").map(Number);
        const reciboDate = new Date(year, month - 1, day, 0, 0, 0);

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

  if (isAuthenticated === false) return <Navigate to="/login" replace />;

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
          hasError,
          fetchPendientes,
          changeRange,
          selectDay,
          closePendientesModal,
          onPay,
        }}
      >
        <CalendarComponent />
      </CalendarContext.Provider>
    </div>
  );
};

export default Calendario;
