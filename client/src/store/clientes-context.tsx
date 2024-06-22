import { createContext } from "react";
import { ClientesContextInterface } from "../types/interfaces";

const defaultClientesContextValue: ClientesContextInterface = {
  clientes: [],
  fetchClientes: async () => {},
  onSearch: () => {}
};

export const ClientesContext: React.Context<ClientesContextInterface> =
  createContext(defaultClientesContextValue);
