import { createContext } from "react";
import { RamosContextInterface } from "../types/interfaces";

const defaultRamosContextValue: RamosContextInterface = {
  ramos: [],
  fetchRamos: () => {},
};

export const RamosContext: React.Context<RamosContextInterface> = createContext(
  defaultRamosContextValue
);
