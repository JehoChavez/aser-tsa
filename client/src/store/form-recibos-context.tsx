import { createContext } from "react";
import { FormRecibosContextInterface } from "../types/interfaces";

const defaultFormRecibosContextValue: FormRecibosContextInterface = {
  recibos: [],
  aseguradora: { id: 1, aseguradora: "Default" },
  formaPago: 1,
  polizaInicioVigencia: new Date(),
  polizaFinVigencia: new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  ),
  monthsDiff: 12,
  subtotalWoExp: 0,
  primas: {
    primaNeta: 0,
    expedicion: 0,
    financiamiento: 0,
    otros: 0,
    iva: 0,
    primaTotal: 0,
  },
  setPrimas: () => {},
  setSubtotalWoExp: () => {},
  setRecibos: () => {},
  setFormaPago: () => {},
  calcMonthsDiff: () => {},
  onPolizaInicioVigenciaChange: () => {},
  onPolizaFinVigenciaChange: () => {},
};

export const FormRecibosContext: React.Context<FormRecibosContextInterface> =
  createContext(defaultFormRecibosContextValue);
