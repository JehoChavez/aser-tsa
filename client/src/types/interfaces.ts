import { ChangeEvent, ReactNode } from "react";
import { Event } from "react-big-calendar";

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Recibo {
  id?: number;
  exhibicion: number;
  de: number;
  primaNeta?: number;
  expedicion?: number;
  financiamiento?: number;
  iva?: number;
  otros?: number;
  primaTotal: number;
  fechaInicio: string;
  fechaLimite: string;
  fechaPago?: string | null;
  endosoId?: number | null;
  polizaId?: number;
  poliza?: {
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
    ramo: RamoInterface;
  };
  endoso?: {
    id: number;
    endoso: string;
  } | null;
}

export interface Renovacion {
  id: number;
  noPoliza: string;
  bienAsegurado: string;
  finVigencia: string;
  ramo: RamoInterface;
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
  onPay?: () => void;
}

export interface PendientesRenovListItemInterface {
  renovacion: Renovacion;
}

export interface ActionButtonInterface {
  title?: string;
  color?: "blue" | "red";
  size?: "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export interface ClienteInterface {
  id: number;
  tipoPersona: "fisica" | "moral";
  nombre: string;
  rfc?: string | null;
  correo?: string | null;
  telefono?: string | null;
  empresa?: string | null;
  nacimiento?: string | null;
  calle?: string | null;
  exterior?: string | null;
  interior?: string | null;
  colonia?: string | null;
  codigoPostal?: string | null;
  comentarios?: string | null;
  estadoId?: number | null;
  municipioId?: number | null;
  estado?: {
    id: number;
    estado: string;
  };
  municipio?: {
    id: number;
    municipio: string;
    estadoId: number;
  };
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

export interface AseguradoraInterface {
  id: number;
  aseguradora: string;
  plazoPrimer?: number;
  plazoSubsecuentes?: number;
  comentarios?: string;
}

export interface AgenteInterface {
  id: number;
  clave: string;
  nombre: string;
  comentarios?: string | null;
  aseguradoraId?: number;
  aseguradora?: AseguradoraInterface;
}

export interface VendedorInterface {
  id: number;
  nombre: string;
  comentarios?: string;
}

export interface RamoInterface {
  id: number;
  ramo: string;
}

export interface PolizaInterface {
  id: number;
  noPoliza: string;
  emision: string;
  inicioVigencia: string;
  finVigencia: string;
  bienAsegurado: string;
  primaNeta: number;
  expedicion?: number;
  financiamiento?: number;
  iva?: number;
  otros?: number;
  primaTotal: number;
  moneda: "MXN" | "USD" | "UDI";
  formaPago: 1 | 2 | 4 | 12;
  comentarios?: string;
  fechaCancelacion: string | null;
  vencida: boolean | null;
  cliente: ClienteInterface;
  aseguradora: AseguradoraInterface;
  agente: AgenteInterface;
  vendedor: VendedorInterface;
  ramo: RamoInterface;
  endosos?: EndosoInterface[] | null;
  recibos?: Recibo[];
  renueva?: PolizaInterface | null;
  reexpide?: PolizaInterface | null;
  renovacion?: PolizaInterface | null;
  reexpedicion?: PolizaInterface | null;
  renovacionId?: number;
  reexpedicionId?: number;
  renuevaId?: number;
  reexpideId?: number;
  clienteId?: number | string;
}

export interface EndosoInterface {
  id: number;
  endoso: string;
  emision?: string;
  inicioVigencia: string;
  finVigencia: string;
  tipo: "A" | "B" | "D";
  primaNeta?: number;
  expedicion?: number;
  financiamiento?: number;
  iva?: number;
  otros?: number;
  primaTotal?: number;
  concepto?: string;
  fechaCancelacion?: string;
  polizaId: number;
}

export interface PolizasContextInterface {
  polizas: PolizaInterface[];
  params: PolizasParamsInterface;
  fetchPolizas: () => Promise<void>;
  onSearch: (value: string) => void;
}

export interface PolizasParamsInterface {
  noPoliza: string | null;
  page: number | null;
  limit: number | null;
  tipoFecha: string | null;
  desde: string | Date | null;
  hasta: string | Date | null;
  cliente: number[] | null;
  aseguradora: number[] | null;
  agente: number[] | null;
  vendedor: number[] | null;
  ramo: number[] | null;
  orden: "ASC" | "DESC";
  por:
    | "inicioVigencia"
    | "finVigencia"
    | "emision"
    | "createdAt"
    | "fechaCancelacion"
    | null;
  estado:
    | ("vigentes" | "renovadas" | "reexpedidas" | "canceladas" | "vencidas")[]
    | null;
}

export interface IconTextButtonInterface {
  icon: ReactNode;
  children: ReactNode;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  hover?: string;
  onClick?: () => void;
}

export interface FormInputProps {
  name: string;
  id?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface FormTextInputProps extends FormInputProps {
  defaultValue?: string;
  placeholder?: string;
  onChange?: () => void;
}

export interface FormNumberInputProps extends FormInputProps {
  value?: number;
  defaultVal?: number;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectInputOption {
  value: string | number;
  name: string;
  selected?: boolean;
}

export interface FormSelectInputProps extends FormInputProps {
  options: SelectInputOption[];
  onSelect?: (selected: string) => void;
  defaultVal?: number | string;
}

export interface FormDateInputProps extends FormInputProps {
  value: Date;
  onChange: (date: Date, name: string) => void;
}

export interface AseguradoraSectionProps {
  aseguradoras: AseguradoraInterface[];
  agentes: AgenteInterface[];
  vendedores: VendedorInterface[];
  ramos: RamoInterface[];
  aseguradora?: number;
  agente?: number;
  vendedor?: number;
  ramo?: number;
}

export interface PrimasInterface {
  primaNeta: number;
  expedicion: number;
  financiamiento: number;
  otros: number;
  iva: number;
  primaTotal: number;
}

export interface FormRecibosContextInterface {
  nrOfRecibos: number;
  recibos: Recibo[];
  aseguradora: AseguradoraInterface;
  formaPago: number;
  endosoId?: number;
  polizaInicioVigencia: Date;
  polizaFinVigencia: Date;
  endosoInicioVigencia?: Date;
  endosoFinVigencia?: Date;
  monthsDiff: number;
  subtotalWoExp: number;
  primas: PrimasInterface;
  addNrOfRecibos: () => void;
  subNrOfRecibos: () => void;
  setNrOfRecibos: (nr: number) => void;
  setPrimas: (primas: PrimasInterface) => void;
  setSubtotalWoExp: (value: number) => void;
  setRecibos: (recibos: Recibo[]) => void;
  setFormaPago: (value: number) => void;
  calcMonthsDiff: () => void;
  onPolizaInicioVigenciaChange?: (date: Date) => void;
  onPolizaFinVigenciaChange?: (date: Date) => void;
  onEndosoInicioVigenciaChange?: (date: Date) => void;
  onEndosoFinVigenciaChange?: (date: Date) => void;
}

export interface ReciboListItemProps {
  recibo: Recibo;
  onReciboChange: (exhibicion: number, updated: Recibo) => void;
}

export interface PostPolizaPayload {
  poliza: PolizaInterface;
  recibos: Recibo[];
}

export interface PostEndosoPayload {
  endoso: EndosoInterface;
  recibos: Recibo[];
}

export interface NumberVigenciaProps {
  noPoliza?: string;
  fechaEmision?: Date;
}

export interface EndosoVigenciaProps {
  endoso?: string;
  fechaEmision?: string;
}

export interface SuccessModalProps {
  type:
    | "cancelada"
    | "reexpedida"
    | "eliminada"
    | "cambioContratante"
    | "rehabilitada";
  onOk: () => void;
}

export interface PolizaRecibosContextInterface {
  showModal: boolean;
  onClose: () => void;
  isLoading: boolean;
  recibos: Recibo[];
  fetchRecibos: () => void;
  onPay: (id: number, date: Date) => void;
  onAnular: (id: number) => void;
}

export interface EndososContextInterface {
  endosos: EndosoInterface[];
  fetchEndosos: () => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  endosoToEdit: EndosoInterface | null;
  setEndosoToEdit: (endoso: EndosoInterface | null) => void;
  endosoToShow: EndosoInterface | null;
  setEndosoToShow: (endoso: EndosoInterface | null) => void;
}
