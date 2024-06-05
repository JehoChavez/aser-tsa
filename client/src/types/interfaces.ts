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
