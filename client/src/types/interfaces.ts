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
  agente: {
    id: number;
    clave: string;
    nombre: string;
  };
  aseguradora: {
    id: number;
    aseguradora: string;
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
  hasError: boolean;
  fetchPendientes: () => Promise<void>;
  changeRange: (range: DateRange) => void;
  selectDay: (event: CustomEvent) => void;
  closePendientesModal: () => void;
  onPay: (id: number, date: Date) => void;
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

export interface PayDialogProps {
  recibo: Recibo;
  onCancel: () => void;
}

export interface PendientesRenovListItemInterface {
  renovacion: Renovacion;
}

export interface ActionButtonInterface {
  title?: string;
  onClick?: () => void;
  children: ReactNode;
}

export interface ClienteInterface {
  id: number;
  tipoPersona: "fisica" | "moral";
  nombre: string;
  rfc: string | null;
  correo: string | null;
  telefono: string | null;
  empresa: string | null;
  nacimiento?: string | null;
  calle?: string | null;
  exterior?: string | null;
  interior?: string | null;
  colonia?: string | null;
  codigoPostal?: string | null;
  comentarios?: string | null;
  estadoId?: number | null;
  municipioId?: number | null;
}

export interface ClientesContextInterface {
  clientes: ClienteInterface[];
  fetchClientes: () => Promise<void>;
  onSearch: (value: string) => void;
}

export interface SearchInputInterface {
  placeholder: string;
  onSearch: (value: string) => void;
}

export interface ClientesSearchParams {
  nombre?: string;
}

export interface IconTitleParam {
  icon: ReactNode;
  children: ReactNode;
}
