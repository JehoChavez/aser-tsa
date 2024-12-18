import { createContext } from "react";
import { AgentesContextInterface } from "../types/interfaces";

const agentesContextDefaultValue: AgentesContextInterface = {
  agentes: [],
  aseguradoraIds: [],
  setAseguradoraIds: () => {},
  fetchAgentes: () => {},
};

export const AgentesContext = createContext<AgentesContextInterface>(
  agentesContextDefaultValue
);
