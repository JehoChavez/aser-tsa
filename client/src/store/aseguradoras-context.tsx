import { createContext } from "react";
import { AseguradorasContextInterface } from "../types/interfaces";

const defaultAseguradorasContextValue: AseguradorasContextInterface = {
  aseguradoras: [],
  fetchAseguradoras: () => {},
};

export const AseguradorasContext: React.Context<AseguradorasContextInterface> =
  createContext(defaultAseguradorasContextValue);
