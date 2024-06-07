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
    cliente: {
      id: number;
      noPoliza: string;
      cliente: {
        id: number;
        nombre: string;
      };
    };
    aseguradora: {
      id: number;
      aseguradora: string;
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
