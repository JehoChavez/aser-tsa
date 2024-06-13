import { ReactNode } from "react";
import { Event } from "react-big-calendar";

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Recibo {
  id: number;
  exhibicion: number;
  de: number;
  monto: number;
  fechaInicio: string;
  fechaLimite: string;
  fechaPago: string | null;
  endosoId: number | null;
  polizaId: number;
  poliza: {
    id: number;
    noPoliza: string;
    moneda: "string";
    cliente: {
      id: number;
      nombre: string;
    };
    aseguradora: {
      id: number;
      aseguradora: string;
    };
    ramo: {
      id: number;
      ramo: string;
    };
  };
  endoso: {
    id: number;
    endoso: string;
  } | null;
}

export interface Renovacion {
  id: number;
  noPoliza: string;
  bienAsegurado: string;
  finVigencia: string;
  ramo: {
    id: number;
    ramo: string;
  };
  cliente: {
    id: number;
    tipoPersona: "fisica" | "moral";
    nombre: "string";
  };
}

export interface CustomEvent extends Event {
  type: "cobranza" | "renovacion";
  count: number;
}

export interface ModalProps {
  size: "small" | "medium" | "large";
  children: ReactNode;
  closeBtn?: boolean;
  onClose?: () => void;
}

export interface PendientesInterface {
  cobranza: Recibo[];
  renovacion: Renovacion[];
}

export interface CalendarContextInterface {
  isLoading: boolean;
  range: DateRange;
  pendientes: PendientesInterface;
  events: CustomEvent[];
  selectedDay: Date | null;
  type: "cobranza" | "renovacion" | null;
  dayPendientes: Renovacion[] | Recibo[] | null;
  fetchEvents: () => Promise<void>;
  changeRange: (range: DateRange) => void;
  selectDay: (event: CustomEvent) => void;
  closePendientesModal: () => void;
}

export interface ListDialogProps {
  title: string | null;
  header?: ReactNode;
  children?: ReactNode;
}

export interface ListItemProps {
  children: ReactNode;
}

export interface PendientesReciboListItemInterface {
  recibo: Recibo;
}
