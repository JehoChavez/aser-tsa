import { createContext } from "react";
import { PolizasContextInterface } from "../types/interfaces";

export const defaultPolizasContext: PolizasContextInterface = {
  polizas: [],
  params: {
    noPoliza: null,
    page: 1,
    limit: 10,
    tipoFecha: null,
    desde: null,
    hasta: null,
    cliente: null,
    aseguradora: [],
    agente: [],
    vendedor: [],
    ramo: [],
    orden: "DESC",
    por: "createdAt",
    estado: ["vigentes", "vencidas", "renovadas"],
  },
  fetchPolizas: async () => {},
  onSearch: () => {},
  setParams: () => {},
};

export const PolizasContext: React.Context<PolizasContextInterface> =
  createContext(defaultPolizasContext);
