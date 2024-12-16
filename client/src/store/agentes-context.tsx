import { createContext } from "react";
import { AgentesContextInterface } from "../types/interfaces";

const agentesContextDefaultValue: AgentesContextInterface = {
  agentes: [],
  fetchAgentes: () => {},
};

export const AgentesContext = createContext<AgentesContextInterface>(
  agentesContextDefaultValue
);
