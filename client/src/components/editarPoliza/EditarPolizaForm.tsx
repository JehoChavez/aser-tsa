import PolizaForm from "../PolizaForm/PolizaForm";
import { PolizaInterface } from "../../types/interfaces";

const EditarPolizaForm = ({ poliza }: { poliza: PolizaInterface }) => {
  return <PolizaForm poliza={poliza} />;
};

export default EditarPolizaForm;
