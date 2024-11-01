import EndososListHeader from "./EndososListHeader";
import { useContext } from "react";
import { EndososContext } from "../../store/endosos-context";
import EndosoListItem from "./EndosoListItem";

const EndososList = () => {
  const endososContext = useContext(EndososContext);

  return (
    <div className="p-2 w-full h-full">
      <EndososListHeader />
      {endososContext.endosos.map((endoso) => {
        return <EndosoListItem endoso={endoso} key={endoso.id} />;
      })}
    </div>
  );
};

export default EndososList;
