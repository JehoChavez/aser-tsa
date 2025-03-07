import { createContext } from "react";
import { AgentesContextInterface } from "../types/interfaces";

const agentesContextDefaultValue: AgentesContextInterface = {
  agentes: [],
  aseguradoraIds: [],
  setAseguradoraIds: () => {},
  fetchAgentes: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

export const AgentesContext = createContext<AgentesContextInterface>(
  agentesContextDefaultValue
);
