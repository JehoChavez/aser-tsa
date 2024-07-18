import { createContext } from "react";
import { FormRecibosContextInterface } from "../types/interfaces";

const defaultFormRecibosContextValue: FormRecibosContextInterface = {
  recibos: [],
  aseguradora: { id: 1, aseguradora: "Default" },
  polizaId: 0,
  inicioVigencia: new Date(),
  finVigencia: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
};

export const FormRecibosContext: React.Context<FormRecibosContextInterface> =
  createContext(defaultFormRecibosContextValue);
