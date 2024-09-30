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
    aseguradora: null,
    agente: null,
    vendedor: null,
    ramo: null,
    orden: "DESC",
    por: "createdAt",
    estado: ["vigentes", "vencidas", "renovadas"],
  },
  fetchPolizas: async () => {},
  onSearch: (value: string) => {},
};

export const PolizasContext: React.Context<PolizasContextInterface> =
  createContext(defaultPolizasContext);
