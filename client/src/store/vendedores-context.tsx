import { createContext } from "react";
import { VendedoresContextInterface } from "../types/interfaces";

const defaultVendedoresContextValue: VendedoresContextInterface = {
  vendedores: [],
  fetchVendedores: () => {},
};

export const VendedoresContext: React.Context<VendedoresContextInterface> =
  createContext(defaultVendedoresContextValue);
