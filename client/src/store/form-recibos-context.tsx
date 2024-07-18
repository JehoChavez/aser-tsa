import { createContext } from "react";
import { FormRecibosContextInterface } from "../types/interfaces";

const defaultFormRecibosContextValue: FormRecibosContextInterface = {
  recibos: [],
  aseguradora: { id: 1, aseguradora: "Default" },
  polizaInicioVigencia: new Date(),
  polizaFinVigencia: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  onPolizaInicioVigenciaChange: (date: Date) => {},
  onPolizaFinVigenciaChange: (date: Date) => {},
};

export const FormRecibosContext: React.Context<FormRecibosContextInterface> =
  createContext(defaultFormRecibosContextValue);
