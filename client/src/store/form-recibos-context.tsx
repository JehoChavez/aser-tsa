import { createContext } from "react";
import { FormRecibosContextInterface } from "../types/interfaces";

const defaultFormRecibosContextValue: FormRecibosContextInterface = {
  recibos: [],
  aseguradora: { id: 1, aseguradora: "Default" },
  inicioVigencia: new Date(),
  finVigencia: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  onInicioVigenciaChange: (date: Date) => {},
  onFinVigenciaChange: (date: Date) => {},
};

export const FormRecibosContext: React.Context<FormRecibosContextInterface> =
  createContext(defaultFormRecibosContextValue);
