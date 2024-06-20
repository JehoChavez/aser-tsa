import { createContext } from "react";
import { ClientesContextInterface } from "../types/interfaces";

const defaultClientesContextValue: ClientesContextInterface = {
  clientes: [],
  fetchClientes: async () => {},
};

export const ClientesContext: React.Context<ClientesContextInterface> =
  createContext(defaultClientesContextValue);
