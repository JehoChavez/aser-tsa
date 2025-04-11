import { createContext } from "react";
import { ReporteContextInterface } from "../types/interfaces";

export const defaultReporteContext: ReporteContextInterface = {
  reporte: null,
  params: {
    desde: null,
    hasta: null,
    aseguradora: [],
    agente: [],
    vendedor: [],
    ramo: [],
  },
  fetchReporte: async () => {},
  setParams: () => {},
};

export const ReporteContext: React.Context<ReporteContextInterface> =
  createContext(defaultReporteContext);
