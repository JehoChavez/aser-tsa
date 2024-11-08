import { useContext } from "react";
import { EndososContext } from "../../store/endosos-context";

const Endoso = () => {
  const endosoContext = useContext(EndososContext);

  return <div>{endosoContext.endosoToShow?.endoso}</div>;
};

export default Endoso;
