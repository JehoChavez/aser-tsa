import AgentesListHeader from "./AgentesListHeader";
import AgenteListItem from "./AgenteListItem";
import { useContext } from "react";
import { AgentesContext } from "../../../store/agentes-context";
import Loading from "../../utils/Loading";

const AgentesList = () => {
  const agentesContext = useContext(AgentesContext);

  return (
    <>
      <AgentesListHeader />
      {agentesContext.isLoading ? (
        <Loading />
      ) : (
        <div className="h-5/6 w-full bg-neutral-100 overflow-y-auto">
          {agentesContext.agentes.map((agente) => (
            <AgenteListItem agente={agente} key={agente.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default AgentesList;
