import { createContext } from "react";
import { PolizaRecibosContextInterface } from "../types/interfaces";

const defaultValue: PolizaRecibosContextInterface = {
  recibos: [],
  fetchRecibos: () => {},
};

export const PolizaRecibosContext: React.Context<PolizaRecibosContextInterface> =
  createContext(defaultValue);
