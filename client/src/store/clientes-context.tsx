import { createContext } from "react";
import { ClientesContextInterface } from "../types/interfaces";

export const defaultClientesContextValue: ClientesContextInterface = {
  clientes: [],
  params: {
    page: 1,
    limit: 10,
    orden: "DESC",
    por: "createdAt",
  },
  fetchClientes: async () => {},
  onSearch: () => {},
  setParams: () => {},
};

export const ClientesContext: React.Context<ClientesContextInterface> =
  createContext(defaultClientesContextValue);
