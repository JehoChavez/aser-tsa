import { createContext } from "react";
import { PolizaRecibosContextInterface } from "../types/interfaces";

const defaultValue: PolizaRecibosContextInterface = {
  noPoliza: "",
  contratante: "",
  showModal: false,
  onClose: () => {},
  isLoading: false,
  recibos: [],
  fetchRecibos: () => {},
  onPay: () => {}
};

export const PolizaRecibosContext: React.Context<PolizaRecibosContextInterface> =
  createContext(defaultValue);