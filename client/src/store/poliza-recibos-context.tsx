import { createContext } from "react";
import { PolizaRecibosContextInterface } from "../types/interfaces";

const defaultValue: PolizaRecibosContextInterface = {
  showModal: false,
  onClose: () => {},
  isLoading: false,
  recibos: [],
  fetchRecibos: () => {},
  onPay: () => {},
  onAnular: () => {},
};

export const PolizaRecibosContext: React.Context<PolizaRecibosContextInterface> =
  createContext(defaultValue);
